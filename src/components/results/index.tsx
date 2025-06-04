import React from 'react'
import {twMerge} from 'tailwind-merge'

import Card from 'components/common/card'
import CardContainer from 'components/common/card-container'
import ChargingValuesChart from 'components/results/charging-values'
import TotalEnergyChargedChart from 'components/results/total-energy-charged'
import ChargingEventsChart from 'components/results/charging-events'
import ExemplaryDayChart from 'components/results/exemplary-day'
import Grid from 'components/common/grid'
import HeroButton from 'components/common/hero-button'
import Button from 'components/common/button'

interface ResultsCardProps {
	title: string
	isOriginalResult: boolean
	isActive: boolean
	onClick: () => void
	configuartionOverview: React.ReactNode
}

const ResultsCard = ({isOriginalResult, isActive, title, configuartionOverview, onClick}: ResultsCardProps) => {
	return (
		<Card
			title={title}
			className={twMerge(
				'min-w-[1200px] relative top-auto left-auto opacity-100 z-20 cursor-default transition-all duration-500 ease-in-out',
				!isActive &&
					`absolute top-0 left-0 opacity-60 z-10 cursor-pointer ${
						isOriginalResult
							? 'scale-95 translate-x-[-100px] translate-y-[-120px]'
							: 'scale-95 translate-x-[100px] translate-y-[80px]'
					}`,
			)}
			onClick={onClick}
			detail={
				<div className={'flex items-center'}>
					<div className={'mr-10 text-xs'}>{configuartionOverview}</div>
					<Button onClick={() => {}} className={'px-5 py-2'}>
						{'Export Results'}
					</Button>
				</div>
			}
		>
			<Grid>
				<CardContainer title={'Average Charger Utilization'}>
					<ChargingValuesChart />
				</CardContainer>
				<CardContainer title={'Total Energy Charged'}>
					<TotalEnergyChargedChart />
				</CardContainer>
			</Grid>
			<Grid className={'grid-cols-1 md:grid-cols-1 gap-1'}>
				<CardContainer title={'Charging Events'}>
					<ChargingEventsChart />
				</CardContainer>
			</Grid>
			<Grid className={'grid-cols-1 md:grid-cols-1 gap-1'}>
				<CardContainer title={'Exemplary Day'}>
					<ExemplaryDayChart />
				</CardContainer>
			</Grid>
			<div className={'flex justify-center mt-6 py-5'}>
				<HeroButton label={'Get your Free Quote!'} onClick={() => {}} />
			</div>
		</Card>
	)
}

export default ResultsCard
