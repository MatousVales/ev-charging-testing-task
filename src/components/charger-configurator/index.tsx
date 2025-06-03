import React, {useCallback, useState} from 'react'

import ChargingColumn from 'components/charger-configurator/charging-column'
import srcChargingStandBlue from 'assets/images/charger_blue.png'
import srcChargingStandRed from 'assets/images/charger_red.png'
import srcChargingStandYellow from 'assets/images/charger_yellow.png'

const ChargingStandConfigurator = () => {
	const [chargers, setChargers] = useState({charger11kw: 0, charger22kw: 0, charger55kw: 0})

	const handleChargerChange = useCallback(
		({fieldName, value}: {fieldName: 'charger11kw' | 'charger22kw' | 'charger55kw'; value: string}) => {
			setChargers((prev) => ({
				...prev,
				[fieldName]: parseInt(value),
			}))
		},
		[],
	)

	return (
		<div className={'flex flex-col flex-grow'}>
			<div className={'flex justify-around items-stretch flex-grow'}>
				<ChargingColumn
					label={'11 kW'}
					fieldName={'charger11kw'}
					value={chargers.charger11kw}
					onChange={handleChargerChange}
					color={'yellow'}
					imgSrc={srcChargingStandYellow}
				/>
				<ChargingColumn
					label={'22 kW'}
					fieldName={'charger22kw'}
					value={chargers.charger22kw}
					onChange={handleChargerChange}
					color={'blue'}
					imgSrc={srcChargingStandBlue}
				/>
				<ChargingColumn
					label={'55 kW'}
					fieldName={'charger55kw'}
					value={chargers.charger55kw}
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
