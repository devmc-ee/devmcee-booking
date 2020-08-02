import React from "react";
import { Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

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
			fullWidth
			disabled={isDisabled()}
			onClick={clickHandler}
		>
			<AddIcon /> ADD
		</Button>
	);
};
export default AddService;
