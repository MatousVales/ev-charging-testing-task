import React from 'react'

import Slider from 'components/forms/slider'
import Select from 'components/forms/select'

const SimulationParameters = () => {
	return (
		<>
			<Slider
				fieldName={'simulationDays'}
				label={'Simulation Duration'}
				min={1}
				max={365}
				description={'Adjust the total duration for the simulation'}
				unit={'day'}
			/>
			<Slider
				fieldName={'arrivalProbabilityMultiplier'}
				label={'Arrival Probability Multiplier'}
				min={20}
				max={200}
				description={'Multiplier for increasing the likelihood of arrivals'}
				unit={'%'}
			/>
			<Slider
				fieldName={'evEfficiency'}
				label={'EV Efficiency'}
				min={15}
				max={25}
				description={'Electricity conspumption of arriving EVs. Less means more efficient.'}
				unit={'kWh'}
				denominator={'/100km'}
			/>
			<Select
				fieldName={'timezone'}
				label={'Timezone'}
				description={'Select the timezone for the simulation'}
				options={[
					{value: 'utc', label: 'UTC'},
					{value: 'cet', label: 'CET'},
					{value: 'est', label: 'EST'},
					{value: 'pst', label: 'PST'},
				]}
				initialValue={'utc'}
			/>
		</>
	)
}

export default SimulationParameters
