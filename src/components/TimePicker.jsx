import React from 'react';
import {useFormikContext} from "formik";
import {getTotalDuration, getTimeSlots} from '../utils'
import {CALENDAR_SETTINGS} from '../DATA';

const TimePicker = ({selectedDate}) => {
	const context = useFormikContext();
	const services = context.values.services || [];

	const servicesTotalLength = getTotalDuration(services);
	const timeSlots = getTimeSlots(
		servicesTotalLength,
		CALENDAR_SETTINGS.workingTime,
		CALENDAR_SETTINGS.timeStep);
	const availableTimeSlots = timeSlots => {
		return(
			timeSlots.map(slot=>(
					<div key={slot} className="calendar-time-slot">
						{slot}
					</div>
				)

			)
		)

	}
	return (
		<>
			{availableTimeSlots(timeSlots)}
		</>
	)
};

export default TimePicker;
