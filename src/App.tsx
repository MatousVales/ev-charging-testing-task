import React, {useCallback, useState} from 'react'
import {Form, Formik, FormikHelpers} from 'formik'

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
import {SimulationFormValues} from 'components/forms/types'
import ConfigurationOverview from 'components/common/configuration'

const initialValues = {
	simulationDays: 365,
	arrivalProbabilityMultiplier: 100,
	evEfficiency: 18,
	timezone: 'cet',
	chargers: {charger11kw: 0, charger22kw: 0, charger55kw: 0},
}

function App() {
	const configuratorRef = React.createRef<HTMLDivElement>()
	const [resultsStack, setResultsStack] = useState<Array<{id: string; configuration: SimulationFormValues}>>([])
	const [activeResultIndex, setActiveResultIndex] = useState<number>(0)

	const handleStartConfiguring = useCallback(() => {
		if (configuratorRef.current) {
			configuratorRef.current.scrollIntoView({behavior: 'smooth'})
		}
	}, [configuratorRef])

	const handleRunSimulation = useCallback(
		(values: SimulationFormValues, {setSubmitting}: FormikHelpers<SimulationFormValues>) => {
			setTimeout(() => {
				setResultsStack((prev) =>
					[
						...prev,
						{
							id: crypto.randomUUID(),
							configuration: values,
						},
					].slice(-2),
				)
				if (resultsStack.length) {
					setActiveResultIndex(1)
				}
				setSubmitting(false)
			}, 500)
		},
		[resultsStack],
	)

	return (
		<>
			<TopMenu />
			<Container>
				<Header />
				<div className={'py-24 sm:py-32 md:py-40'}>
					<HeroButton onClick={handleStartConfiguring} label={'Start Configuring'} />
				</div>
				<Formik<SimulationFormValues> initialValues={initialValues} onSubmit={handleRunSimulation}>
					{({isSubmitting}) => (
						<Form noValidate>
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
							<div className={'flex justify-center py-24 sm:py-32 md:py-40'}>
								<HeroButton
									type={'submit'}
									isLoading={isSubmitting}
									label={resultsStack.length >= 1 ? 'Compare Results' : 'Simulate!'}
								/>
							</div>
						</Form>
					)}
				</Formik>
				<div className={'relative pb-10'}>
					{resultsStack.length > 0 &&
						resultsStack.map(({id, configuration}, index) => {
							const isActive = index === activeResultIndex
							const isOriginalResult = index === 0
							const hasMultipleResults = resultsStack.length > 1
							return (
								<ResultsCard
									key={id}
									title={isOriginalResult && hasMultipleResults ? 'Previous Results' : 'Results'}
									onClick={() => setActiveResultIndex(index)}
									configuartionOverview={<ConfigurationOverview configuration={configuration} />}
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
