import {SERVICE_PRICES} from "../DATA";
import React from "react";
import {
	updatePrices,
	getPrices,
	totalPriceCalc,
	getTotalPrice,
	getTotalDuration,
	getTimeSlots,
	extendUnavailableSlots,
	groupTimeSlots,
	getStartTime
} from '../utils';
import moment from 'moment-timezone';

const Prices = SERVICE_PRICES;
describe('1.1: getPrices from Util Getting Prices', () => {
		test('For the th1 code discounted price is tobe [35]', () => {
			expect(getPrices(['th1'])).toEqual([35])
		})


		test('For the f05 code price is tobe [25]', () => {
			expect(getPrices(['f05'])).toEqual([25])
		})
	}
)

describe('1.2: TotalPriceCalc from Util', () => {
		test('1.2.1: Total price of 25 and 45 is toBe 70', () => {
			expect(totalPriceCalc([25, 45])).toEqual(70)
		});

		it('1.2.2: Total price of th1 and oil2 is toEqual 110 ', () => {
			expect(getTotalPrice(['th1', 'oil2'])).toEqual(110);
		})

	}
)

describe('1.3: UpdatePrice form Utils', () => {

	const expectedResult = {
		totalServicesPrice: 45,
		selectedServicesPrices: {0: 45}

	}

	test('Inserting Service [th1] should be equalTo expectedResult', () => {
		expect(updatePrices(['th1'])).toEqual(expectedResult)
	})

	const expectedResult2 = {
		totalServicesPrice: 45,
		selectedServicesPrices: {0: 45, 1: ''}

	}
	test('Inserting Service [th1,th2] and skipIndex 1, should be equalTo expectedResult2',
		() => {
			expect(updatePrices(['th1', 'th2'], 1)).toEqual(expectedResult2)
			expect(updatePrices(['th1', 'th2', 'f05'], 1))
				.toEqual({selectedServicesPrices: {0: 45, 1: '', 2: 25}, totalServicesPrice: 70})
		})


});

describe('1.4: getTotalDuration from Utils', () => {
	it('1.4.1: it should return 0 on empty input', () => {
		expect(getTotalDuration([])).toEqual(0);
	});

	const services1 = [{
		serviceBase: 'th',
		serviceOption: 'th2'
	}];

	it('1.4.2: should return 120 on th2 service', () => {
		expect(getTotalDuration(services1)).toEqual(120);
	})
	const services2 = [{
		serviceBase: 'th',
		serviceOption: 'th2'
	},
		{
			serviceBase: 'f',
			serviceOption: 'f05'
		}];
	it('1.4.2: should return 150 on [th2, f05] services', () => {
		expect(getTotalDuration(services2)).toEqual(150);
	})
})

describe('1.5: getTimeSlots from Utils', () => {

	let calendarProps = {
		servicesDuration: 0,
		workingTime: {
			start: '11:00',
			end: '12:00'
		},
		timeStep: 15,
		todaysFirstTimeOffset: 60,
		timeZone: 'Europe/Tallinn'

	};
	const selectedDate = moment('11:00', 'HH:mm').tz('Europe/Tallinn');

	it('1.5.1 Should return 5 timeslots if in service duration 0 min  ', () => {
		let selectedDate = moment('11:00', 'HH:mm').tz('Europe/Tallinn');
		expect(getTimeSlots(
			selectedDate,
			[],
			0,
			calendarProps)).toHaveLength(1)
		let selectedDate2 = moment('11:00', 'HH:mm').tz('Europe/Tallinn');
		expect(getTimeSlots(
			selectedDate,
			[],
			0,
			calendarProps)).toEqual(['12:00'])
	})

	it('1.5.2 Should return 3 timeslot if service duration = 30  ', () => {
		const selectedDate = moment('11:10', 'HH:mm').tz('Europe/Tallinn');

		calendarProps.workingTime = {
			start: '11:00',
			end: '13:00'
		}

		expect(getTimeSlots(
			selectedDate,
			[],
			30,
			calendarProps)).toHaveLength(2);
		const selectedDate2 = moment('11:10', 'HH:mm').tz('Europe/Tallinn');

		expect(getTimeSlots(
			selectedDate2,
			[],
			30,
			calendarProps)).toEqual(['12:15', '12:30']);
	})

	it('1.5.3 Should return [11:30,11:45] if service duration = 30 and unavailableSlots =[11:00,11:15]', () => {
		const selectedDate = moment('11:10', 'HH:mm').tz('Europe/Tallinn');

		calendarProps.workingTime = {
			start: '11:00',
			end: '14:00'
		}
		expect(getTimeSlots(selectedDate,
			['12:15', '13:15'],
			30,
			calendarProps
		)).toEqual(['12:30', '13:30']);
	})
});

