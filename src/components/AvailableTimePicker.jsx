import React from 'react';
import moment from 'moment';
import 'moment/locale/et';
import 'moment/locale/ru';

const AvailableTimePicker = ({locale}) => {
	moment.locale(locale)
	const m = moment();
	const weekDays = moment.weekdaysShort();
	console.log(moment());
	const todayDoW = moment().day();
	let weekDaysD = [];
	const todayDate = moment().date();
	let weekDates = [];
	for(let i = todayDate; i < todayDate + 7; i++){
		weekDaysD.push(m.date(i).format('ddd'));
		weekDates.push(m.date(i).format('D'));
		console.log(weekDates);
	}



	return (
		<div>
			<div>{m.format('MMMM, Y')  }</div>
			<div className="calendar-weekdays">
			{weekDaysD.map(
				day=>(
					<div className="calendar-week-day" key={day}>{day}</div>
				)
			)}


			</div>
			<div className="calendar-dates">
				{weekDates.map(
					day=>(
						<div className="calendar-week-day" key={day}>{day}</div>
					)
				)}
			</div>
		</div>
	)
}
export default AvailableTimePicker;
