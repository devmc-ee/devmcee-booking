import React from "react";

import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TotalSumTimePrice from "../components/TotalSumTimePrice";

Enzyme.configure({adapter: new Adapter()});


describe('Total Price and Time:', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<TotalSumTimePrice value={{0: 'th1', 1:'h05'}}/>);
	});

	it('1. Should exist', () => {
		console.log('wrapper: ', wrapper.html());
		expect(wrapper).not.toBeNull();
	});

	it('2. Should have div with classes .services__total-length and services__total-price', () => {
		expect(wrapper.find('div.services__total-length').exists()).toBe(true);
		expect(wrapper.find('div.services__total-price').exists()).toBe(true);
	})

	it('3. Total Regular price of th1 and h05 should be 60€ ', () => {
		expect(wrapper.find('div.services__total-price').text()).toEqual('60€');
		})



});
