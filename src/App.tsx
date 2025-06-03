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

function App() {
	const configuratorRef = React.createRef<HTMLDivElement>()

	const [hasResults, showResults] = useState(false)
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
			showResults(true)
		}, 2500)
	}, [])

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
					<HeroButton onClick={handleRunSimulation} isLoading={isLoading} label={'Simulate!'} />
				</div>
				{hasResults && <Card title={'Results'}>{'Results'}</Card>}
			</Container>
		</>
	)
}

export default App
