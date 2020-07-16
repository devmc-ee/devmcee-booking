import React from "react";


export default function ServiceOptionSelect(props) {

	let selectedServiceOptions = props.selectedServiceOptions
	const lang = props.lang
	let optionNames = props.serviceOptionsNames

	let serviceOptions = [];
	let optionValue = ''
	let optionName = ''
	serviceOptions.push(<option key = '0' value = "">Length...</option>)
	for (let key in selectedServiceOptions) {
		if (selectedServiceOptions.hasOwnProperty(key)) {

			optionValue = selectedServiceOptions[key].code
			optionName = optionNames[key][lang]

			serviceOptions.push(<option value = {optionValue} key = {optionValue}>{optionName}</option>);
		}
	}

	return (
		<select
			id = {'serviceOption__' + props.serviceGroupId}
			data-service-group-id={props.serviceGroupId}
			className = "booking-form__service-option"
			onChange = {props.handleOptionSelectChange}
			defaultValue = {props.selectedServiceValue}>
			{serviceOptions}
		</select>
	);
}
