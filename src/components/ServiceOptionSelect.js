import React, { useContext } from "react";

import { AppContext } from "../AppContext";
import SelectInput from "./SelectInput";
import { SERVICE_OPTIONS, SERVICE_OPTIONS_NAMES } from "../SERVICES_DATA";

function ServiceOptionSelect(props) {
	const appContext = useContext(AppContext);
	const serviceBase = props.servicebase;
	const selectedServiceOptions = serviceBase && SERVICE_OPTIONS[serviceBase];
	const optionValues = serviceBase && Reflect.ownKeys(selectedServiceOptions);

	let optionNames = [];

	for (let i in optionValues) {
		optionNames[optionValues[i]] = {
			[appContext.lang]:
				SERVICE_OPTIONS_NAMES[selectedServiceOptions[optionValues[i]]][
					appContext.lang
					]
		};
	}
	const serviceGroupId = props.serviceGroupdId;
	const options = {
		optionValues: optionValues,
		optionNames: optionNames,
		selectId: "service-option-" + serviceGroupId,
		serviceGroupId: serviceGroupId,
		defaultText: "Options...",
		lang: appContext.lang,
		classes: "select-class",
		actionType: 'selectServiceOption'
	};
	return (
		<SelectInput
			options={options}
			value={props.value}
			onChange={props.onChange}
		/>
	);
}
export default ServiceOptionSelect;
