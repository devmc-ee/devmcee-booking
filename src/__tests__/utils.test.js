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
	groupTimeSlots
} from '../utils'

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
	const timePickerSettings1 = {
		servicesDuration: 0,
		workingTime: {
			start: '11:00',
			end: '12:00'
		},
		timeStep: 15
	};
	it('1.5.1 Should return 5 timeslots if in service duration 0 min  ', () => {
		expect(getTimeSlots(
			0,
			timePickerSettings1.workingTime,
			timePickerSettings1.timeStep)).toHaveLength(5)
	})

	it('1.5.2 Should return 3 timeslot if service duration = 30  ', () => {
		expect(getTimeSlots(
			30,
			timePickerSettings1.workingTime,
			timePickerSettings1.timeStep)).toHaveLength(3);
		expect(getTimeSlots(
			30,
			timePickerSettings1.workingTime,
			timePickerSettings1.timeStep)).toEqual(['11:00', '11:15', '11:30']);
	})

	it('1.5.3 Should return [11:30,11:45] if service duration = 30 and unavailableSlots =[11:00,11:15]', () => {

		expect(getTimeSlots(
			30,
			{
				start: '11:00',
				end: '12:15'
			},
			timePickerSettings1.timeStep,
			['11:00', '11:15']
		)).toEqual(['11:30', '11:45']);
	})
});

describe('1.6: extendUnavailableSlots from utils', () => {
	it('1.6.1: Should return [ 11:00, 11:15, 11:30] for 30min service and [11:30] of unavailable', () => {
		expect(extendUnavailableSlots(['11:30'],30, 15))
			.toEqual(['11:00','11:15','11:30'])
	})

	it('1.6.2: Should return 9 elements in array for 90min service and [12:30, 13:00] of unavailable', () => {
		expect(extendUnavailableSlots(['12:30','13:00'],90, 15))
			.toHaveLength(9)
	})
});

describe('1.7: groupTimeSlots from utils', () => {
	const timeSlotGroups= [
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
		expect(groupTimeSlots(['11:00','11:15','15:30','18:00'],timeSlotGroups))
			.toEqual([['11:00','11:15'],['15:30'],['18:00']])
	})


});
