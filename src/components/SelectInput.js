import React from "react";
import PropTypes from "prop-types";

function SelectInput(props) {
	const {
		selectId,
		serviceGroupId,
		optionValues,
		optionNames,
		classes,
		defaultText,
		lang,
		actionType
	} = {
		...props.options
	};

	let options = [];
	options.push(
		<option key = ""
			value = "">
			{defaultText}
		</option>
	);
	for (let i in optionValues) {
		let optionText = optionNames[optionValues[i]][lang];
		options.push(
			<option key = {optionValues[i]}
				value = {optionValues[i]}>
				{optionText}
			</option>
		);
	}

	return (
		<select id = {selectId}
			value = {props.value}
			data-service-group-id = {serviceGroupId}
			onChange = {e => {
				props.onChange({
					type: actionType,
					payload: {
						value: e.target.value,
						serviceGroupdId: e.target.dataset.serviceGroupId
					}
				});
			}
			}
			className = {classes}>
			{options}
		</select>
	);
}

SelectInput.propTypes = {
	value: PropTypes.any
};
export default SelectInput;
