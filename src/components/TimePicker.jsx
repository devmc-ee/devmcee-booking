import React from 'react';
import {useFormikContext} from "formik";
import {getTotalDuration, getTimeSlots, groupTimeSlots} from '../utils'
import {CALENDAR_SETTINGS} from '../DATA';
import {Accordion, AccordionDetails, AccordionSummary, Button} from '@material-ui/core';
import {ExpandMore} from "@material-ui/icons";
import moment from 'moment';

const TimePicker = ({selectedDate}) => {
	const mSelectedDate = moment(selectedDate);

	mSelectedDate.locale(CALENDAR_SETTINGS.locale);


	const context = useFormikContext();
	const services = context.values.services || [];
	const time = context.values.appointment ? context.values.appointment.time : '';
	const servicesTotalLength = getTotalDuration(services);
	const timeSlots = getTimeSlots(
		selectedDate,
		[],
		servicesTotalLength,
		CALENDAR_SETTINGS);

	const groupedTimeSlots = groupTimeSlots(timeSlots, CALENDAR_SETTINGS.timeSlotGroups);

	const handleClick = slot => event => {

		//setBookingTime(slot);
		context.setValues({
			services: services,
			appointment: {
				date: selectedDate,
				time: slot
			}
		})

	}

	const availableTimeSlots = timeSlots => {
		return (
			timeSlots.map(slot => (

					<Button
						variant={(slot === time) ? 'contained' : 'text'} color={(slot === time) ? 'primary' : 'default'}
						value={slot} key={slot} onClick={handleClick(slot)}>
						{slot}
					</Button>

				)
			)
		)

	}
	return (
		<>

			{groupedTimeSlots.map((group, i) => (
				<Accordion key={i} className="calendar-accordion-item">
					<AccordionSummary
					expandIcon={<ExpandMore/>} aria-controls="panel1a-content" id="panel1a-header">

					{CALENDAR_SETTINGS.timeSlotGroups[i].start} - {CALENDAR_SETTINGS.timeSlotGroups[i].end} [ {group.length} available]

				</AccordionSummary> <AccordionDetails>
					<div className="calendar-timeslots-container">
						{availableTimeSlots(group)}
					</div>
				</AccordionDetails> </Accordion>
			))}

		</>
	)
};

export default TimePicker;
