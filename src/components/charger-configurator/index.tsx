import React, {useCallback, useState} from 'react'
import {useField} from 'formik'

import ChargingColumn from 'components/charger-configurator/charging-column'
import srcChargingStandBlue from 'assets/images/charger_blue.png'
import srcChargingStandRed from 'assets/images/charger_red.png'
import srcChargingStandYellow from 'assets/images/charger_yellow.png'
import {SimulationFormValues} from 'components/forms/types'

const ChargingStandConfigurator = () => {
	const [chargersField] = useField<SimulationFormValues['chargers']>('chargers')
	const handleChargerChange = useCallback(
		({fieldName, value}: {fieldName: 'charger11kw' | 'charger22kw' | 'charger55kw'; value: string}) => {
			chargersField.onChange({
				target: {
					name: `chargers.${fieldName}`,
					value: parseInt(value, 10),
				},
			})
		},
		[chargersField],
	)

	return (
		<div className={'flex flex-col flex-grow'}>
			<div className={'flex justify-around items-stretch flex-grow'}>
				<ChargingColumn
					label={'11 kW'}
					fieldName={'charger11kw'}
					value={chargersField.value.charger11kw}
					onChange={handleChargerChange}
					color={'yellow'}
					imgSrc={srcChargingStandYellow}
				/>
				<ChargingColumn
					label={'22 kW'}
					fieldName={'charger22kw'}
					value={chargersField.value.charger22kw}
					onChange={handleChargerChange}
					color={'blue'}
					imgSrc={srcChargingStandBlue}
				/>
				<ChargingColumn
					label={'55 kW'}
					fieldName={'charger55kw'}
					value={chargersField.value.charger55kw}
					onChange={handleChargerChange}
					color={'red'}
					imgSrc={srcChargingStandRed}
				/>
			</div>
			<p className={'text-xs text-slate-500 mt-4 text-center'}>
				{'Specify the number of chargers available for each capacity (0-10).'}
			</p>
		</div>
	)
}

export default ChargingStandConfigurator
