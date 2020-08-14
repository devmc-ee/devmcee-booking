import React, {useEffect, useState} from "react";
import {Field, useFormikContext} from "formik";
import {MenuItem} from "@material-ui/core";
import {TextField, Checkbox} from "formik-material-ui";
import {Grid, FormControlLabel} from "@material-ui/core";
import CallingCode from "./CallingCode";
import {COUNTRIES} from "../COUNTRIES";

const codes = (flagsLoaded) => {

	return COUNTRIES.map(country => {

		return(
			<MenuItem key={country.alpha2Code} value={country.alpha2Code} disableRipple={true}>
				{country.flag? (<img
					className="country-flag"
					src={country.flag}
					width="20"
				alt={country.alpha3Code}/>): '' } {country.name}
				{country.callingCodes[0]?'(+'+country.callingCodes[0]+')':''}
			</MenuItem>
		)
	})
}
const checkImgs = path =>{
	return new Promise((resolve, reject)=>{
			const img = new Image();
			img.onload = () => resolve(path)
			img.onerror = () => reject()
			img.src = path
		}

	);
}
const ContactDetails = () => {
	const [flagsLoaded, setFlagsLoaded] = useState( false);

	useEffect(()=>{
		Promise.all(
			COUNTRIES.map( country => checkImgs(country.flag) )
		)
			.then( ()=> setFlagsLoaded(true),
				() => console.error('could not load images'))
	},[])

	const formik = useFormikContext();

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
						<CallingCode codes={codes(flagsLoaded)} />


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
							control={<Field
								component={Checkbox}
								name="contacts.forAnother"
								id="contacts.forAnother"
								color="primary"
								fullWidth  variant="standard" label="Is it for another person"
							/>}
							label="Booking for another person"
						/>


					</Grid>
					<Grid item  xs={12} sm={6}>
						{formik.values.contacts.forAnother === true
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


			</Grid>
			<pre>{JSON.stringify(formik, null, 2)}</pre>
		</>
	)
}
export default ContactDetails;
