import React from 'react';
import {useFormikContext} from "formik";
import moment from 'moment';

const SelectAppointmentLabel = () => {
	const formik = useFormikContext();
	const m = moment();
	m.locale('en')

	let date, time;
	let appointmentLabel;
	if(formik.values.hasOwnProperty('appointment') &&
		formik.values.appointment.time){
		date = formik.values.appointment.date? moment(formik.values.appointment.date,
			'YYYY-MM-DD').format('Do MMM, YYYY (dddd)'):'';
		time = formik.values.appointment.time;
		appointmentLabel = time + ', ' +date ;
	}else{
		appointmentLabel = 'Select Date and Time';
	}
	return (
		<>
			{appointmentLabel}
		</>
	);
};

export default SelectAppointmentLabel;
