import React from "react";
import {Field, useFormikContext} from "formik";
import {TextField} from "formik-material-ui";

const ContactDetails = () => {
	const formik = useFormikContext();
	console.log(formik.values)
	return (
		<>
			<Field
				component={TextField} name="contacts.name" id="contacts.name" type="text" variant="standard"
				label="Name"  placeholder="Name..." fullWidth/>

			<Field
				component={TextField} name="contacts.email" id="contacts.email"
				 type="text" variant="standard"
				label="Email" placeholder="Email..." fullWidth/>
			<div className="contacts-telephone-wrap">
				<Field
					className="contacts-telephone-callingcode"
					component={TextField} name="contacts.callingcode" id="contacts.callingcode" type="text"
					label="Code"

					autoComplete="off"
					variant="standard"  placeholder="+372..."/>

				<Field
					component={TextField} name="contacts.telephone" id="contacts.telephone" type="text"
					fullWidth
					autoComplete="off"
					variant="standard" label="Telephone" placeholder="55597565..."/>
			</div>
		</>
	)
}
export default ContactDetails;
