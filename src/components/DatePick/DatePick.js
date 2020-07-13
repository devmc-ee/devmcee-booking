import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput"; //http://react-day-picker.js.org/
import {LocaleUtils} from "react-day-picker";
import 'moment/locale/et';
import 'moment/locale/ru';
import MomentLocaleUtils, {
	formatDate,
	parseDate,
} from 'react-day-picker/moment';

import './style.css'

const today = new Date()
export default class BasicConcepts extends React.Component {
	constructor(props) {
		super(props);
		this.handleDayChange = this.handleDayChange.bind(this);
		this.state = {
			selectedDay: undefined,
		};
	}

	handleDayChange(day) {
		this.setState({selectedDay: day});
	}

	render() {
		return (
			<div>
				<DayPickerInput onDayChange = {this.handleDayChange}

					formatDate = {formatDate} parseDate = {parseDate} placeholder = {`${formatDate(new Date(),'ll','ru')}`}  format="LL" dayPickerProps = {{
					locale: 'ru',
					localeUtils: MomentLocaleUtils,

					showOutsideDays: true,
					firstDayOfWeek: 1,
					disabledDays: {
						daysOfWeek: [0],
						before: new Date(),
						after: new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
					},
					fromMonth: new Date(today.getFullYear(), today.getMonth()),
					toMonth: new Date(today.getFullYear(), today.getMonth() + 1),
					month: new Date(),
					todayButton: 'Today',

				}}/> {this.state.selectedDay ? (
				<p>You clicked {this.state.selectedDay.toLocaleDateString()}</p>
			) : (
				<p>Please select a day.</p>
			)}
			</div>
		);
	}
}
