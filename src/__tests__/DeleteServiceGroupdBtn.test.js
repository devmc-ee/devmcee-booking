import React, {Component} from "react";
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ServiceGroup from "../components/ServiceGroup";
import Form from '../components/Form'
import {Prices} from '../ServicesData';
import {getPrices, totalPriceCalc, updatePrices} from "../utils";
import ServiceBaseSelect from '../components/ServiceBaseSelect'
import ServiceOptionSelect from '../components/ServiceOptionSelect'
import TotalPrice from '../components/TotalPrice'
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import ServicePrice from '../components/ServicePrice'
import DeleteServiceGroupdBtn from '../components/DeleteServiceGroupdBtn/DeleteServiceGroupdBtn'

Enzyme.configure({adapter: new Adapter()});

const div = global.document.createElement('div');
global.document.body.appendChild(div);


const wrapper = mount(<Form/>, {attachTo: div});

describe('AddService: checking intial states of service base and option ', () => {
	const addServiceBtn = wrapper.find('[name="add-service"]');


	const serviceGroup = wrapper.find(ServiceGroup);
	it("1. Inital number of service group is 1", () => {
		expect(serviceGroup).toHaveLength(1)
	})

	it("2. Click on add service btn adds results 2 serviceGroups", () => {
		addServiceBtn.simulate('click')
		const serviceGroupAfter = wrapper.find(ServiceGroup);
		expect(serviceGroupAfter).toHaveLength(2)
	})

	it('3. After click on delete btn only 1 Service Group left ',()=>{
		const deleteBtn=wrapper.find('[data-testid="btn-delete-1"]')
		//console.log('delete service btn',deleteBtn.debug())
		deleteBtn.simulate('click')
		const serviceGroupAfter = wrapper.find(ServiceGroup);
		expect(serviceGroupAfter).toHaveLength(1)
	})
})


afterAll(() => {

	wrapper.detach();
	global.document.body.removeChild(div);
})
