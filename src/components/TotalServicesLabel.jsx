import React from 'react';
import TotalPrice from "./TotalPrice";
import {IconButton} from "@material-ui/core";

import EditIcon from '@material-ui/icons/Edit';
import {useFormikContext} from "formik";
import {getTotalDuration} from '../utils';
import moment from 'moment';

const TotalServicesLabel = ({activeStep, setActiveStep}) => {
	const formik = useFormikContext();
	moment.locale('en');
	let labelText;
	const numberOfServices = Object.keys(formik.values.services).length;
	const servicesDuration = getTotalDuration(formik.values.services);

	//TODO: change strings to variables for further translation
	const servDurationText = servicesDuration
		? moment.duration(servicesDuration,'minutes').asHours() +'h'
		: '';

	const handleClick = step => event => {
		setActiveStep(step);
		const appointmet = {appointment: ''}
		formik.setValues({...formik.values, ...appointmet});

	};

	const editIcon =  activeStep > 0 ? (
		<IconButton size="small" onClick={handleClick(0) }><EditIcon/></IconButton>
	) :  '';

	if (servicesDuration > 0) {
		labelText = (<>
			{numberOfServices} serivces: <TotalPrice services={formik.values.services}/>/
			{servDurationText}
			</>);

	} else {
		labelText = 'Select service';
	}
	return (
		<>
			{labelText} {editIcon}
		</>
	);
};

export default TotalServicesLabel;

