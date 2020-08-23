import React, {useMemo, useEffect, useRef} from 'react';
import {Field, useFormikContext} from "formik";
import {TextField} from "formik-material-ui";
import {MenuItem, Grid} from "@material-ui/core";
import {SETTINGS} from "../../DATA";
import moment from 'moment';
import NextStep from "../NextStep";

const PaymentSelect = React.memo(({setActiveStep}) => {
	const {payment, locale} = SETTINGS;
	const formik = useFormikContext();
	const {method} = formik.values.payment; //selected value
	const {appointment} = formik.values;
	const values = formik.values;
	const focusRef = useRef(null);

	useEffect(() => {
			if (values.payment.addInfo && Object.keys(payment.methods[method].addInfo).length === 0) {
				values.payment.addInfo = "";
				formik.setValues(values);
				formik.setErrors({});
				console.log('render')
			}
			if(method !== 'giftCard')
				formik.setErrors({});
		},
	);
	const memoMethodItems = useMemo(() => {
		let methodsItems = [];
		const mAppointment = moment(appointment.date + appointment.time, "YYYY-MM-DD HH:mm")
		for (let i in payment.methods) {
			let disabled = false;
			console.log('render')
			if (payment.methods[i].offset) {
				const mOffset = moment().add(payment.methods[i].offset, 'hours');
				disabled = mOffset.isSameOrAfter(mAppointment);
			}
			methodsItems.push(
				<MenuItem key={i} value={i} disabled={disabled}>
					{payment.methods[i].name[locale]}
					{disabled && payment.methods[i].offsetText[locale].replace('%n', payment.methods[i].offset)}
				</MenuItem>
			);
		}
		return methodsItems;
	}, [locale, payment.methods, appointment]);

	const validateHandler = method => value => {
		console.log('validateHandler')
		if(!value)
			return "Required!";


		if(!(/LTG/i.test(value.substr(0, 3)))){
			return "The first letters of our gift cards are LTG..."
		}
		if ( value.length < 4 ){
			return "Please write full code, like LTG1234"
		}

	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6}>
			<Field
				name={`payment.method`}
				id={`payment.method`}
				component={TextField}
				as="select"
				select={true}
				type="text"
				variant="standard"
				label="Select payment method"
				fullWidth
				helperText={payment.methods[method].helperText[locale]}
			>
				{memoMethodItems.map(method => method)}
			</Field>
			</Grid>
			<Grid item  xs={12} sm={6}>
			{(Object.keys(payment.methods[method].addInfo).length > 0) &&
			<Field
				name={`payment.addInfo`}
				id={`payment.addInfo`}
				component={TextField}
				type="text"
				variant="standard"
				label={payment.methods[method].addInfo.label[locale]}
				placeholder={payment.methods[method].addInfo.placeholder[locale]}
				fullWidth
				validate={validateHandler(method)}
				autoComplete="off"
			/>}
			</Grid>
			<Grid container item  xs={12} justify="flex-end">
			<NextStep ref={focusRef} onClick={setActiveStep} step={3} />
			</Grid>
		</Grid>
	)
});
export default PaymentSelect;
