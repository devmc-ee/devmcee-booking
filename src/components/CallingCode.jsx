import React from 'react';
import PropTypes from 'prop-types';
import {MenuItem} from "@material-ui/core";
import {TextField} from "formik-material-ui";
import {Field} from "formik";
import {COUNTRIES} from "../COUNTRIES";

const countryItem =(country) => {
		const {alpha2Code, flag, alpha3Code, name, callingCodes} = country;
		console.log('render countryItem')
		return(
			<MenuItem key={alpha2Code} value={alpha2Code}  disableRipple={true}>
				{flag? (<img
					className="country-flag"
					src={flag}
					width="20"
					alt={alpha3Code}/>): '' } {name}
				{callingCodes[0]?'(+'+callingCodes[0]+')':''}
			</MenuItem>
		)
	};

const CallingCode =React.memo( () => {

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

				{COUNTRIES.map( country => countryItem(country))}


			</Field>
		</>
	);
});

CallingCode.propTypes = {
	//default
	props: PropTypes.object

};

export default CallingCode;
