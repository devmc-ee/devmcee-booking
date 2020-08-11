import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {MenuItem} from "@material-ui/core";
import {TextField} from "formik-material-ui";
import {Field} from "formik";
import {COUNTRIES} from "../COUNTRIES";


const CallingCode = props => {
	const validateOption = value => {
		let error;
		if (!value) {
			error = "Required!";
		}
		return error;
	};
	//[...{"name":"Estonia","alpha2Code":"EE","callingCodes":["372"]}]
	const [code, setCode] = useState('EE')
	return (
		<>
			<Field
				component={TextField}
				name="contacts.callingcode"
				id="contacts.callingcode" type="text" label="Code"
				select={true}
				fullWidth
				as="select"
				validate={validateOption}

				autoComplete="off" variant="standard" placeholder="+372...">
				{COUNTRIES.map(country => {
					return(
						<MenuItem key={country.alpha2Code} value={country.alpha2Code} disableRipple={true}>
							<img src={country.flag} width="32" /> 	(+{country.callingCodes[0]}) {country.name}
						</MenuItem>
					)
				})}
			</Field>
		</>
	);
};

CallingCode.propTypes = {
	//default
	props: PropTypes.object

};

export default CallingCode;
