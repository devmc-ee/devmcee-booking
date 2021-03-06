import React from "react";
import {IconButton} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';

const DeleteService = ({formik, index, array, ...props}) => {
	return (
		<>
			<IconButton

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
				}}> <ClearIcon/> </IconButton>
		</>
	);
};
export default DeleteService;
