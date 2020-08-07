import React, {useState} from "react";
import {Formik, Form} from "formik";
import {Stepper, Step, StepLabel, StepContent} from "@material-ui/core";
import SelectService from './components/SelectService';
import TotalServicesLabel from './components/TotalServicesLabel';
import './App.css';
import Calendar from "./components/Calendar";

const initialValues = () => {

	const savedValue = JSON.parse(localStorage.getItem("bookingFormData"));
	if (savedValue) {
		return savedValue;
	}
	return {
		services: [
			{
				serviceBase: "",
				serviceOption: ""
			}
		]
	};
};

export default function App() {
	const [activeStep, setActiveStep] = useState(0);

	return (
		<div className="App">
			<h1>Booking:</h1>
			<Formik initialValues={initialValues()} onSubmit={(values) => console.log(values)}>
				{formik => (
					<Form>

						<Stepper
							className="booking-form-stepper-container" activeStep={activeStep} orientation="vertical">

							<Step>
								<StepLabel onClick={() => setActiveStep(0)}>
									<TotalServicesLabel activeStep={activeStep} setActiveStep={setActiveStep} />
								</StepLabel>

								<StepContent> <SelectService setActiveStep={setActiveStep}/> </StepContent>

							</Step>

							<Step><StepLabel>Select Date and Time</StepLabel>

								<StepContent className="step-calendar-select"> <Calendar locale="en"/> </StepContent>

							</Step>

							<Step><StepLabel>Contact Details</StepLabel>

								<StepContent></StepContent>

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
