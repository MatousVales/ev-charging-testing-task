export interface ChargepointOccupancy {
	evId: string
	chargeFrom: Date
	chargeTo: Date
}

export interface Chargepoint {
	id: string
	powerCapacity: number
	currentPowerDraw: number
	occupancy: ChargepointOccupancy | null
}

export interface ArrivalProbability {
	timeOfDay: string
	probability: number
}

export interface ChargingDemandProbability {
	rangeDemand: number
	probability: number
}

export interface CumulativeChargingDemandProbability {
	rangeDemand: number
	cumulativeProbability: number
}

export interface SimulationParams {
	chargepointCount: number
	chargepointPowerCapacity: number
	simulationDurationDays: number
	simulationStartDate: Date
	timezone: string
	ticksPerDay: number
	ticksPerHour: number
	evEfficiency: number
	arrivalProbabilities: Array<ArrivalProbability>
	chargingDemandProbabilities: Array<ChargingDemandProbability>
	cumulativeChargingDemandProbabilities: Array<CumulativeChargingDemandProbability>
	expectedResults: {
		actualMaxDemand: {min: number; max: number}
		concurrencyFactor: {min: number; max: number}
	}
}

export interface SimulationResults {
	totalEnergyConsumed: number
	totalChargingEvents: number
	actualMaxDemand: number
	currentDemandPerTick: Array<number>
}
