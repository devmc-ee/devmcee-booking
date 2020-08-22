import React, {useState} from "react";
import {Field, useFormikContext} from "formik";
import {TextField} from "formik-material-ui";
import {Grid, FormControlLabel, Checkbox} from "@material-ui/core";
import CallingCode from "./CallingCode";
import NextStep from "./NextStep";

const ContactDetails = ({setActiveStep}) => {
	const formik = useFormikContext();
	const fForAnother = formik.values.contacts.forAnother;


	const [forAnother, setForAnother] = useState(  ('true' === fForAnother) || (true === fForAnother));
	const forAnotherCheckHandler = () => {
		let values = formik.values;
		setForAnother(forAnother => !forAnother);
		values.contacts.forAnother = !forAnother;
		if(false === !forAnother){
			values.contacts.anotherName = '';
		}
		formik.setValues(values);
	};

	return (
		<>
			<Grid container spacing={2}>

				<Grid item xs={12} md={4}>

					<Field
						component={TextField}
						name="contacts.name"
						id="contacts.name"
						type="text"
						variant="standard"
						label="Name" placeholder="Name..." fullWidth/>

				</Grid>

				<Grid item xs={12} md={4}>

					<Field
						component={TextField} name="contacts.email" id="contacts.email" type="email" variant="standard"
						label="Email" placeholder="Email..." fullWidth/>

				</Grid>

				<Grid container xs={12} md={4} item spacing={1}>

					<Grid item xs={3}>
						<CallingCode  />


					</Grid>

					<Grid item xs={9}>

						<Field
							component={TextField}
							name="contacts.telephone"
							id="contacts.telephone" type="number"
							fullWidth autoComplete="off" variant="standard" label="Telephone"
							placeholder="55597565..."/>

					</Grid>

				</Grid>

				<Grid container xs={12} md={4} item spacing={1}>
					<Grid item xs={12} sm={6} >

						<FormControlLabel
							control={
								<Checkbox
									checked={forAnother}
									onChange={forAnotherCheckHandler}
									name="contacts.forAnother"
									id="contacts.forAnother" />}
							label="Booking for another person" />

					</Grid>
					<Grid item  xs={12} sm={6}>
						{forAnother
							? (<Field
								component={TextField}
								name="contacts.anotherName"
								id="contacts.anotherName" type="text" variant="standard"
								helperText={formik.errors.contacts && formik.errors.contacts.anotherName
									? formik.errors.contacts.anotherName
									:"Name of the person who attends the appointment"}
								label="Another person name" placeholder="John..." fullWidth/>)
							: ''}
					</Grid>

				</Grid>
				<Grid item container xs={12} justify="flex-end" className="calendar-step-action-footer">
				<NextStep
					step={2} onClick={setActiveStep}/>
				</Grid>
			</Grid>
		</>
	)
}
export default ContactDetails;
