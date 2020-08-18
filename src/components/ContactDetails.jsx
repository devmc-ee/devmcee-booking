import React, {useEffect, useState} from "react";
import {Field, useFormikContext} from "formik";
import {TextField} from "formik-material-ui";
import {Grid, FormControlLabel, Checkbox} from "@material-ui/core";
import CallingCode from "./CallingCode";
import {COUNTRIES} from "../COUNTRIES";
import NextStep from "./NextStep";

/*const checkImgs = path =>{
	return new Promise((resolve, reject)=>{
			const img = new Image();
			img.onload = () => resolve(path)
			img.onerror = () => reject()
			img.src = path
		}

	);
}*/

const ContactDetails = ({setActiveStep}) => {
	const formik = useFormikContext();

	const [forAnother, setForAnother] = useState(false);

	/*useEffect(()=>{
		//preload images
		Promise.all(
			COUNTRIES.map( country => checkImgs(country.flag) )
		)
	},[])*/



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
									onChange={()=>setForAnother(forAnother => !forAnother)}
									name="contacts.forAnother"
									id="contacts.forAnother" />}
							label="Booking for another person" />

					</Grid>
					<Grid item  xs={12} sm={6}>
						{formik.values.contacts
						&& formik.values.contacts.forAnother === true

							? (<Field
								component={TextField}
								name="contacts.anotherName"
								id="contacts.anotherName" type="text" variant="standard"
								helperText={formik.errors.contacts && formik.errors.contacts.anotherName
									? formik.errors.contacts.anotherName
									:"Name of the person who attends the appointment"}
								label="Another person name" placeholder="Name..." fullWidth/>)
							: ''}
					</Grid>

				</Grid>
				<div className="calendar-step-action-footer">
				<NextStep
					step={2} onClick={setActiveStep}/>
				</div>
			</Grid>

		</>
	)
}
export default ContactDetails;
