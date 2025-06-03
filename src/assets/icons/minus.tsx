import React from 'react'
import classNames from 'classnames'

interface MinusIconProps {
	onClick?: () => void
	className?: string
}

const MinusIcon = ({onClick, className}: MinusIconProps) => (
	<svg
		xmlns={'http://www.w3.org/2000/svg'}
		width={'24'}
		height={'24'}
		viewBox={'0 0 24 24'}
		fill={'none'}
		stroke={'currentColor'}
		strokeWidth={'2'}
		strokeLinecap={'round'}
		strokeLinejoin={'round'}
		className={classNames('cursor-pointer p-1 rounded-full transition-colors', className)}
		onClick={onClick}
	>
		<line x1={'5'} y1={'12'} x2={'19'} y2={'12'}></line>
	</svg>
)

export default MinusIcon
