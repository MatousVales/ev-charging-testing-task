import type {ArrivalProbability, ChargingDemandProbability, CumulativeChargingDemandProbability} from './types'

export const arrivalProbabilitiesData: Array<ArrivalProbability> = [
	{timeOfDay: '00:00-01:00', probability: 0.0094},
	{timeOfDay: '01:00-02:00', probability: 0.0094},
	{timeOfDay: '02:00-03:00', probability: 0.0094},
	{timeOfDay: '03:00-04:00', probability: 0.0094},
	{timeOfDay: '04:00-05:00', probability: 0.0094},
	{timeOfDay: '05:00-06:00', probability: 0.0094},
	{timeOfDay: '06:00-07:00', probability: 0.0094},
	{timeOfDay: '07:00-08:00', probability: 0.0094},
	{timeOfDay: '08:00-09:00', probability: 0.0283},
	{timeOfDay: '09:00-10:00', probability: 0.0283},
	{timeOfDay: '10:00-11:00', probability: 0.0566},
	{timeOfDay: '11:00-12:00', probability: 0.0566},
	{timeOfDay: '12:00-13:00', probability: 0.0566},
	{timeOfDay: '13:00-14:00', probability: 0.0755},
	{timeOfDay: '14:00-15:00', probability: 0.0755},
	{timeOfDay: '15:00-16:00', probability: 0.0755},
	{timeOfDay: '16:00-17:00', probability: 0.1038},
	{timeOfDay: '17:00-18:00', probability: 0.1038},
	{timeOfDay: '18:00-19:00', probability: 0.1038},
	{timeOfDay: '19:00-20:00', probability: 0.0472},
	{timeOfDay: '20:00-21:00', probability: 0.0472},
	{timeOfDay: '21:00-22:00', probability: 0.0472},
	{timeOfDay: '22:00-23:00', probability: 0.0094},
	{timeOfDay: '23:00-24:00', probability: 0.0094},
]

export const chargingDemandProbabilitiesData: Array<ChargingDemandProbability> = [
	{rangeDemand: 0, probability: 0.3431},
	{rangeDemand: 5, probability: 0.049},
	{rangeDemand: 10, probability: 0.098},
	{rangeDemand: 20, probability: 0.1176},
	{rangeDemand: 30, probability: 0.0882},
	{rangeDemand: 50, probability: 0.1176},
	{rangeDemand: 100, probability: 0.1078},
	{rangeDemand: 200, probability: 0.049},
	{rangeDemand: 300, probability: 0.0294},
]

export const getCumulativeChargingDemandProbabilities = (): Array<CumulativeChargingDemandProbability> => {
	let cumulativeSum = 0
	return chargingDemandProbabilitiesData.map((chargingDemand, index, chargingDemands) => ({
		rangeDemand: chargingDemand.rangeDemand,
		cumulativeProbability:
			index !== chargingDemands.length - 1
				? parseFloat((cumulativeSum += chargingDemand.probability).toFixed(4))
				: 1,
	}))
}
