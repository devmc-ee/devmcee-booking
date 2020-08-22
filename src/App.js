import React, {useState} from "react";
import {Formik, Form} from "formik";
import {Stepper, Step, StepLabel, StepContent} from "@material-ui/core";
import SelectService from './components/SelectService';
import TotalServicesLabel from './components/TotalServicesLabel';
import SelectAppointmentLabel from './components/SelectAppointmentLabel';
import ContactDetails from "./components/ContactDetails";
import ContactsStepLabel from './components/ContactsStepLabel'
import * as Yup from 'yup';
import './App.css';
import Calendar from "./components/Calendar";
import PaymentSelect from "./components/PaymentSelect";
import BookingSummary from "./components/BookingSummary";

const initValues = {
	services: [
		{
			serviceBase: "",
			serviceOption: ""
		}

	],
	appointment: '',
	contacts: {
		name: '',
		email: '',
		telephone: '',
		callingcode: 'EE',
		forAnother:'false',
		anotherName:''
	},
	payment:{
		method: 'salon',
		addInfo: ""
	}
};
const ValidationSchema = Yup.object().shape({

	contacts: Yup.object().shape({
		name: Yup.string()
			.min(3, 'Too short!')
			.max(50, 'Too long!')
			.required('Required!'),
		email: Yup.string()
			.email('Invalid email')
			.required('Required!'),
		callingcode: Yup.string()
			.required('Required!'),
		telephone: Yup.string()
			.matches(/^\d+$/, 'Only digits, please!')
			.min(5, 'Min 5 digits' )
			.max(15, 'Too long! Max. 15 digits')

			.required('Required!'),
		anotherName:Yup.string()
			.min(3, 'Too short!')
			.max(50, 'Too long!')
	})

})
const savedValues = JSON.parse(localStorage.getItem("bookingFormData"));
const ServiceStep = React.memo(({ setActiveStep})=>{

	return (
		<SelectService setActiveStep={setActiveStep}/>
	)
});
const ContactsStep = React.memo(({setActiveStep})=>{
	return(<ContactDetails setActiveStep={setActiveStep}/>)
});

export default function App() {
	const [activeStep, setActiveStep] = useState(0);

	return (
		<div className="App">
			<h1>Booking:</h1>
			<Formik
				initialValues={{...initValues, ...savedValues}} onSubmit={(values) => console.log(values)}
				validationSchema={ValidationSchema}>
				{formik => (
					<Form>

						<Stepper
							className="booking-form-stepper-container" activeStep={activeStep} orientation="vertical">

							<Step> <StepLabel>
								<TotalServicesLabel
								activeStep={activeStep} setActiveStep={setActiveStep}/> </StepLabel>

								<StepContent>
									<ServiceStep setActiveStep={setActiveStep}/>

								</StepContent>

							</Step>

							<Step><StepLabel>
								<SelectAppointmentLabel/>
							</StepLabel>

								<StepContent className="step-calendar-select"> <Calendar
									setActiveStep={setActiveStep} locale="en"/> </StepContent>

							</Step>

							<Step><StepLabel><ContactsStepLabel /></StepLabel>

								<StepContent>

									<ContactsStep setActiveStep={setActiveStep}/>

								</StepContent>

							</Step>

							<Step><StepLabel>Payment Options</StepLabel>

								<StepContent>
									<PaymentSelect setActiveStep={setActiveStep} />

								</StepContent>

							</Step>

							<Step><StepLabel>Review & Confirm</StepLabel>

								<StepContent>
									<BookingSummary/>
								</StepContent>

							</Step>

						</Stepper>
						<pre>{JSON.stringify(formik.values, null, 2)}</pre>
					</Form>
				)}
			</Formik>
		</div>
	);
}
