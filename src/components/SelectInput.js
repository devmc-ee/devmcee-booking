import React, {useContext} from "react";
import PropTypes from "prop-types";
import {MenuItem} from '@material-ui/core'
import {TextField} from 'formik-material-ui';
import {Field} from 'formik'
import {AppContext} from "../AppContext";
const validateSelect = value => {
	let error;
	if( !value ){
		error = 'Required!';
	}
	return error;
}
function SelectInput(props) {
	const {
		selectId,
		serviceGroupId,
		optionValues,
		optionNames,
		classes,
		defaultText,
		actionType,
		label,
		helperText
	} = {
		...props.options
	};
	const appContext = useContext(AppContext);
	const {lang} = appContext;
	let options = [];
	options.push(
		<MenuItem key = ""
			value = "">
			{defaultText}
		</MenuItem>
	);
	for (let i in optionValues) {
		let optionText = optionNames[optionValues[i]][lang];
		options.push(
			<MenuItem key = {optionValues[i]}
				value = {optionValues[i]?optionValues[i] : ''}>
				{optionText}
			</MenuItem>
		);
	}
	const handleChange = (groupId )=>e =>{

		props.onChange({
			type: actionType,
			payload: {
				value: e.target.value,
				serviceGroupdId: groupId
			}
		});
	}

	return (
		<Field id = {selectId}
			name={selectId}
			component={TextField}
			value = {props.value? props.value : ''}
			select
			label={label}
			helperText={helperText}
			data-service-group-id = {serviceGroupId}
			onChange = {handleChange( serviceGroupId)}
			fullWidth
			validate={validateSelect}

			className = {classes}>

			{options}
		</Field>
	);
}

SelectInput.propTypes = {
	value: PropTypes.any
};
export default SelectInput;
