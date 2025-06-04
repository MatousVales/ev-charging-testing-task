import React from 'react'
import {twMerge} from 'tailwind-merge'

interface GridProps {
	children: React.ReactNode
	className?: string
}
export const Grid = ({children, className}: GridProps) => {
	return <div className={twMerge('grid grid-cols-1 md:grid-cols-2 gap-10', className)}>{children}</div>
}

export default Grid
