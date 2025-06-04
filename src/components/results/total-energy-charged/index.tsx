import React from 'react'
import {Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie} from 'recharts'

import {tooltipStyles, legendStyles} from 'components/results/styles'

const TotalEnergyChargedChart = () => {
	const totalEnergyChargedDataMock = {
		totalEnergyCharged: 60775,
		chargerBreakdown: [
			{name: '11kW Chargers', value: 60775 * 0.4, fill: '#E7CC5E'},
			{name: '22kW Chargers', value: 60775 * 0.35, fill: '#485283'},
			{name: '55kW Chargers', value: 60775 * 0.25, fill: '#D84E48'},
		],
	}

	return (
		<div className={'flex-grow w-full'}>
			<ResponsiveContainer width={'100%'} height={400}>
				<PieChart>
					<Pie
						data={totalEnergyChargedDataMock.chargerBreakdown}
						cx={'50%'}
						cy={'50%'}
						labelLine={false}
						label={({percent}) => `${(percent * 100).toFixed(0)}%`}
						outerRadius={150}
						dataKey={'value'}
					>
						{totalEnergyChargedDataMock.chargerBreakdown.map((entry, index) => (
							<Cell key={`cell-pie-${index}`} fill={entry.fill} />
						))}
					</Pie>
					<Tooltip {...tooltipStyles} formatter={(value, name) => [`${value} kWh`, name]} />
					<Legend {...legendStyles} />
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}

export default TotalEnergyChargedChart
