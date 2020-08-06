import React, {useState} from 'react';
import {useFormikContext} from "formik";
import {getTotalDuration, getTimeSlots} from '../utils'
import {CALENDAR_SETTINGS} from '../DATA';
import {Button} from '@material-ui/core';

const TimePicker = ({selectedDate}) => {
	const [bookingTime, setBookingTime] = useState('');
	const context = useFormikContext();
	const services = context.values.services || [];

	const servicesTotalLength = getTotalDuration(services);
	const timeSlots = getTimeSlots(
		servicesTotalLength,
		CALENDAR_SETTINGS.workingTime,
		CALENDAR_SETTINGS.timeStep,
		[]);

	const handleClick =  slot => event=>{
		setBookingTime(slot);
		context.setValues({
			services: services,
			appointment:{
				date: selectedDate,
				time: slot
			}
		})
	}

	const availableTimeSlots = timeSlots => {
		return (
			timeSlots.map(slot => (

						<Button
							variant={(slot === bookingTime )? 'contained':'text'}
							color={(slot === bookingTime )? 'primary':'default'}
							value={slot}
							key={slot}
							onClick={handleClick(slot)}>
							{slot}
						</Button>

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
