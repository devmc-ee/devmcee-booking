import React, {useRef,useState} from 'react';
import PropTypes from 'prop-types';
import {MenuItem, ListSubheader} from "@material-ui/core";
import {makeStyles} from '@material-ui/styles';
import {TextField} from "formik-material-ui";
import {Field} from "formik";
import {EUROPE, AMERICAS, ASIA, OCEANIA, AFRICA} from "../COUNTRIES";
import ImageContainer from "./ImageContainer";

const useStyles = makeStyles({
	root: {
		background: '#ffffff',

	},

});
const countryItem =(country) => {
		const {alpha2Code, flag, alpha3Code, name, callingCodes} = country;
		console.log('render countryItem')
		return(
			<MenuItem key={alpha2Code} value={alpha2Code}  disableRipple={true} dense={true}>

				{flag? (
					<ImageContainer flag={flag} alpha3Code={alpha3Code}  />
					/*<img
					className="country-flag"
					src={flag}
					width="20"
					alt={alpha3Code}/>*/
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
				<ListSubheader component="div" classes={{
					root: classes.root
				}} color="primary">Europe</ListSubheader>

				{EUROPE.map( country => countryItem(country))}
				<ListSubheader component="div"  classes={{
					root: classes.root
				}} color="primary">Asia</ListSubheader>
				{ASIA.map( country => countryItem(country))}
				<ListSubheader component="div"  classes={{
					root: classes.root
				}}color="primary">Americas</ListSubheader>
				{AMERICAS.map( country => countryItem(country))}
				<ListSubheader component="div"  classes={{
					root: classes.root
				}} color="primary">Africa</ListSubheader>
				{AFRICA.map( country => countryItem(country))}
				<ListSubheader  component="div" classes={{
					root: classes.root
				}} color="primary">Oceania</ListSubheader>
				{OCEANIA.map( country => countryItem(country))}



			</Field>
		</>
	);
});

CallingCode.propTypes = {
	//default
	props: PropTypes.object

};

export default CallingCode;
