import React from 'react';
import {useFormikContext} from "formik";
import {getTotalDuration, getTimeSlots} from '../utils'
import {CALENDAR_SETTINGS} from '../DATA';
import {Button} from '@material-ui/core';

const TimePicker = ({selectedDate}) => {
	const context = useFormikContext();
	const services = context.values.services || [];

	const servicesTotalLength = getTotalDuration(services);
	const timeSlots = getTimeSlots(
		servicesTotalLength,
		CALENDAR_SETTINGS.workingTime,
		CALENDAR_SETTINGS.timeStep,
		['11:00', '11:30']);
	const availableTimeSlots = timeSlots => {
		return (
			timeSlots.map(slot => (
					<div key={slot} className="calendar-time-slot">
						<Button>
							{slot}
						</Button>
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
