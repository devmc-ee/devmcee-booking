import React, {Component} from "react";
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ServiceGroup from "./ServiceGroup";
import Form from './Form'

import {Prices} from '../ServicesData';
import {getPrices, totalPriceCalc, updatePrices} from "../utils";
import ServiceBaseSelect from './ServiceBaseSelect'
import ServiceOptionSelect from './ServiceOptionSelect'
import TotalPrice from './TotalPrice'
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import ServicePrice from './ServicePrice'
Enzyme.configure({adapter: new Adapter()});


const div = global.document.createElement('div');
global.document.body.appendChild(div);


const	 wrapper = mount(<Form/>, {attachTo: div});
//Use wrapper.setProps({}) to force a re-render.
describe('1. ServicePrice: Initial states ', () => {


	it("1.1 It should exist in form by defaut", () => {
		const price = wrapper.find(".service-item__price-regular");
		expect(price).toHaveLength(1)
	});

	it("1.2 It should be initally empty (no text)", () => {
		const price = wrapper.find(".service-item__price-regular");
		expect(price.text()).toBe('')
		//console.log(price.debug());
	});

})

describe('2. ServicePrice: checking intial states of service base and option ', () => {


	const serviceBase = wrapper.find(ServiceBaseSelect);
	const serviceOption = wrapper.find(ServiceOptionSelect);
	const serviceGroup = wrapper.find(ServiceGroup);

	it("2.1 ServiceBase exists and initial value is empty", () => {
		expect(serviceBase).toHaveLength(1)
		/*	console.log(serviceBase.props());
			console.log(serviceBase.debug());*/
	});

	it("2.2 ServiceBase should have value th", () => {

		const serviceBaseSelect =wrapper.find('#serviceItem__0')
		expect(serviceBaseSelect).toHaveLength(1)


		serviceBaseSelect.simulate('change',{
			target:{
				value: 'th',
				dataset:{
					serviceGroupId: 0
				}
			}
		})


		//to get changed props need to find again the component
		const serviceGroupAfter = wrapper.find(ServiceGroup);
		const serviceBaseAfter = wrapper.find(ServiceBaseSelect);
		//console.log(serviceBaseAfter.props())
		expect(serviceBaseAfter.props().value).toEqual('th')

	});
	it("2.3 Selected ServiceBase f should add 2 service options", () => {
		const serviceBase = wrapper.find(ServiceBaseSelect);
		serviceBase.simulate('change',{
			target:{
				value: 'f',
				dataset:{
					serviceGroupId: 0
				}
			}
		})
		const serviceOptionSelect = wrapper.find(ServiceOptionSelect)
			//console.log('2.3 Service options' ,Object.keys(serviceOptionSelect.prop('selectedServiceOptions')))
		expect(Object.keys(serviceOptionSelect.prop('selectedServiceOptions'))).toHaveLength(2)
	});

	it("2.4 Selected ServiceOption f05 should return price in price comp 25", () => {
		const serviceOption = wrapper.find(ServiceOptionSelect);
		serviceOption.simulate('change',{
			target:{
				value: 'f05',
				dataset:{
					serviceGroupId: 0
				}
			}
		})
		const servicePriceAfter = wrapper.find(ServicePrice)

		expect(servicePriceAfter.text()).toEqual('25€')
	});

	it("2.5 Changing Service Base price text is empty", () => {

		const serviceBaseBefore = wrapper.find('#serviceItem__0');
		serviceBaseBefore.simulate('change',{
			target:{
				value: 'th',
				dataset:{
					serviceGroupId: 0
				}
			}
		})
		const serviceBaseAfter = wrapper.find('#serviceItem__0');
		console.log('serviceBaseAfter',serviceBaseAfter.debug())
		wrapper.setProps({})
		const serviceOption = wrapper.find(ServiceOptionSelect);
		console.log(serviceOption.debug())

		const servicePriceAfter = wrapper.find(ServicePrice)

		//console.log(serviceOptionSelect.debug())
		expect(servicePriceAfter.text()).toEqual('')
	});

})

afterAll(()=>{

	wrapper.detach();
	global.document.body.removeChild(div);
})
