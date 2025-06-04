import React, {useState, useMemo} from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

import {generatedailyChargingEventsDataMock} from 'components/results/charging-events/data'
import {tooltipStyles, gridStyles, axisStyles, legendStyles} from 'components/results/styles'
import Button from 'components/common/button'

interface AggregatedDataPoint {
	name: string
	total: number
	'11kW': number
	'22kW': number
	'55kW': number
}

const AGGREGATION_STEPS = ['Daily', 'Weekly', 'Monthly', 'Yearly']
const DAILY_EVENTS_DATA_MOCK = generatedailyChargingEventsDataMock(4719)

const ChargingEventsChart = () => {
	const [aggregation, setAggregation] = useState('Daily')

	const aggregateByDay = aggregation === 'Daily'
	const aggregateByWeek = aggregation === 'Weekly'
	const aggregateByMonth = aggregation === 'Monthly'
	const aggregateByYear = aggregation === 'Yearly'

	const dot = {r: aggregateByYear ? 4 : 2}
	const activeDot = {r: aggregateByYear ? 6 : 4}

	const aggregatedData = useMemo(() => {
		if (aggregateByDay) {
			return DAILY_EVENTS_DATA_MOCK.map((day, index) => ({...day, name: `Day ${index + 1}`}))
		}

		if (aggregateByWeek) {
			const weeklyData: Array<AggregatedDataPoint> = []
			for (let i = 0; i < DAILY_EVENTS_DATA_MOCK.length; i += 7) {
				const weekSlice = DAILY_EVENTS_DATA_MOCK.slice(i, i + 7)
				weeklyData.push(
					weekSlice.reduce(
						(acc, day) => ({
							total: acc.total + day.total,
							'11kW': acc['11kW'] + day['11kW'],
							'22kW': acc['22kW'] + day['22kW'],
							'55kW': acc['55kW'] + day['55kW'],
							name: `Week ${Math.floor(i / 7) + 1}`,
						}),
						{
							total: 0,
							'11kW': 0,
							'22kW': 0,
							'55kW': 0,
							name: `Week ${Math.floor(i / 7) + 1}`,
						},
					),
				)
			}
			return weeklyData
		}

		if (aggregateByMonth) {
			const monthlyData: Array<AggregatedDataPoint> = Array(12)
				.fill(null)
				.map((_, monthIndex) => ({
					total: 0,
					'11kW': 0,
					'22kW': 0,
					'55kW': 0,
					name: new Date(2025, monthIndex, 1).toLocaleString('default', {month: 'long'}),
				}))
			DAILY_EVENTS_DATA_MOCK.forEach((day, index) => {
				const monthIndex = Math.floor(index / (365 / 12))
				if (monthlyData[monthIndex]) {
					monthlyData[monthIndex].total += day.total
					monthlyData[monthIndex]['11kW'] += day['11kW']
					monthlyData[monthIndex]['22kW'] += day['22kW']
					monthlyData[monthIndex]['55kW'] += day['55kW']
				}
			})
			return monthlyData
		}

		if (aggregateByYear) {
			const yearlyData = DAILY_EVENTS_DATA_MOCK.reduce(
				(acc, day) => ({
					total: (acc.total += day.total),
					'11kW': (acc['11kW'] += day['11kW']),
					'22kW': (acc['22kW'] += day['22kW']),
					'55kW': (acc['55kW'] += day['55kW']),
					name: 'Year Total',
				}),
				{
					total: 0,
					'11kW': 0,
					'22kW': 0,
					'55kW': 0,
					name: 'Year Total',
				},
			)
			return [yearlyData]
		}
		return []
	}, [aggregateByYear, aggregateByMonth, aggregateByWeek, aggregateByDay])

	return (
		<div className={'flex-grow w-full'}>
			<div className={'flex justify-center space-x-2 my-3'}>
				{AGGREGATION_STEPS.map((step) => (
					<Button
						key={step}
						onClick={() => setAggregation(step)}
						className={
							aggregation === step
								? 'bg-cyan-600 text-white font-semibold hover:bg-cyan-700'
								: 'bg-slate-200 text-slate-700 hover:bg-slate-300'
						}
					>
						{step}
					</Button>
				))}
			</div>
			<ResponsiveContainer width={'100%'} height={400}>
				<LineChart
					data={aggregatedData}
					margin={{
						top: 5,
						right: 20,
						left: -10,
						bottom: aggregateByDay || aggregateByWeek || aggregateByYear ? 20 : 5,
					}}
				>
					<CartesianGrid {...gridStyles} />
					<XAxis
						{...axisStyles}
						dataKey={'name'}
						angle={aggregateByDay ? -30 : 0}
						textAnchor={aggregateByDay ? 'end' : 'middle'}
						height={aggregateByDay ? 40 : 30}
					/>
					<YAxis
						{...axisStyles}
						label={{
							value: 'Charge Events',
							angle: -90,
							position: 'insideLeft',
							fill: '#475569',
							fontSize: 12,
							dx: 10,
						}}
					/>
					<Tooltip {...tooltipStyles} />
					<Legend {...legendStyles} />
					<Line
						type={'monotone'}
						dataKey={'total'}
						stroke={'#1E293B'}
						dot={dot}
						activeDot={activeDot}
						name={'Total'}
					/>
					<Line
						type={'monotone'}
						dataKey={'11kW'}
						stroke={'#E7CC5E'}
						dot={dot}
						activeDot={activeDot}
						name={'11kW Charge Events'}
					/>
					<Line
						type={'monotone'}
						dataKey={'22kW'}
						stroke={'#485283'}
						dot={dot}
						activeDot={activeDot}
						name={'22kW Charge Events'}
					/>
					<Line
						type={'monotone'}
						dataKey={'55kW'}
						stroke={'#D84E48'}
						dot={dot}
						activeDot={activeDot}
						name={'55kW Charge Events'}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}

export default ChargingEventsChart
