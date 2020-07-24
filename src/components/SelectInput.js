import React, {useContext} from "react";
import PropTypes from "prop-types";
import {AppContext} from "../AppContext";

function SelectInput(props) {
	const {
		selectId,
		serviceGroupId,
		optionValues,
		optionNames,
		classes,
		defaultText,
		actionType
	} = {
		...props.options
	};
	const appContext = useContext(AppContext);
	const {lang} = appContext;
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
