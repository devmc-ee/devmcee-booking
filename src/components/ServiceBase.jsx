import React, {useEffect} from "react";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { MenuItem } from "@material-ui/core";
import { SERVICES } from "../DATA";

const ServiceBase = ({ index, formik, ...props }) => {
	useEffect(() => {

		if(formik.dirty) {
			formik.values.services[index].serviceOption = '';
			localStorage.setItem("bookingFormData", JSON.stringify(formik.values));
		}
		// eslint-disable-next-line
	}, [ formik.values.services[index].serviceBase]);
	const serviceBases = Reflect.ownKeys(SERVICES);
	const selectedBases = formik.values.services.map(
		service => service.serviceBase
	);

	const isDisabled = (index, key) => {
		if (
			formik.values.services.hasOwnProperty(index) &&
			formik.values.services[index].serviceBase === key
		)
			return false;
		if (selectedBases.includes(key)) return true;
		return false;
	};

	const validateBase = value => {
		let error;
		if (!value) {
			error = "Required!";
		}
		return error;
	};
	return (
		<Field
			name={`services.${index}.serviceBase`}
			id={`services.${index}.serviceBase`}
			component={TextField}
			as="select"
			select={true}
			type="text"
			variant="standard"
			label="Service"
			placeholder="Services..."
			fullWidth
			validate={validateBase}
		>
			<MenuItem value="">Service...</MenuItem>
			{serviceBases.map(key => {
				return (
					<MenuItem key={key} value={key} disabled={isDisabled(index, key)} disableRipple={true}>
						{[SERVICES[key]["en"]]}
					</MenuItem>
				);
			})}
		</Field>
	);
};

export default ServiceBase;
