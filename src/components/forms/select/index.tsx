import React, {useState} from 'react'

import InfoIcon from 'assets/icons/info'

interface SelectProps {
	fieldName: string
	label: string
	onChange?: (value: number) => void
	options: Array<{value: string | number; label: string}>
	initialValue: string | number
	description: string
}

export const Select = ({fieldName, label, description, initialValue, options}: SelectProps) => {
	const [selectedValue, setSelectedValue] = useState(initialValue) // will be replace with Formik

	return (
		<div className={'w-full my-6 text-left'}>
			<div className={'flex justify-between items-center mb-1'}>
				<label htmlFor={fieldName} className={'text-sm font-medium text-slate-700'}>
					{label}
				</label>
			</div>
			<div className={'flex items-center space-x-3'}>
				<select
					id={fieldName}
					name={fieldName}
					value={selectedValue}
					onChange={(e) => setSelectedValue(e.target.value)}
					className={
						'w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-cyan-600 focus:border-cyan-600 text-sm text-slate-700 bg-white appearance-none'
					}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<InfoIcon />
			</div>
			<p className={'text-xs text-slate-500 mt-1'}>{description}</p>
		</div>
	)
}

export default Select
