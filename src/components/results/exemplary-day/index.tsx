import React from 'react'
import {Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart} from 'recharts'

import {generateMockExemplaryDayData} from 'components/results/exemplary-day/data'
import ExemplaryDayBreakdown from 'components/results/exemplary-day/breakdown'
import {tooltipStyles, gridStyles, axisStyles, legendStyles} from 'components/results/styles'

const EXEMPLARY_DAY_DATA_MOCK = generateMockExemplaryDayData()

const ExemplaryDayChart = () => (
	<div className={'flex-grow w-full'}>
		<ExemplaryDayBreakdown
			breakdown={{
				total: EXEMPLARY_DAY_DATA_MOCK.dailyEnergyDemand.total.toFixed(2),
				...EXEMPLARY_DAY_DATA_MOCK.dailyEnergyDemand.byChargerType,
			}}
		/>
		<ResponsiveContainer width={'100%'} height={400}>
			<ComposedChart
				data={EXEMPLARY_DAY_DATA_MOCK.hourlyActivity}
				margin={{top: 5, right: 20, left: -10, bottom: 5}}
			>
				<CartesianGrid {...gridStyles} />
				<XAxis {...axisStyles} dataKey={'time'} />
				<YAxis
					{...axisStyles}
					label={{
						value: 'Active Chargers',
						angle: -90,
						position: 'insideLeft',
						fill: '#475569',
						fontSize: 12,
						dx: 10,
					}}
					allowDecimals={false}
				/>
				<Tooltip {...tooltipStyles} formatter={(value, name) => [`Active ${name}: ${value}`]} />
				<Legend {...legendStyles} />
				<Bar
					dataKey={'active11kWChargers'}
					stackId={'a'}
					fill={'#E7CC5E'}
					name={'11kW Chargers'}
					barSize={20}
				/>
				<Bar
					dataKey={'active22kWChargers'}
					stackId={'a'}
					fill={'#485283'}
					name={'22kW Chargers'}
					barSize={20}
				/>
				<Bar
					dataKey={'active55kWChargers'}
					stackId={'a'}
					fill={'#D84E48'}
					name={'55kW Chargers'}
					barSize={20}
				/>
			</ComposedChart>
		</ResponsiveContainer>
	</div>
)

export default ExemplaryDayChart
