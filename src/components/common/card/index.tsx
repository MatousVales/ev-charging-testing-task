import React, {forwardRef} from 'react'
import classNames from 'classnames'

interface CardProps {
	children: React.ReactNode
	title: string
	className?: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({children, title, className}: CardProps, ref) => (
	<div
		className={classNames(
			'flex flex-col bg-white p-8 rounded-lg shadow-xl shadow-slate-400/50 text-center scroll-mt-[20px]',
			className,
		)}
		ref={ref}
	>
		<div className={'flex items-center mb-6'}>
			<h2 className={'text-2xl font-semibold text-slate-700 text-left'}>{title}</h2>
		</div>
		{children}
	</div>
))

export default Card
