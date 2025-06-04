import React, {forwardRef} from 'react'
import classNames from 'classnames'

interface CardProps {
	children: React.ReactNode
	detail?: React.ReactNode
	title: string
	className?: string
	onClick?: () => void
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
	({children, title, className, onClick, detail}: CardProps, ref) => (
		<div
			className={classNames(
				'flex flex-col  bg-white p-8 rounded-lg shadow-xl shadow-slate-400/50 text-center scroll-mt-[20px]',
				className,
			)}
			onClick={onClick}
			ref={ref}
		>
			<div className={'flex items-center mb-6 justify-between'}>
				<h2 className={'text-2xl font-semibold text-slate-700 text-left'}>{title}</h2>
				{detail && <div className={'flex'}>{detail}</div>}
			</div>
			{children}
		</div>
	),
)

export default Card
