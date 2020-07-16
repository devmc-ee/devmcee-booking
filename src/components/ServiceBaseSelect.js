import React from "react";


function ServiceBaseSelect(props) {
	let obj = props.services
	const lang = props.lang
	let list = [];
	list.push(<option key = '0' value = "" disabled>Service...</option>)
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			list.push(<option value = {obj[key].code} key = {obj[key].code}>{obj[key].name[lang]}</option>);
		}
	}
		return (
			<select
				id = {'serviceItem__' + props.serviceGroupId}
				data-service-group-id = {props.serviceGroupId}
				value = {props.value}
				onChange = {props.changeHandler}
				name = {"booking-form__service-item"}
				className = "booking-form__service-item"
			>
				{list}
			</select>
		)
}

export default ServiceBaseSelect

