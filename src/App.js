import React, {useState} from "react";
import {Formik, Form} from "formik";
import {Stepper, Step, StepLabel, StepContent} from "@material-ui/core";
import SelectService from './components/SelectService';
import TotalServicesLabel from './components/TotalServicesLabel';
import SelectAppointmentLabel from './components/SelectAppointmentLabel';
import ContactDetails from "./components/ContactDetails";
import * as Yup from 'yup';
import './App.css';
import Calendar from "./components/Calendar";

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
		callingcode: 'EE'
	}
};
const savedValues = JSON.parse(localStorage.getItem("bookingFormData"));


export default function App() {
	const [activeStep, setActiveStep] = useState(2);

	return (
		<div className="App">
			<h1>Booking:</h1>
			<Formik initialValues={{...initValues, ...savedValues}}
				onSubmit={(values) => console.log(values)}>
				{formik => (
					<Form>

						<Stepper
							className="booking-form-stepper-container" activeStep={activeStep} orientation="vertical">

							<Step> <StepLabel> <TotalServicesLabel
								activeStep={activeStep} setActiveStep={setActiveStep}/> </StepLabel>

								<StepContent> <SelectService setActiveStep={setActiveStep}/> </StepContent>

							</Step>

							<Step><StepLabel><SelectAppointmentLabel/></StepLabel>

								<StepContent className="step-calendar-select"> <Calendar
									setActiveStep={setActiveStep} locale="en"/> </StepContent>

							</Step>

							<Step><StepLabel>Contact Details</StepLabel>

								<StepContent> <ContactDetails/> </StepContent>

							</Step>

							<Step><StepLabel>Payment Options</StepLabel>

								<StepContent></StepContent>

							</Step>

						</Stepper>

					</Form>
				)}
			</Formik>
		</div>
	);
}
