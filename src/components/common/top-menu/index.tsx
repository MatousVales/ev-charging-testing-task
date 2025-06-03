import React from 'react'

const TopMenu = () => {
	return (
		<nav className={'bg-slate-200 py-3 shadow-sm sticky top-0 z-50'}>
			<div className={'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
				<div className={'flex items-center justify-end space-x-6'}>
					<a
						href={'https://ev-database.org/compare/efficiency-electric-vehicle-most-efficient'}
						className={'text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors'}
					>
						{'EV Efficiency Chart'}
					</a>
					<a
						href={'#how'} // Placeholder link
						className={'text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors'}
					>
						{'How Do We calculate?'}
					</a>
					<a
						href={'#about'} // Placeholder link
						className={'text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors'}
					>
						{'About'}
					</a>
				</div>
			</div>
		</nav>
	)
}

export default TopMenu
