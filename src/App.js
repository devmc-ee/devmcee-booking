import React from "react";
import {Formik, Form, FieldArray} from "formik";
import {Grid, Stepper, Step, StepLabel, StepContent, Divider, Box } from "@material-ui/core";
import ServiceOption from "./components/ServiceOption";
import ServiceBase from "./components/ServiceBase";
import DeleteService from "./components/DeleteService";
import AddService from "./components/AddService";
import TotalSumTimePrice from './components/TotalSumTimePrice'
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
													<Grid className="services-service-option" container item direction = "row" key = {index}>

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

												<Grid   container className="services-action-footer" >
													<Grid item xs={5}>
														<Box mb={2}  mt={1}>
														<AddService array = {array} formik = {formik}/>
														</Box>
													</Grid>
												</Grid>
												<Divider lighter="true" component="hr"/>
												<Grid container className="services-action-footer" >

													<Grid container item xs={12}>

														<Box mb={2}  mt={1} >
															Total: <TotalSumTimePrice value={formik.values.services} />
														</Box>

													</Grid>

												</Grid>
												<Divider  lighter="true"/>

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
