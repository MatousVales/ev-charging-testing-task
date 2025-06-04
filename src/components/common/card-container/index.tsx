import React from 'react'

interface CardContainerProps {
	title: string
	children: React.ReactNode
}

const CardContainer = ({title, children}: CardContainerProps) => {
	return (
		<div
			className={
				'flex flex-grow flex-col w-full my-4 text-left p-4 border border-slate-300 rounded-md bg-slate-50'
			}
		>
			<h3 className={'text-md font-semibold text-slate-800 mb-4'}>{title}</h3>
			{children}
		</div>
	)
}

export default CardContainer
