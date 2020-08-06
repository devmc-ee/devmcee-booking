import React, {useState} from 'react';
import {useFormikContext} from "formik";
import {getTotalDuration, getTimeSlots,groupTimeSlots} from '../utils'
import {CALENDAR_SETTINGS} from '../DATA';
import {Accordion, AccordionDetails, AccordionSummary, Button} from '@material-ui/core';
import {ExpandMore} from "@material-ui/icons";

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
	const groupedTimeSlots = groupTimeSlots(timeSlots, CALENDAR_SETTINGS.timeSlotGroups );

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
			<Accordion className="calendar-accordion-item">
				<AccordionSummary
					expandIcon={<ExpandMore />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					11:00 - 14:00
				</AccordionSummary>
				<AccordionDetails>
					Content
				</AccordionDetails>
			</Accordion>
			<Accordion className="calendar-accordion-item"
			>
				<AccordionSummary
					expandIcon={<ExpandMore />}
					aria-controls="panel2a-content"
					id="panel2a-header"
				>
					14:00 - 18:00
				</AccordionSummary>
				<AccordionDetails>
					Content
				</AccordionDetails>
			</Accordion>
			<Accordion className="calendar-accordion-item"
			>
				<AccordionSummary
					expandIcon={<ExpandMore />}

					aria-controls="panel3a-content"
					id="panel3a-header"
				>
					18:00 - 21:00
				</AccordionSummary>
				<AccordionDetails>
					Content
				</AccordionDetails>
			</Accordion>
		</>
	)
};

export default TimePicker;
