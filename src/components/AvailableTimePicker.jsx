import React, {useState} from 'react';
import moment from 'moment';
import {ChevronLeft, ChevronRight} from '@material-ui/icons';
import {IconButton, Button} from "@material-ui/core";
import {CALENDAR_SETTINGS} from '../DATA';
import 'moment/locale/et';
import 'moment/locale/ru';

const AvailableTimePicker = ({locale}) => {
	moment.locale(locale);
	const [calendarDate, setCalendarDate] = useState(moment().date());
	const maxAvailableDays = CALENDAR_SETTINGS.maxAvailableDays;
	let calendarDays = [];
	let disabledDay;
	for (let i = calendarDate; i < calendarDate + 7; i++) {
		disabledDay = (Math.abs(moment().date() - i + 1) >= maxAvailableDays);
		calendarDays.push({
			weekday: moment().date(i).format('ddd'),
			date: moment().date(i).format('D'),
			disabled: disabledDay
		})

	}

	const handleRightClick = () => {
		if (maxAvailableDays > calendarDate)
			setCalendarDate(prevDate => prevDate + 7);

	}
	const handleLeftClick = () => {
		if (moment().date() < calendarDate)
			setCalendarDate(prevDate => prevDate - 7);

	}

	return (
		<div>
			<div className="calendar-month-year">{moment().date(calendarDate).format('MMMM, Y')}</div>
			<div className="calendar-week">
				<IconButton
					disabled={calendarDate === moment().date() ? true : false}
					onClick={handleLeftClick}
					size="small"><ChevronLeft/></IconButton>
				<div className="calendar-weekdays">

					{calendarDays.map(
						(day, i) => (
							<div key={i} className="calendar-day">
								<div className="calendar-weekday-name">
									{day.weekday}
								</div>
								<div className="calendar-date">
									<Button
										disabled={day.disabled}>{day.date}</Button>
								</div>
							</div>

						)
					)}
				</div>

				<IconButton
					disabled={calendarDate > maxAvailableDays ? true : false} size="small"
					onClick={handleRightClick}><ChevronRight/></IconButton>
			</div>
		</div>
	)
}
export default AvailableTimePicker;
