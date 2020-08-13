import React from 'react';
import PropTypes from 'prop-types';
import {MenuItem} from "@material-ui/core";
import {TextField} from "formik-material-ui";
import {Field} from "formik";


const CallingCode = ({codes}) => {

	const validateOption = value => {
		let error;
		if (!value) {
			error = "Required!";
		}
		return error;
	};


	return (
		<>
			<Field
				component={TextField}
				name="contacts.callingcode"
				id="contacts.callingcode" label="Code"
				select={true}
				as="select"
				type="text"
				fullWidth

				validate={validateOption}

				autoComplete="off" variant="standard" placeholder="+372...">
				<MenuItem value="" />

				{codes}
			</Field>
		</>
	);
};

CallingCode.propTypes = {
	//default
	props: PropTypes.object

};

export default CallingCode;
