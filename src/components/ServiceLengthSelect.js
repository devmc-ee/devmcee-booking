import React from "react";
import ServiceLengthItem from './ServiceLengthItem'

export default function ServiceLengthSelect(props){

	return (
		<select
			id={props.serviceGroupId}
			className="booking-form__service-option"
		onChange={props.handleOptionSelectChange}
			defaultValue={props.selectedServiceValue}
			>
			<ServiceLengthItem
				serviceOptions={props.servicesOptions}
				lang={props.lang}
				options={props.lengths} />
		</select>
	);
}
