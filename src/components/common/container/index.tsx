import React from 'react'

interface ContainerProps {
	children: React.ReactNode
}
export const Container = ({children}: ContainerProps) => {
	return (
		<div
			className={
				'min-h-screen bg-slate-200 px-4 sm:px-6 md:px-8 lg:px-16 py-8 flex flex-col justify-center items-center'
			}
		>
			{children}
		</div>
	)
}

export default Container
