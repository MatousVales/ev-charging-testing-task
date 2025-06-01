import {isBefore} from 'date-fns'

import type {SimulationParams, SimulationResults, Chargepoint} from './types'
import {
	arrivalProbabilitiesData,
	chargingDemandProbabilitiesData,
	getCumulativeChargingDemandProbabilities,
} from './data'
import {
	getCurrentDateTimeByTickNumber,
	generateElligibleChargerOccupancy,
	generateElligibleArrival,
	handleOccupyCharger,
	handleIncrementEnergyConsumed,
	handleIncrementChargingEvents,
	getChargepoints,
	getResults,
	printResults,
} from './helpers'

const SIMULATION_PARAMS: SimulationParams = {
	chargepointCount: 20,
	chargepointPowerCapacity: 11,
	simulationDurationDays: 365,
	simulationStartDate: new Date('2025-01-01T00:00:00Z'),
	timezone: 'Europe/Berlin',
	ticksPerHour: 4,
	ticksPerDay: 96,
	evEfficiency: 18,
	arrivalProbabilities: arrivalProbabilitiesData,
	chargingDemandProbabilities: chargingDemandProbabilitiesData,
	cumulativeChargingDemandProbabilities: getCumulativeChargingDemandProbabilities(),
	expectedResults: {
		actualMaxDemand: {min: 77, max: 121},
		concurrencyFactor: {min: 0.35, max: 0.55},
	},
}

const handleExistingOccupancy = (charger: Chargepoint, currentTime: Date, results: SimulationResults) => {
	if (isBefore(currentTime, charger.occupancy!.chargeTo)) {
		handleIncrementEnergyConsumed(results, charger.powerCapacity)
	} else {
		charger.occupancy = null
		charger.currentPowerDraw = 0
	}
}

const handleNewOccupancy = (
	charger: Chargepoint,
	chargepoints: Array<Chargepoint>,
	currentTime: Date,
	results: SimulationResults,
	cumulativeChargingDemandProbabilities: SimulationParams['cumulativeChargingDemandProbabilities'],
	evEfficiency: SimulationParams['evEfficiency'],
	timezone: SimulationParams['timezone'],
) => {
	const elligibleChargerOccupancy = generateElligibleChargerOccupancy(
		cumulativeChargingDemandProbabilities,
		evEfficiency,
		charger.powerCapacity,
		currentTime,
		timezone,
	)
	if (elligibleChargerOccupancy) {
		const availableCharger =
			charger.occupancy === null ? charger : chargepoints.find((c) => c.occupancy === null && c.id !== charger.id)
		if (availableCharger) {
			handleOccupyCharger(availableCharger, elligibleChargerOccupancy)
			handleIncrementEnergyConsumed(results, availableCharger.powerCapacity)
			handleIncrementChargingEvents(results)
		}
	}
	return
}

const main = () => {
	console.log('Starting simulation...')

	const chargepoints = getChargepoints(SIMULATION_PARAMS.chargepointCount, SIMULATION_PARAMS.chargepointPowerCapacity)
	const results = getResults()
	const totalSimulationTicks = SIMULATION_PARAMS.simulationDurationDays * SIMULATION_PARAMS.ticksPerDay

	for (let tick = 0; tick < totalSimulationTicks; tick++) {
		const currentDateTime = getCurrentDateTimeByTickNumber(tick, SIMULATION_PARAMS.simulationStartDate)
		let currentTotalPowerDemand = 0

		chargepoints.forEach((charger) => {
			if (charger.occupancy) {
				handleExistingOccupancy(charger, currentDateTime, results)
			}

			const chargerArrival = generateElligibleArrival(
				currentDateTime,
				SIMULATION_PARAMS.arrivalProbabilities,
				SIMULATION_PARAMS.timezone,
			)
			if (chargerArrival) {
				handleNewOccupancy(
					charger,
					chargepoints,
					currentDateTime,
					results,
					SIMULATION_PARAMS.cumulativeChargingDemandProbabilities,
					SIMULATION_PARAMS.evEfficiency,
					SIMULATION_PARAMS.timezone,
				)
			}

			currentTotalPowerDemand += charger.currentPowerDraw
		})

		if (currentTotalPowerDemand > results.actualMaxDemand) {
			results.actualMaxDemand = currentTotalPowerDemand
		}

		results.currentDemandPerTick.push(currentTotalPowerDemand)
	}

	printResults(results, SIMULATION_PARAMS)
}

main()
