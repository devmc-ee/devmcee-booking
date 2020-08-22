import React from 'react';
import PropTypes from 'prop-types';
import {MenuItem, ListSubheader} from "@material-ui/core";
import {makeStyles} from '@material-ui/styles';
import {TextField} from "formik-material-ui";
import {Field} from "formik";
import * as REGIONS from '../COUNTRIES';
import ImageContainer from "./ImageContainer";

const useStyles = makeStyles({
	root: {
		background: '#ffffff',
	},
});

const countryItem =(country) => {
		const {alpha2Code, flag, alpha3Code, name, callingCodes} = country;

		return(
			<MenuItem
				key={alpha2Code}
				value={alpha2Code}
				disableRipple={true}
				dense={true}
			>
				{flag? (
					<ImageContainer flag={flag} alpha3Code={alpha3Code}   />
					): '' } {name}
				{callingCodes[0]?'(+'+callingCodes[0]+')':''}
			</MenuItem>
		)
	};

const CallingCode =React.memo( () => {
	const classes = useStyles();

	const validateOption = value => {
		let error;
		if (!value) {
			error = "Required!";
		}
		console.log('calling code val', value)
		return error;
	};

	let callingCodes = [];

	for(let region of Object.keys(REGIONS)){

		callingCodes.push(<ListSubheader
			key={region}
			component="div" classes={{root: classes.root}}
			color="primary">{region}</ListSubheader>);

		for (let country of REGIONS[region]){

			callingCodes.push(countryItem(country))
		}
	}

	return (
		<>
			<Field
				component={TextField}
				name="contacts.countryCode"
				id="contacts.countryCode" label="Code"
				select={true}
				as="select"
				type="text"
				fullWidth
				validate={validateOption}
				autoComplete="off" variant="standard" placeholder="+372...">

				<MenuItem value="" />

				{callingCodes}

			</Field>
		</>
	);
});

CallingCode.propTypes = {

	props: PropTypes.object

};

export default CallingCode;
