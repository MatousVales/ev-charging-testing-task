import React, {forwardRef} from 'react'
import classNames from 'classnames'

interface CardProps {
	children: React.ReactNode
	title: string
	className?: string
	onClick?: () => void
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({children, title, className, onClick}: CardProps, ref) => (
	<div
		className={classNames(
			'flex flex-col bg-white p-8 rounded-lg shadow-xl shadow-slate-400/50 text-center scroll-mt-[20px]',
			className,
		)}
		onClick={onClick}
		ref={ref}
	>
		<div className={'flex items-center mb-6'}>
			<h2 className={'text-2xl font-semibold text-slate-700 text-left'}>{title}</h2>
		</div>
		{children}
	</div>
))

export default Card
