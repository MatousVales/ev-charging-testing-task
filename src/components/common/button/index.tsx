import React from 'react'
import {twMerge} from 'tailwind-merge'

interface ButtonProps {
	onClick: () => void
	children: React.ReactNode
	className?: string
	isActive?: boolean
}

const Button = ({onClick, children, className}: ButtonProps) => (
	<button
		onClick={onClick}
		className={twMerge(
			'px-3 py-1 text-xs rounded-md transition-colors bg-slate-200 text-slate-700 hover:bg-slate-300',
			className,
		)}
	>
		{children}
	</button>
)

export default Button
