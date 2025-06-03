import React from 'react'
import classNames from 'classnames'

import MinusIcon from 'assets/icons/minus'
import PlusIcon from 'assets/icons/plus'

interface ChargingColumnProps {
	fieldName: 'charger11kw' | 'charger22kw' | 'charger55kw'
	value: number
	onChange: ({fieldName, value}: {fieldName: 'charger11kw' | 'charger22kw' | 'charger55kw'; value: string}) => void
	imgSrc: string
	color: 'yellow' | 'blue' | 'red'
	label: string
}

const mapColorVariantToClassNames = (
	color: 'yellow' | 'blue' | 'red',
): {fillIndicatorClassName: string; rootClassName: string; iconClassName: string; textClassName: string} =>
	({
		['yellow']: {
			fillIndicatorClassName: 'bg-yellow-200',
			rootClassName: 'bg-yellow-50 border-yellow-400',
			iconClassName: 'text-yellow-700 hover:text-yellow-800 hover:bg-yellow-300',
			textClassName: 'text-yellow-700',
		},
		['blue']: {
			fillIndicatorClassName: 'bg-blue-200',
			rootClassName: 'bg-blue-50 border-blue-400',
			iconClassName: 'text-blue-700 hover:text-blue-800 hover:bg-blue-300',
			textClassName: 'text-blue-700',
		},
		['red']: {
			fillIndicatorClassName: 'bg-red-200',
			rootClassName: 'bg-red-50 border-red-400',
			iconClassName: 'text-red-700 hover:text-red-800 hover:bg-red-300',
			textClassName: 'text-red-700',
		},
	}[color] ?? {
		fillIndicatorClassName: 'bg-slate-200',
		rootClassName: 'bg-slate-50 border-slate-400',
		iconClassName: 'text-slate-700 hover:text-slate-800 hover:bg-slate-300',
		textClassName: 'text-slate-700',
	})

const ChargingColumn = ({fieldName, value, onChange, imgSrc, color, label}: ChargingColumnProps) => {
	const {fillIndicatorClassName, rootClassName, iconClassName, textClassName} = mapColorVariantToClassNames(color)
	const handleDecrement = () => {
		onChange({fieldName, value: String(Math.max(0, value - 1))})
	}

	const handleIncrement = () => {
		onChange({fieldName, value: String(Math.max(0, value + 1))})
	}
	const fillPercentage = (value / 10) * 100

	return (
		<div
			className={classNames(
				'relative flex flex-col items-center p-4 rounded-xl shadow-lg border w-1/3 mx-1.5 flex-grow overflow-hidden',
				rootClassName,
			)}
		>
			<div
				className={classNames(
					'absolute bottom-0 left-0 w-full transition-all duration-500 ease-in-out',
					fillIndicatorClassName,
				)}
				style={{height: `${fillPercentage}%`}}
			></div>

			<div className={'relative z-10 flex flex-col items-center justify-between w-full h-full select-none'}>
				<h3 className={classNames('font-semibold mb-2', textClassName)}>{label}</h3>
				<div className={'flex items-center justify-center mb-3'}>
					<img src={imgSrc} alt={''} height={125} width={125} />
				</div>
				<div className={'flex items-center justify-center space-x-2'}>
					<MinusIcon onClick={handleDecrement} className={iconClassName} />
					<span className={classNames(`text-lg font-semibold w-8 text-center`, textClassName)}>{value}</span>
					<PlusIcon onClick={handleIncrement} className={iconClassName} />
				</div>
			</div>
		</div>
	)
}

export default ChargingColumn
