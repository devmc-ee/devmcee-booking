import React from "react";
import SelectInput from "../components/SelectInput";
import sinon from "sinon";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {TextField, MenuItem} from '@material-ui/core';
import {createMount} from '@material-ui/core/test-utils';

Enzyme.configure({ adapter: new Adapter() });


const SERVICES = {
	th: {
		et: "Taimassaaž",
		en: "Thai massage",
		ru: "Тайский массаж"
	},
	oil: {
		et: "Tai õlimassaaž",
		en: "Thai oil massage",
		ru: "Масляный массаж"
	},
	f: {
		et: "Jalamassaaž",
		en: "Foot (legs) massage",
		ru: "Массаж ног"
	},
	h: {
		et: "Peamassaaž",
		en: "Head massage",
		ru: "Массаж плеч и головы"
	},
	b: {
		et: "Seljamassaaž",
		en: "Back massage",
		ru: "Массаж спины"
	}
};

let serviceBaseValue = "f";

const setServiceBaseValue = sinon.spy();
describe("Component SelectInput generates select form", () => {
	const options = {
		optionValues: Reflect.ownKeys(SERVICES),
		optionNames: SERVICES,
		selectId: "testMe",
		selectedValue: "b",
		defaultText: "Service...",
		onChange: setServiceBaseValue,
		lang: "en",
		classes: "select-class",
		serviceGroupId: '0'

	};

	it("1. Should generate 6 options from SERVICES data", () => {
		const selectInput = shallow(
			<SelectInput
				options={options}
				lang="en"
				value={serviceBaseValue}
				onChange={setServiceBaseValue}
			/>
		);
		expect(selectInput.find("#" + options.selectId).children()).toHaveLength(6);
		selectInput.unmount();
	});

	it("2. It should have selected option value have f ", () => {
		const selectInput = shallow(
			<SelectInput
				options={options}
				value={serviceBaseValue}
				onChange={setServiceBaseValue}
			/>
		);

		expect(selectInput.props().value).toBe("f");
		selectInput.unmount();
	});

	//let mount;
	it("3. On change select change is called ", () => {

		const div = global.document.createElement("div");
		global.document.body.appendChild(div);
		//mount = createMount();
		const selectInput = mount(
			<SelectInput
				options={options}
				value={serviceBaseValue}
				onChange={setServiceBaseValue}
			/>,
			{ attachTo: div }
		);

		const selectInputField = selectInput.find('.MuiSelect-nativeInput');

		selectInputField.simulate("change", {
			target: {
					value: 'th',
					dataset:{
						serviceGroupdId: 0
					}
			}
		});
		const selectInputField2 = selectInput.find("select");

		expect(setServiceBaseValue.calledOnce).toBeTruthy();
	});
});
