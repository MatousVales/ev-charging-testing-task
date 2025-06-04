import React from 'react'

import CardContainer from 'components/common/card-container'
import ChargingValuesChart from 'components/results/charging-values'
import TotalEnergyChargedChart from 'components/results/total-energy-charged'
import ChargingEventsChart from 'components/results/charging-events'
import ExemplaryDayChart from 'components/results/exemplary-day'
import Grid from 'components/common/grid'

const Results = () => {
	return (
		<div>
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
		</div>
	)
}

export default Results
