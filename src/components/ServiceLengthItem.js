import React from "react";

export default function ServiceLengthItem(props) {
	//if(props.selectedService)
	let obj = props.serviceOptions
	const lang = props.lang
	let options=props.options
	let list = [];
	list.push(<option key='0' value="" >Length...</option>)
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			list.push(<option
				value={obj[key].code}
				key = {obj[key].code}>{options[key][lang]}</option>);
		}
	}
	return list;

}
