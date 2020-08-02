import React from "react";
import { Button } from "@material-ui/core";

const AddService = ({ array, formik, ...props }) => {
	const length = formik.values.services.length;

	const isDisabled = () => {
		let isDisabled = false;
		if (0 < length) {
			for (let i = 0; i < length; i++) {
				isDisabled = formik.values.services[i].serviceBase === "";
				isDisabled = formik.values.services[i].serviceOption === "";
			}
		}
		return isDisabled;
	};

	const clickHandler = () => {
		if (!isDisabled()) {
			array.push({
				serviceBase: "",
				serviceOption: ""
			});
		}
	};
	return (
		<Button
			type="button"
			variant="outlined"
			disabled={isDisabled()}
			onClick={clickHandler}
		>
			+ ADD SERVICE
		</Button>
	);
};
export default AddService;
