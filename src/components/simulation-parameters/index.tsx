import React from 'react'
import {useField} from 'formik'

import Slider from 'components/forms/slider'
import Select from 'components/forms/select'
import {SimulationFormValues} from 'components/forms/types'

const TIMEZONE_OPTIONS = [
	{value: 'cet', label: 'CET'},
	{value: 'est', label: 'EST'},
	{value: 'pst', label: 'PST'},
]

const SimulationParameters = () => {
	const [simulationDaysField] = useField<SimulationFormValues['simulationDays']>('simulationDays')
	const [multiplierField] =
		useField<SimulationFormValues['arrivalProbabilityMultiplier']>('arrivalProbabilityMultiplier')
	const [efficiencyField] = useField<SimulationFormValues['evEfficiency']>('evEfficiency')
	const [timezoneField] = useField<SimulationFormValues['timezone']>('timezone')

	return (
		<>
			<Slider
				fieldName={simulationDaysField.name}
				onChange={simulationDaysField.onChange}
				value={simulationDaysField.value}
				label={'Simulation Duration'}
				min={1}
				max={365}
				description={'Adjust the total duration for the simulation'}
				unit={'day'}
			/>
			<Slider
				fieldName={multiplierField.name}
				onChange={multiplierField.onChange}
				value={multiplierField.value}
				label={'Arrival Probability Multiplier'}
				min={20}
				max={200}
				description={'Multiplier for increasing the likelihood of arrivals'}
				unit={'%'}
			/>
			<Slider
				fieldName={efficiencyField.name}
				onChange={efficiencyField.onChange}
				value={efficiencyField.value}
				label={'EV Efficiency'}
				min={15}
				max={25}
				description={'Electricity conspumption of arriving EVs. Less means more efficient.'}
				unit={'kWh'}
				denominator={'/100km'}
			/>
			<Select
				fieldName={timezoneField.name}
				onChange={timezoneField.onChange}
				value={timezoneField.value}
				label={'Timezone'}
				description={'Select the timezone for the simulation'}
				options={TIMEZONE_OPTIONS}
			/>
		</>
	)
}

export default SimulationParameters
