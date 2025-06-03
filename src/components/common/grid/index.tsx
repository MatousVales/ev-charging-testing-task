import React from 'react'

interface GridProps {
	children: React.ReactNode
}
export const Grid = ({children}: GridProps) => {
	return <div className={'grid grid-cols-1 md:grid-cols-2 gap-10'}>{children}</div>
}

export default Grid
