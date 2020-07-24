import {SERVICE_PRICES} from "../SERVICES_DATA";
import React from "react";
import {updatePrices, getPrices, totalPriceCalc, getTotalPrice} from '../utils'

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


})