export const generatedailyChargingEventsDataMock = (totalYearlyEvents: number) => {
	const daysInYear = 365
	const dailyEvents = []
	const baseDailyRate = totalYearlyEvents / daysInYear

	for (let i = 0; i < daysInYear; i++) {
		const dayOfWeek = i % 7
		let dailyTotal = baseDailyRate

		dailyTotal *= 1 + Math.sin((i / daysInYear) * Math.PI * 2 - Math.PI / 2) * 0.2
		if (dayOfWeek === 5 || dayOfWeek === 6) {
			dailyTotal *= 1.3
		} else if (dayOfWeek === 0 || dayOfWeek === 1) {
			dailyTotal *= 0.85
		}
		dailyTotal *= Math.random() * 0.4 + 0.8

		dailyTotal = Math.max(0, Math.round(dailyTotal))

		let events11kW = Math.round(dailyTotal * (Math.random() * 0.2 + 0.3))
		let events22kW = Math.round(dailyTotal * (Math.random() * 0.2 + 0.25))
		const remainingEvents = dailyTotal - events11kW - events22kW
		let events55kW = Math.max(0, remainingEvents)

		const currentSum = events11kW + events22kW + events55kW
		const diff = dailyTotal - currentSum
		if (diff !== 0 && events55kW + diff >= 0) events55kW += diff
		else if (diff !== 0 && events22kW + diff >= 0) events22kW += diff
		else if (diff !== 0 && events11kW + diff >= 0) events11kW += diff

		dailyEvents.push({
			total: dailyTotal,
			'11kW': events11kW,
			'22kW': events22kW,
			'55kW': events55kW,
		})
	}
	return dailyEvents
}
