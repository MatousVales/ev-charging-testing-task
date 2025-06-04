import React from 'react'

interface ExemplaryDayChartProps {
	breakdown: {
		total: string
		'11kW': number
		'22kW': number
		'55kW': number
	}
}

const ExemplaryDayBreakdown = ({breakdown}: ExemplaryDayChartProps) => (
	<div className={'my-3 p-3 bg-slate-100 rounded-lg text-center'}>
		<p className={'text-sm text-slate-700'}>
			{'Total Energy Charged: '}
			<span className={'font-bold'}>{`${breakdown.total} kWh`}</span>
		</p>
		<div className={'flex justify-center space-x-4 text-xs mt-1'}>
			<span>{`11kW Chargers: ${breakdown['11kW'].toFixed(2)} kWh`}</span>
			<span>{`22kW Chargers: ${breakdown['22kW'].toFixed(2)} kWh`}</span>
			<span>{`55kW Chargers: ${breakdown['55kW'].toFixed(2)} kWh`}</span>
		</div>
	</div>
)

export default ExemplaryDayBreakdown
