import React, {useEffect, useRef} from "react";
import {Button} from "@material-ui/core";
import {useFormikContext} from "formik";

const NextStep = React.forwardRef( ({step, onClick, ...props},ref) => {
	const formik = useFormikContext();
	const {method} =formik.values.payment;
	const inputRef = useRef(ref);

	useEffect(() => {

		localStorage.setItem("bookingFormData", JSON.stringify(formik.values));

	}, [formik.values, formik.touched])

	useEffect(()=>{
		if(method !== 'giftCard'){
			// fixes slow enabling of next button on payment select
			inputRef.current.focus();
		}
	},[method])

	let disabled = false;

	const isDisabled = () => {
		let failCather;
		const {services, appointment,contacts, payment} = formik.values;
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
					? Object.values(contacts).slice(0,4).includes('') //any of the required contact fields is empty
						|| (Object.values(formik.errors).length >0)   //or has error
						|| ((true === formik.values.contacts.forAnother)  //or if the option for another person is checked
							&& (formik.values.contacts.anotherName === '')) //but not written name
					: true;
				break;
			case 3:
				disabled = (Object.values(formik.errors).length >0)
					|| ((payment.method === 'giftCard') && (payment.addInfo.length < 4))
				break;
			default:
				return false;

		}

		return disabled;
	};
	const clickHandler = () => {


		if (!disabled )
			onClick(prev => prev + 1)
	}

	return (
		<Button
			ref={inputRef}
			href="" variant="contained" color="primary" disableRipple={false} disabled={isDisabled()}
			onClick={clickHandler}> {step === 4 ? 'Submit': 'Next'} </Button>
	);
});
export default NextStep;
