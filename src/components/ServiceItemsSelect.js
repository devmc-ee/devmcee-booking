import React from "react";
import ServiceItem from "./ServiceItem";

function ServiceItemsSelect(props) {

	return (
		<select
			id={'ServiceItem__'+props.serviceGroupId}
			value = {props.value}
			onChange = {props.changeHandler}
			name={"booking-form__service-item"}
			className="booking-form__service-item">

			<ServiceItem services = {props.services} lang = {props.lang}/>
		</select>
	)

}
export default ServiceItemsSelect

