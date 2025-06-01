import {formatInTimeZone, fromZonedTime, toZonedTime} from 'date-fns-tz'
import {addMinutes} from 'date-fns'

import type {SimulationParams, Chargepoint, SimulationResults} from './types'

export const addMinutesDST = (utcDate: Date, minutes: number, timezone: SimulationParams['timezone']): Date => {
	const zonedDate = toZonedTime(utcDate, timezone)
	const zonedResult = addMinutes(zonedDate, minutes)
	return fromZonedTime(zonedResult, timezone)
}

export const getChargepoints = (params: SimulationParams): Array<Chargepoint> =>
	Array(params.chargepointCount)
		.fill(null)
		.map((_, index) => ({
			id: `Charger ${index + 1}`,
			powerCapacity: params.chargepointPowerCapacity,
			currentPowerDraw: 0,
			occupancy: null,
		}))

export const getResults = (): SimulationResults => ({
	totalEnergyConsumed: 0,
	totalChargingEvents: 0,
	actualMaxDemand: 0,
	currentDemandPerTick: [],
})

export const getCurrentDateTimeByTickNumber = (tickNumber: number, startDate: Date): Date =>
	addMinutes(startDate, tickNumber * 15)

export const rangeToEnergyDemand = (rangeDemand: number, evEfficiency: number): number =>
	(rangeDemand / 100) * evEfficiency

export const getChargingDurationInTicks = (energyDemand: number, chargepointPowerCapacity: number): number => {
	const chargingDurationMinutes = (energyDemand / chargepointPowerCapacity) * 60
	return Math.ceil(chargingDurationMinutes / 15)
}

export const getArrivalProbabilityByCurrentDateTime = (
	currentDateTime: Date,
	arrivalProbabilities: SimulationParams['arrivalProbabilities'],
	timezone: SimulationParams['timezone'],
): number => {
	const timeSlot = formatInTimeZone(currentDateTime, timezone, 'HH')
	const matchedHourlyProbabilityByTimeslot = arrivalProbabilities.find((arrivalProbability) =>
		arrivalProbability.timeOfDay.startsWith(timeSlot),
	)?.probability
	const tickScaledProbability =
		matchedHourlyProbabilityByTimeslot !== undefined ? matchedHourlyProbabilityByTimeslot / 4 : 0
	return tickScaledProbability
}

export const generateElligibleChargerOccupancy = (
	cumulativeChargingDemandProbabilities: SimulationParams['cumulativeChargingDemandProbabilities'],
	evEfficiency: SimulationParams['evEfficiency'],
	powerCapacity: SimulationParams['chargepointPowerCapacity'],
	currentTime: Date,
	timezone: SimulationParams['timezone'],
): Chargepoint['occupancy'] => {
	const randomValue = Math.random()
	const rangeDemandKm =
		cumulativeChargingDemandProbabilities.find((demand) => demand.cumulativeProbability >= randomValue)
			?.rangeDemand ?? 0

	if (rangeDemandKm > 0) {
		const energyDemand = rangeToEnergyDemand(rangeDemandKm, evEfficiency)
		const chargingDemandTicks = getChargingDurationInTicks(energyDemand, powerCapacity)
		if (chargingDemandTicks > 0) {
			return {
				evId: crypto.randomUUID(),
				chargeFrom: new Date(currentTime),
				chargeTo: addMinutesDST(new Date(currentTime), chargingDemandTicks * 15, timezone),
			}
		}
	}
	return null
}

export const generateElligibleArrival = (
	currentTime: Date,
	arrivalProbabilities: SimulationParams['arrivalProbabilities'],
	timezone: SimulationParams['timezone'],
): boolean => {
	const arrivalProbability = getArrivalProbabilityByCurrentDateTime(currentTime, arrivalProbabilities, timezone)
	return Math.random() < arrivalProbability
}

export const handleOccupyCharger = (
	charger: Chargepoint,
	elligibleChargerOccupancy: NonNullable<Chargepoint['occupancy']>,
): void => {
	charger.occupancy = elligibleChargerOccupancy
	charger.currentPowerDraw = charger.powerCapacity
}

export const handleIncrementEnergyConsumed = (
	results: SimulationResults,
	powerCapacity: Chargepoint['powerCapacity'],
): void => {
	results.totalEnergyConsumed += powerCapacity * (15 / 60)
}

export const handleIncrementChargingEvents = (results: SimulationResults): void => {
	results.totalChargingEvents += 1
}

export const printResults = (
	results: SimulationResults,
	{chargepointCount, chargepointPowerCapacity, expectedResults}: SimulationParams,
): void => {
	const theoreticalMaxDemand = chargepointCount * chargepointPowerCapacity
	const concurrencyFactor = results.actualMaxDemand / theoreticalMaxDemand
	const isDemandInRange =
		results.actualMaxDemand >= expectedResults.actualMaxDemand.min &&
		results.actualMaxDemand <= expectedResults.actualMaxDemand.max

	const isConcurencyInRange =
		concurrencyFactor >= expectedResults.concurrencyFactor.min &&
		concurrencyFactor <= expectedResults.concurrencyFactor.max

	console.log('\n 📊 SIMULATION RESULTS 📊 \n')
	console.log(`🔌Total Energy Consumed: ${results.totalEnergyConsumed.toFixed(2)} kWh`)
	console.log(`🪫Charging Events: ${results.totalChargingEvents} events`)
	console.log(`🔝Theoretical Maximum Power Demand: ${theoreticalMaxDemand} kW`)
	console.log(`🟰Actual Maximum Demand: ${results.actualMaxDemand.toFixed(1)} kW`)
	console.log(`⚖️Concurrency factor: ${(concurrencyFactor * 100).toFixed(1)}% \n`)
	console.log(
		isDemandInRange
			? '✅Actual max demand is within expected range.'
			: '❌Actual max demand is out of expected range.',
	)
	console.log(
		isConcurencyInRange
			? '✅Concurrency factor is within expected range.'
			: '❌Concurrency factor is out of expected range.',
	)
}
