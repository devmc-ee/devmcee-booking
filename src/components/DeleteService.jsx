import React from "react";
import { IconButton } from "@material-ui/core";

const DeleteService = ({ formik, index, array, ...props }) => {
	return (
		<>
			<IconButton
				type="button"
				onClick={() => {
					array.remove(index);
					localStorage.setItem(
						"bookingFormData",
						JSON.stringify({
							services: formik.values.services.filter(
								i => i !== formik.values.services[index]
							)
						})
					);
				}}
			 href="">
				x
			</IconButton>
		</>
	);
};
export default DeleteService;