describe('1.6: extendUnavailableSlots from utils', () => {
	it('1.6.1: Should return [ 11:00, 11:15, 11:30] for 30min service and [11:30] of unavailable', () => {
		expect(extendUnavailableSlots(['11:30'], 30, 15))
			.toEqual(['11:00', '11:15', '11:30'])
	})

	it('1.6.2: Should return 9 elements in array for 90min service and [12:30, 13:00] of unavailable', () => {
		expect(extendUnavailableSlots(['12:30', '13:00'], 90, 15))
			.toHaveLength(9)
	})
});

describe('1.7: groupTimeSlots from utils', () => {
	const timeSlotGroups = [
		{
			start: '11:00',
			end: '15:00'
		},
		{
			start: '15:00',
			end: '18:00'
		},
		{
			start: '18:00',
			end: '21:00'
		}];

	it('1.7.1: Should return [ [11:00, 11:15],[15:30],[18:00]] ', () => {
		expect(groupTimeSlots(['11:00', '11:15', '15:30', '18:00'], timeSlotGroups))
			.toEqual([['11:00', '11:15'], ['15:30'], ['18:00']])
	})


});

describe('1.8: getStartTime from Utils', () => {
	const CALENDAR_SETTINGS = {
		maxAvailableDays: 30,
		disabledWeekDays: [1],
		workingTime: {
			start: '11:00',
			end: '21:00'
		},
		timeStep: 15,
		minimalBreak: 15,
		todaysFirstTimeOffset: 60,
		timeSlotGroups: [
			{
				start: '11:00',
				end: '16:00'
			},

			{
				start: '16:00',
				end: '21:00'
			}],
		locale: 'en',
		timeZone: 'Europe/Tallinn'

	}
	it('1.8.1. if selectedDate is Today & current time is before workStart, ' +
		'should return startTime => 12:00 ', () => {
		const selectedDate = moment('09:00', 'HH:mm').tz('Europe/Tallinn');


		expect(getStartTime(selectedDate, CALENDAR_SETTINGS))
			.toEqual('12:00')
	})

	it('1.8.2. if selectedDate is Today & 11:12 is after workStart, ' +
		'should return startTime => 12:15 ', () => {
		const selectedDate = moment('11:12', 'HH:mm').tz('Europe/Tallinn');


		expect(getStartTime(selectedDate, CALENDAR_SETTINGS))
			.toEqual('12:15')
	})

	it('1.8.3. if selectedDate is Today & 11:47 is after workStart, ' +
		'should return startTime => 13:00 ', () => {
		const selectedDate = moment('11:47', 'HH:mm').tz('Europe/Tallinn');


		expect(getStartTime(selectedDate, CALENDAR_SETTINGS))
			.toEqual('13:00')
	})


	it('1.8.4. if selectedDate is Tomorrow, before working time, ' +
		'should return startTime => 12:00 ', () => {
		const selectedDate = moment('09:00', 'HH:mm').tz('Europe/Tallinn');
		selectedDate.add(1, 'd')

		expect(getStartTime(selectedDate, CALENDAR_SETTINGS))
			.toEqual('12:00')
	})
})
