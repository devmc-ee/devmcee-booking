import React from 'react';
import {useFormikContext} from "formik";
import {getTotalDuration} from '../utils'

const TimePicker = ({selectedDate}) => {
	const context = useFormikContext();
	const services = context.values.services || [];

	const servicesTotalLength = getTotalDuration(services);
	return (
		<>
			{selectedDate} - {servicesTotalLength} min
		</>
	)
};

export default TimePicker;
