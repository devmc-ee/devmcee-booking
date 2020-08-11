import React from "react";
import {Field, useFormikContext} from "formik";
import {TextField} from "formik-material-ui";
import {Grid} from "@material-ui/core";
import CallingCode from "./CallingCode";

const ContactDetails = () => {
	const formik = useFormikContext();
	console.log(formik.values)
	return (
		<>
			<Grid container spacing={2}>

				<Grid item xs={12} md={4}>

					<Field
						component={TextField} name="contacts.name" id="contacts.name" type="text" variant="standard"
						label="Name" placeholder="Name..." fullWidth/>

				</Grid>

				<Grid item xs={12} md={4}>

					<Field
						component={TextField} name="contacts.email" id="contacts.email" type="text" variant="standard"
						label="Email" placeholder="Email..." fullWidth/>

				</Grid>

				<Grid container xs={12} md={4} item spacing={1}>

					<Grid item xs={3}>
						<CallingCode />


					</Grid>

					<Grid item xs={9}>

						<Field
							component={TextField} name="contacts.telephone" id="contacts.telephone" type="text"
							fullWidth autoComplete="off" variant="standard" label="Telephone"
							placeholder="55597565..."/>

					</Grid>

				</Grid>

			</Grid>
		</>
	)
}
export default ContactDetails;
