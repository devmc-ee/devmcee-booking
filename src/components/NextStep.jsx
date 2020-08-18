import React, {useEffect} from "react";
import {Button} from "@material-ui/core";
import {useFormikContext} from "formik";

const NextStep = ({step, onClick, ...props}) => {
	const formik = useFormikContext();
	useEffect(() => {

		localStorage.setItem("bookingFormData", JSON.stringify(formik.values));

	}, [formik.values, formik.touched])

	let disabled = false;

	const isDisabled = () => {
		let failCather;
		const {services, appointment,contacts} = formik.values;
		const servicesLength = services.length;

		switch (step) {
			case 0:
				if (0 < servicesLength) {
					failCather = [];
					for (let i = 0; i < servicesLength; i++) {
						failCather.push(formik.values.services[i].serviceBase === "");
						failCather.push(formik.values.services[i].serviceOption === "");
					}

					disabled = failCather.includes(true);
				} else {
					disabled = true;
				}
				break;
			case 1:
				disabled = !appointment.time;
				break;
			case 2:
				disabled = contacts                                   //disable button next if
					? Object.values(contacts).slice(0,4).includes('') //any of the required fields is empty
						|| (Object.values(formik.errors).length >0)   //or has error
						|| ((true === formik.values.contacts.forAnother)  //or if selected option for another person
							&& (formik.values.contacts.anotherName === '')) //but not written name
					: true;
				break;
			case 3:
				break;
			default:
				return false;

		}

		return disabled;
	};
	const clickHandler = () => {
		if (!disabled)
			onClick(prev => prev + 1)
	}

	return (
		<Button
			href="" variant="contained" color="primary" disableRipple={false} disabled={isDisabled()}
			onClick={clickHandler}> Next </Button>
	);
};
export default NextStep;
