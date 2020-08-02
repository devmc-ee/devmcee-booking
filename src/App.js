import React from "react";
import {Formik, Form, FieldArray} from "formik";
import {Grid, Stepper, Step, StepLabel, StepContent} from "@material-ui/core";
import ServiceOption from "./components/ServiceOption";
import ServiceBase from "./components/ServiceBase";
import DeleteService from "./components/DeleteService";
import AddService from "./components/AddService";
import './App.css';

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
	return (
		<div className = "App">
			<h1>Booking:</h1>
			<Formik initialValues = {initialValues()} onSubmit = {(values) => console.log(values)}>
				{formik => (
					<Form>

						<Stepper activeStep = {0} orientation = "vertical">

							<Step> <StepLabel>Select service</StepLabel>

								<StepContent>

									<FieldArray name = "services">
										{array => (
											<Grid container direction = "column">
												{formik.values.services.length > 0 &&
												formik.values.services.map((service, index) => (
													<Grid
														container item direction = "row" key = {index}>

														<Grid xs = {5} item>

															<ServiceBase index = {index} formik = {formik}/>

														</Grid>

														<Grid xs = {1} item> </Grid>

														<Grid xs = {5} item>

															<ServiceOption formik = {formik} index = {index}/> </Grid>

														<Grid xs = {1} item>

															<DeleteService
																array = {array} index = {index} formik = {formik}/>

														</Grid>

													</Grid>
												))}

												<AddService array = {array} formik = {formik}/>
												<pre>{JSON.stringify(formik.values.services, null, 2)}</pre>
											</Grid>
										)}
									</FieldArray>

								</StepContent>

							</Step>

							<Step><StepLabel>Select Date and Time</StepLabel>

								<StepContent></StepContent>

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
