import React, {useState} from 'react'

import InfoIcon from 'assets/icons/info'
import {pluralize} from 'utils'

interface SliderProps {
	fieldName: string
	label: string
	onChange?: (value: number) => void
	min: number
	max: number
	description: string
	unit: string
	denominator?: string
}

export const Slider = ({fieldName, label, min, max, description, unit, denominator}: SliderProps) => {
	const dontPluralize = unit === '%'
	const [sliderValue, setSliderValue] = useState(180) // will be replaced with formik

	return (
		<div className={'w-full my-6 text-left'}>
			<div className={'flex justify-between items-center mb-1'}>
				<label htmlFor={fieldName} className={'text-sm font-medium text-slate-700'}>
					{label}
				</label>
				<span className={'text-xs text-slate-500'}>
					<strong className={'text-cyan-700'}>{`${sliderValue} ${pluralize(
						dontPluralize ? 1 : sliderValue,
						unit,
					)}${denominator ? denominator : ''}`}</strong>
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
					value={sliderValue}
					onChange={(e) => setSliderValue(parseInt(e.target.value))}
				/>
				<InfoIcon />
			</div>
			<p className={'text-xs text-slate-500 mt-1'}>{description}</p>
		</div>
	)
}

export default Slider
