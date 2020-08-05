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
	const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
	const {maxAvailableDays, disabledWeekDays}= CALENDAR_SETTINGS;

	let calendarDays = [];
	let disabledDay, selectedDay;

	for (let i = calendarDate; i < calendarDate + 7; i++) {
		disabledDay = (Math.abs(moment().date() - i + 1) >= maxAvailableDays);
		disabledDay = disabledDay || disabledWeekDays.includes(moment().date(i).day());

		selectedDay = moment(moment().date(i).format('YYYY-MM-DD')).isSame(moment(selectedDate));

		calendarDays.push({
			weekday: moment().date(i).format('ddd'),
			date: moment().date(i).format('D'),
			fullDate : moment().date(i).format('YYYY-MM-DD'),
			disabled: disabledDay,
			selected: selectedDay
		})

	}

	const handleRightClick = () => {
		if (maxAvailableDays > calendarDate)
			setCalendarDate(prevDate => prevDate + 7);

	};
	const handleLeftClick = () => {
		if (moment().date() < calendarDate)
			setCalendarDate(prevDate => prevDate - 7);

	};

	return (
		<div>
			<div className="calendar-month-year">{moment().date(calendarDate).format('MMMM, Y')}</div>
			<div className="calendar-week">
				<IconButton
					className="calendar-btn-left"
					disabled={calendarDate === moment().date() ? true : false}
					onClick={handleLeftClick}
					><ChevronLeft/></IconButton>
				<div className="calendar-weekdays">

					{calendarDays.map(
						(day, i) => (
							<div key={i} className="calendar-day">
								<div className="calendar-weekday-name">
									{day.weekday}
								</div>
								<div className="calendar-date">
									<Button
										className="calendar-date-btn"
										onClick={e=>{setSelectedDate( day.fullDate)}}
										variant={day.selected ? 'contained' : 'text'}
										color={day.selected ? 'primary' : 'default'}
											disabled={day.disabled}>{day.date}</Button>
								</div>
							</div>

						)
					)}
				</div>

				<IconButton
					className="calendar-btn-right"
					disabled={calendarDate > maxAvailableDays ? true : false}
					onClick={handleRightClick}><ChevronRight/></IconButton>
			</div>
			Selected date: {selectedDate}
		</div>
	)
}
export default AvailableTimePicker;
