import React from 'react'

import {SimulationFormValues} from '@/components/forms/types'
import {pluralize} from 'utils'

interface ConfigurationProps {
	configuration: SimulationFormValues
}

const ConfigurationOverview = ({configuration}: ConfigurationProps) => {
	const has11kwChargers = configuration.chargers.charger11kw > 0
	const has22kwChargers = configuration.chargers.charger22kw > 0
	const has55kwChargers = configuration.chargers.charger55kw > 0
	return (
		<div>
			{`Chargers: ${has11kwChargers ? `${configuration.chargers.charger11kw} x 11kW, ` : ''}${
				has22kwChargers ? `${configuration.chargers.charger22kw} x 22kW, ` : ''
			}${has55kwChargers ? `${configuration.chargers.charger55kw} x 55kW, ` : ''}
			EV Efficiency: ${configuration.evEfficiency}Whs/100km, Duration: ${configuration.simulationDays} ${pluralize(
				configuration.simulationDays,
				'Day',
			)}. `}
			<strong>{`Theoretical Peak Power Demand: ${
				configuration.chargers.charger11kw * 11 +
				configuration.chargers.charger22kw * 22 +
				configuration.chargers.charger55kw * 55
			}kW`}</strong>
		</div>
	)
}

export default ConfigurationOverview
