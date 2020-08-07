import React, {useState} from "react";
import {Formik, Form} from "formik";
import {Stepper, Step, StepLabel, StepContent,  IconButton} from "@material-ui/core";
import TotalPrice from './components/TotalPrice';
import SelectService from './components/SelectService';
import EditIcon from '@material-ui/icons/Edit';
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
								<StepLabel onClick={() => setActiveStep(0)}>Select service [Total: <TotalPrice
									services={formik.values.services}/>] {activeStep !== 0 ?
									<IconButton size="small" onClick={() => setActiveStep(0)}>
										<EditIcon/>
									</IconButton> : ''}
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
