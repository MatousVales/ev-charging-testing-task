import React from 'react'
import {twMerge} from 'tailwind-merge'

import SpinnerIcon from 'assets/icons/spinner'

interface HeroButtonProps {
	onClick?: () => void
	isLoading?: boolean
	label: string
	type?: 'button' | 'submit' | 'reset'
}

const HeroButton = ({onClick, isLoading = false, label, type = 'button'}: HeroButtonProps) => {
	return (
		<div className={'relative inline-block group'}>
			<button
				type={type}
				onClick={onClick}
				disabled={isLoading}
				className={twMerge(
					'bg-slate-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transform transition-all duration-300 ease-in-out focus:outline-none relative z-10 flex items-center justify-center min-w-[140px] min-h-[56px]',
					isLoading
						? 'cursor-not-allowed opacity-75'
						: 'hover:bg-slate-600 hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] hover:scale-105',
				)}
			>
				{isLoading ? <SpinnerIcon /> : label}
			</button>
			<span
				className={
					'absolute top-0 left-0 w-full h-full rounded-full bg-cyan-500 -z-0 transition-opacity duration-300 opacity-0 group-hover:animate-ping group-hover:opacity-20'
				}
			></span>
		</div>
	)
}

export default HeroButton
