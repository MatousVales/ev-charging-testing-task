import React from 'react'

import InfoIcon from 'assets/icons/info'
import {pluralize} from 'utils'

interface SliderProps {
	fieldName: string
	label: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
	value: number
	min: number
	max: number
	description: string
	unit: string
	denominator?: string
}

export const Slider = ({fieldName, value, label, min, max, description, unit, denominator, onChange}: SliderProps) => {
	const dontPluralize = unit === '%'

	return (
		<div className={'w-full my-6 text-left'}>
			<div className={'flex justify-between items-center mb-1'}>
				<label htmlFor={fieldName} className={'text-sm font-medium text-slate-700'}>
					{label}
				</label>
				<span className={'text-xs text-slate-500'}>
					<strong className={'text-cyan-700'}>{`${value} ${pluralize(dontPluralize ? 1 : value, unit)}${
						denominator ? denominator : ''
					}`}</strong>
					{` (${min}-${max} ${pluralize(dontPluralize ? 1 : 2, unit)}${denominator ? denominator : ''})`}
				</span>
			</div>
			<div className={'flex items-center space-x-3'}>
				<input
					className={'w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600'}
					type={'range'}
					id={fieldName}
					name={fieldName}
					min={min}
					max={max}
					value={value}
					onChange={onChange}
				/>
				<InfoIcon />
			</div>
			<p className={'text-xs text-slate-500 mt-1'}>{description}</p>
		</div>
	)
}

export default Slider
