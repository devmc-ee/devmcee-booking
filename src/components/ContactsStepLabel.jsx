import React from 'react';
import {useFormikContext} from "formik";

const ContactsStepLabel = () => {
	const formik = useFormikContext();
	let label = 'Contact details';
	const {contacts} = formik.values;

	if (contacts.forAnother && contacts.anotherName) {
		label = 'Appointment for ' +contacts.anotherName+ '...';
	}else{
		if(contacts.name){
			label = 'Appointment for ' + contacts.name + '...';
		}
	}

	return (
		<>
			{label}
		</>
	);
};

export default ContactsStepLabel;
