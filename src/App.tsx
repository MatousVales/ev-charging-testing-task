import React, {useCallback, useState} from 'react'
import {twMerge} from 'tailwind-merge'

import Container from 'components/common/container'
import Card from 'components/common/card'
import Grid from 'components/common/grid'
import HeroButton from 'components/common/hero-button'
import ChargerConfiguration from 'components/charger-configurator'
import CardContainer from 'components/common/card-container'
import Header from 'components/common/header'
import TopMenu from 'components/common/top-menu'
import SimulationParameters from 'components/simulation-parameters'
import Results from 'components/results'

function App() {
	const configuratorRef = React.createRef<HTMLDivElement>()
	const resultsRef = React.createRef<HTMLDivElement>()
	const [resultsStack, setResultsStack] = useState<Array<{id: string}>>([])
	const [activeResultIndex, setActiveResultIndex] = useState<number>(0)
	const [isLoading, setIsLoading] = useState(false)

	const handleStartConfiguring = useCallback(() => {
		if (configuratorRef.current) {
			configuratorRef.current.scrollIntoView({behavior: 'smooth'})
		}
	}, [configuratorRef])

	const handleRunSimulation = useCallback(() => {
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
			setResultsStack((prev) =>
				[
					...prev,
					{
						id: crypto.randomUUID(),
					},
				].slice(-2),
			)
			if (resultsStack.length) {
				setActiveResultIndex(1)
			}
		}, 2500)
		if (resultsRef.current) {
			resultsRef.current.scrollIntoView({behavior: 'smooth'})
		}
	}, [resultsStack, resultsRef])

	return (
		<>
			<TopMenu />
			<Container>
				<Header />
				<div className={'py-24 sm:py-32 md:py-40'}>
					<HeroButton onClick={handleStartConfiguring} label={'Start Configuring'} />
				</div>
				<Card title={'Configure Simulation'} ref={configuratorRef}>
					<div className={'flex flex-row'}>
						<Grid>
							<CardContainer title={'Simulation Parameters'}>
								<SimulationParameters />
							</CardContainer>
							<CardContainer title={'Configure Chargers'}>
								<ChargerConfiguration />
							</CardContainer>
						</Grid>
					</div>
				</Card>
				<div className={'py-24 sm:py-32 md:py-40'}>
					<HeroButton
						onClick={handleRunSimulation}
						isLoading={isLoading}
						label={resultsStack.length >= 1 ? 'Compare Results' : 'Simulate!'}
					/>
				</div>
				<div className={'relative'} ref={resultsRef}>
					{resultsStack.length > 0 &&
						resultsStack.map((result, index) => {
							const isActive = index === activeResultIndex
							const isOriginalResult = index === 0
							const hasMultipleResults = resultsStack.length > 1

							return (
								<Card
									key={result.id}
									title={isOriginalResult && hasMultipleResults ? 'Previous Results' : 'Results'}
									className={twMerge(
										'min-w-[1200px] relative top-auto left-auto opacity-100 z-20 cursor-default transition-all duration-500 ease-in-out',
										!isActive &&
											`absolute top-0 left-0 opacity-60 z-10 cursor-pointer ${
												isOriginalResult
													? 'scale-95 translate-x-[-100px] translate-y-[-120px]'
													: 'scale-95 translate-x-[100px] translate-y-[80px]'
											}`,
									)}
									onClick={() => setActiveResultIndex(index)}
								>
									<Results />
								</Card>
							)
						})}
				</div>
			</Container>
		</>
	)
}

export default App
