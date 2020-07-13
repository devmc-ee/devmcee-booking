import React from "react";

export default function ServiceItem(props) {

	let obj = props.services
	const lang=props.lang
	let list = [];
	list.push(<option key='0' value="" disabled >Service...</option>)
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			list.push(<option
				value={obj[key].code}
				key = {obj[key].code}>{obj[key].name[lang]}</option>);
		}
	}
	return list;
}



