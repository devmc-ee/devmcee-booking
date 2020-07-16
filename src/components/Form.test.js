import React from "react";
import Enzyme, {shallow, mount} from 'enzyme';
import { unmountComponentAtNode } from "react-dom";
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App'
import ServiceGroup from "./ServiceGroup";
import Form from './Form'
import ServiceBaseSelect from './ServiceBaseSelect'

Enzyme.configure({ adapter: new Adapter() });

describe('1.Booking FORM', ()=>{

	it("Have to be one footer", () => {
		const wrapper = shallow(<Form />);

		const text = wrapper.find(".booking-form__services-groups-footer");
		expect(text).toHaveLength(1)
		//expect(text.text()).toBe("true");
	});

	it("Have to be on service group", () => {
		const wrapper = mount(<Form />);

		const servGroups = wrapper.find(ServiceGroup);
		expect(servGroups).toHaveLength(1)
		wrapper.unmount();
	});

	it("Has tobe a 1 button add service", () => {
		const wrapper = mount(<Form />);

		const btnAddService = wrapper.find('[name="add-service"]');
		expect(btnAddService).toHaveLength(1)
		wrapper.unmount();

	});



})

describe('2. Service group', ()=>{
	it("2.1: Find select", () => {
		const wrapper = mount(<Form />);

		const serviceItemsSelect = wrapper.find(ServiceBaseSelect);
		expect(serviceItemsSelect).toHaveLength(1)

		wrapper.unmount();
	});

	it("2.2: ServiceItemsSelect props serviceGroupId", () => {
		const wrapper = mount(<Form />);

		const serviceItemsSelect = wrapper.find(ServiceBaseSelect);
		expect(serviceItemsSelect.props().serviceGroupId).toEqual(0)

		wrapper.unmount();
	});
	it("2.3: ServiceItemsSelect props Value initial is '' ", () => {
		const wrapper = mount(<Form />);

		const serviceItemsSelect = wrapper.find(ServiceBaseSelect);
		expect(serviceItemsSelect.props().value).toEqual('')

		wrapper.unmount();
	});
	it("2.4: ServiceItemsSelect change value to th ", () => {
		const wrapper = mount(<Form />);

		const serviceGroup = wrapper.find(ServiceGroup);
		expect(serviceGroup.length).toBeGreaterThan(0)
		serviceGroup.setState({value: 'th'})

	const serviceItemsSelect= wrapper.find(ServiceBaseSelect)
		expect(serviceItemsSelect.length).toEqual(1)

		expect(serviceItemsSelect.props().value).toEqual('th')
		serviceItemsSelect.simulate('change')
		const serviceOptionSelect= wrapper.find('.booking-form__service-option').children()
		//	console.log(serviceOptionSelect.debug());
		expect(serviceOptionSelect.length).toBeGreaterThan(1)

		wrapper.unmount();
	});
})
