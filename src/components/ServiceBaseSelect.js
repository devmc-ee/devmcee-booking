import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import SelectInput from "./SelectInput";

import { SERVICES } from "../SERVICES_DATA";


function ServiceBaseSelect(props) {

	const appContext = useContext(AppContext);
	const errors = props.errors;
	console.log(errors)
	const {dispatch} = appContext;
	const serviceGroupId = props.serviceGroupdId;
	const options = {
		optionValues: Reflect.ownKeys(SERVICES),
		optionNames: SERVICES,
		selectId: "service-base-" + serviceGroupId,
		serviceGroupId: serviceGroupId,
		defaultText: "Service...",
		classes: "select-class",
		actionType: 'selectServiceBase',
		label: 'Massage',
		helperText: 'Select a massage type'
	};

	return (
		<div>
			<SelectInput

				options={options}

				/*value= {props.value ? props.value : ""}*/
				value= {props.value }
				onChange={dispatch}
			/>
		</div>
	);
}
export default ServiceBaseSelect;
