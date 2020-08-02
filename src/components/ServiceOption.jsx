import React, { useEffect } from "react";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { MenuItem } from "@material-ui/core";
import { SERVICE_OPTIONS, SERVICE_OPTIONS_NAMES, SERVICE_PRICES } from "../DATA";

const serviceOptions = serviceBase => {
	if (!serviceBase) return false;
	if (!SERVICE_OPTIONS.hasOwnProperty(serviceBase)) return false;
	const serviceOptionsObj = SERVICE_OPTIONS[serviceBase];

	return Reflect.ownKeys(serviceOptionsObj).map(key => {
		return (
			<MenuItem key={key} value={key} disableRipple={true}>
				{SERVICE_OPTIONS_NAMES[serviceOptionsObj[key]]["en"]} {" ("}
				{SERVICE_PRICES[key].discountedPrice > 0
					? SERVICE_PRICES[key].discountedPrice + "€ (discounted!))"
					: SERVICE_PRICES[key].price + "€)"}
			</MenuItem>
		);
	});
};
const ServiceOption = ({ index, formik, ...props }) => {
	useEffect(() => {
		localStorage.setItem("bookingFormData", JSON.stringify(formik.values));
		// eslint-disable-next-line
	}, [ formik.values.services[index].serviceOption]);

	const validateOption = value => {
		let error;
		if (!value) {
			error = "Required!";
		}
		return error;
	};
	return (
		<Field
			component={TextField}
			name={`services.${index}.serviceOption`}
			select={true}
			placeholder="Options..."
			variant="standard"
			label="Option"
			fullWidth
			validate={validateOption}
		>
			<MenuItem value="">Options...</MenuItem>
			{serviceOptions(formik.values.services[index].serviceBase)}
		</Field>
	);
};
export default ServiceOption;
