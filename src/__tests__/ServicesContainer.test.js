import React from "react";

import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ServicesContainer from "../ServicesContainer";

Enzyme.configure({ adapter: new Adapter() });

describe("Container should displaye children", () => {
	it("Container exists", () => {
		const wrapper = mount(<ServicesContainer />);
		const container = wrapper.find(".servicesContainer");
		// console.log(container.html());
		expect(container).toHaveLength(1);
		wrapper.unmount();
	});

	it("Container has children", () => {
		const wrapper = mount(
			<ServicesContainer>
				<p>Text</p>
			</ServicesContainer>
		);
		const container = wrapper.find(".servicesContainer");
		//console.log(container.html());
		expect(wrapper.children()).toHaveLength(1);
		expect(wrapper.children().text()).toEqual("Text");

		wrapper.unmount();
	});
});
