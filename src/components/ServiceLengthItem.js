import React from "react";

export default function ServiceLengthItem(props) {
	//if(props.selectedService)
	let obj = props.serviceOptions
	const lang = props.lang
	let optionNames=props.options
	console.log('props.serviceOptions in Service Option: ',obj)
	console.log('props.options in Service Option: ',optionNames)
	let serviceOptions = [];
	serviceOptions.push(<option key='0' value="" >Length...</option>)
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			serviceOptions.push(<option
				value={obj[key].code}
				key = {obj[key].code}>{optionNames[key][lang]}</option>);
		}
	}
	return serviceOptions;

}
