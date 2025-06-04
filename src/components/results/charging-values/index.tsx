import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell} from 'recharts'

import {tooltipStyles, gridStyles, axisStyles} from 'components/results/styles'

const CHARGING_UTILIZATION_MOCK = [
	{type: '11kW', utilization: Math.round((Math.random() * 5 + 7) * 10) / 10, fill: '#E7CC5E'},
	{type: '22kW', utilization: Math.round((Math.random() * 8 + 15) * 10) / 10, fill: '#485283'},
	{type: '55kW', utilization: Math.round((Math.random() * 15 + 40) * 10) / 10, fill: '#D84E48'},
]

const ChargingValuesChart = () => {
	return (
		<div className={'flex-grow w-full'}>
			<ResponsiveContainer width={'100%'} height={400}>
				<BarChart
					data={CHARGING_UTILIZATION_MOCK}
					margin={{
						top: 5,
						right: 20,
						left: 0,
						bottom: 5,
					}}
				>
					<CartesianGrid {...gridStyles} />
					<XAxis {...axisStyles} dataKey={'type'} />
					<YAxis
						{...axisStyles}
						label={{
							value: 'kW',
							angle: 0,
							position: 'insideLeft',
							fill: '#475569',
							fontSize: 12,
							dx: 0,
						}}
					/>
					<Tooltip {...tooltipStyles} formatter={(value) => [`${value} kW`, 'Average Utilization']} />
					<Bar dataKey={'utilization'} barSize={30}>
						{CHARGING_UTILIZATION_MOCK.map((entry) => (
							<Cell key={`cell-${entry.type}`} fill={entry.fill} />
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default ChargingValuesChart
