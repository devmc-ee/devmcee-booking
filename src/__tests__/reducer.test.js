import React from "react";

import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TComp from "../TComp";

Enzyme.configure({adapter: new Adapter()});

describe('useReducer tests:', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<TComp/>)
	})

	it("1. Should be notNull", () => {

		expect(wrapper).not.toBeNull();
	});
	it("2. Should be 2 serviceGroups", () => {
		expect(wrapper.find('.serviceOption')).toHaveLength(2);
	});


	it('3. should have text f1_ after changing select', () => {
		wrapper.find('#selectServiceOption_1').simulate('change', {
			target: {
				value: 'f1'
			}
		})
		const serviceOption = (JSON.parse(localStorage.getItem("selectedServicesTest")))['serviceOption'];

		expect(serviceOption[1]).toEqual('f1')
	})

	it('4. Should have 1 serviceGroup after click on delete', () => {
		wrapper.find('#deleteServiceGroup_1').simulate('click', {
			type: 'deleteServiceGroup',
			payload: {
				value: 'group1'
			}
		});
		const serviceOption = (JSON.parse(localStorage.getItem("selectedServicesTest")));
		//console.log('TEST: serviceOption: ', serviceOption);
		expect(Reflect.ownKeys(serviceOption.serviceOption).length).toBe(1);

	})


	it('Should add 3 serviceGroups after  3 click on add', ()=>{
		wrapper.find('#addServiceGroup').simulate('click');
		wrapper.find('#addServiceGroup').simulate('click');
		wrapper.find('#addServiceGroup').simulate('click');
		const serviceGroups=(JSON.parse(localStorage.getItem("selectedServicesTest")))['serviceGroups'];

		const addedServicesQty= Reflect.ownKeys(serviceGroups).length;
		expect(addedServicesQty).toBe(3);

	})

	it('Should left 1 addedServicesQty after  3 click to add and 2 clicks delete', ()=>{
		wrapper.find('#addServiceGroup').simulate('click');
		wrapper.find('#addServiceGroup').simulate('click');
		wrapper.find('#addServiceGroup').simulate('click');
		wrapper.find('#deleteServiceGroup_1').simulate('click',{
			type: 'deleteServiceGroup',
			payload: {
				value: 'group1',
			}

		});
		wrapper.find('#deleteServiceGroup_2').simulate('click',{
			type: 'deleteServiceGroup',
			payload: {
				value: 'group2',
	}
		});

		const serviceGroups=(JSON.parse(localStorage.getItem("selectedServicesTest")))['serviceGroups'];
		const addedServicesQty= Reflect.ownKeys(serviceGroups).length;
		expect(addedServicesQty).toBe(1);

	})

})
