import React, {useCallback, useState} from 'react'

import Container from 'components/common/container'
import Card from 'components/common/card'
import Grid from 'components/common/grid'
import HeroButton from 'components/common/hero-button'
import ChargerConfiguration from 'components/charger-configurator'
import CardContainer from 'components/common/card-container'
import Header from 'components/common/header'
import TopMenu from 'components/common/top-menu'
import SimulationParameters from 'components/simulation-parameters'
import ResultsCard from 'components/results'

function App() {
	const configuratorRef = React.createRef<HTMLDivElement>()
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
	}, [resultsStack])

	const configuartionOverview = (
		<div>
			{'Chargers: 2 x 11kW, 1 x 22kW, 1 x 55kW, EV Efficiency: 18kWhs/100km, Duration: 365 Days. '}
			<strong>{'Theoretical Peak Power Demand: 220kW'}</strong>
		</div>
	)
	return (
		<>
			<TopMenu />
			<Container>
				<Header />
				<div className={'py-24 sm:py-32 md:py-40'}>
					<HeroButton onClick={handleStartConfiguring} label={'Start Configuring'} />
				</div>
				<Card title={'Configure Simulation'} ref={configuratorRef}>
					<Grid>
						<CardContainer title={'Simulation Parameters'}>
							<SimulationParameters />
						</CardContainer>
						<CardContainer title={'Configure Chargers'}>
							<ChargerConfiguration />
						</CardContainer>
					</Grid>
				</Card>
				<div className={'py-24 sm:py-32 md:py-40'}>
					<HeroButton
						onClick={handleRunSimulation}
						isLoading={isLoading}
						label={resultsStack.length >= 1 ? 'Compare Results' : 'Simulate!'}
					/>
				</div>
				<div className={'relative pb-10'}>
					{resultsStack.length > 0 &&
						resultsStack.map((result, index) => {
							const isActive = index === activeResultIndex
							const isOriginalResult = index === 0
							const hasMultipleResults = resultsStack.length > 1

							return (
								<ResultsCard
									key={result.id}
									title={isOriginalResult && hasMultipleResults ? 'Previous Results' : 'Results'}
									onClick={() => setActiveResultIndex(index)}
									configuartionOverview={configuartionOverview}
									isActive={isActive}
									isOriginalResult={isOriginalResult}
								/>
							)
						})}
				</div>
			</Container>
		</>
	)
}

export default App
