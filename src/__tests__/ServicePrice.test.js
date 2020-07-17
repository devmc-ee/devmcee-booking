import React from "react";
import SelectInput from "../components/SelectInput";
import sinon from "sinon";
import ServicePrice from "../components/ServicePrice";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe("ServicePrice:", () => {
	it("1. Should be empty on empty serviceOption", () => {
		const priceBlock = shallow(<ServicePrice serviceOption="" />);
		//console.log(priceBlock.html());
		expect(priceBlock.find(".service-price--regular").text()).toEqual("");
		priceBlock.unmount();
	});

	it("2. Reg Price Should be 25 on f05 serviceOption", () => {
		const priceBlock = shallow(<ServicePrice serviceOption="f05" />);
		console.log(priceBlock.html());
		expect(priceBlock.find(".service-price--regular").text()).toEqual("25€");
	});
});
