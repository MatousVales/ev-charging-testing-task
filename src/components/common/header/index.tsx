import React from 'react'

const Header = () => (
	<header className={'pt-24 sm:pt-32 md:pt-40 text-center'}>
		<div className={'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'}>
			<div className={'flex flex-row space-y-6'}>
				<h1 className={'text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-800'}>
					{'Simulate Your'} <span className={'text-cyan-600 animate-electricPulse'}>{'EV Charging'}</span>{' '}
					{'Needs'}
				</h1>
			</div>
			<p className={'mt-32 text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto'}>
				{'Plan your '} <strong>{'electric vehicle infrastructure '}</strong>
				{'with precision.'}
				<br />
				{'Adjust '} <strong>{'parameters'}</strong>
				{', '}
				<strong>{'visualize results'}</strong>
				{', and '}
				<strong>{'optimize your charging network seamlessly.'}</strong>
			</p>
		</div>
	</header>
)

export default Header
