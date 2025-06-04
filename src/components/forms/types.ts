export interface SimulationFormValues {
	simulationDays: number
	arrivalProbabilityMultiplier: number
	evEfficiency: number
	timezone: string
	chargers: {
		charger11kw: number
		charger22kw: number
		charger55kw: number
	}
}
