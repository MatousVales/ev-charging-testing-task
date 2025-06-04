import {format, setHours, startOfDay} from 'date-fns'
export const generateMockExemplaryDayData = () => {
	const hourlyActivity = []
	let dailyEnergyTotal = 0
	const dailyEnergyDemandByType = {'11kW': 0, '22kW': 0, '55kW': 0}

	for (let i = 0; i < 24; i++) {
		const time = format(setHours(startOfDay(new Date()), i), 'HH:mm')
		const activityFactor = Math.sin((i / 23) * Math.PI) * 0.7 + 0.3

		const active11kWChargers = Math.min(10, Math.round(Math.random() * 5 * activityFactor))
		const active22kWChargers = Math.min(10, Math.round(Math.random() * 3 * activityFactor))
		const active55kWChargers = Math.min(10, Math.round(Math.random() * 2 * activityFactor))
		const totalActive = active11kWChargers + active22kWChargers + active55kWChargers

		hourlyActivity.push({time, active11kWChargers, active22kWChargers, active55kWChargers, totalActive})

		const energyDemand11kWCharger = active11kWChargers * (Math.random() * 5 + 6) // Avg 6-11 kWh per active 11kW charger
		const energyDemand22kWCharger = active22kWChargers * (Math.random() * 10 + 12) // Avg 12-22 kWh per active 22kW charger
		const energyDemand55kWCharger = active55kWChargers * (Math.random() * 20 + 30) // Avg 30-50 kWh per active 55kW charger

		dailyEnergyDemandByType['11kW'] += energyDemand11kWCharger
		dailyEnergyDemandByType['22kW'] += energyDemand22kWCharger
		dailyEnergyDemandByType['55kW'] += energyDemand55kWCharger
		dailyEnergyTotal += energyDemand11kWCharger + energyDemand22kWCharger + energyDemand55kWCharger
	}
	return {
		hourlyActivity,
		dailyEnergyDemand: {total: dailyEnergyTotal, byChargerType: dailyEnergyDemandByType},
	}
}
