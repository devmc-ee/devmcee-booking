import React, {useState} from "react";
import {Formik, Form, FieldArray} from "formik";
import {Grid, Stepper, Step, StepLabel, StepContent, Divider, Box, IconButton} from "@material-ui/core";
import ServiceOption from "./components/ServiceOption";
import ServiceBase from "./components/ServiceBase";
import DeleteService from "./components/DeleteService";
import AddService from "./components/AddService";
import TotalPrice from './components/TotalPrice';
import NextStep from "./components/NextStep";
import EditIcon from '@material-ui/icons/Edit';
import './App.css';
import AvailableTimePicker from "./components/AvailableTimePicker";

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
	const [activeStep, setActiveStep] = useState(1);

	return (
		<div className="App">
			<h1>Booking:</h1>
			<Formik initialValues={initialValues()} onSubmit={(values) => console.log(values)}>
				{formik => (
					<Form>

						<Stepper className="booking-form-stepper-container" activeStep={activeStep} orientation="vertical">

							<Step> <StepLabel onClick={()=>setActiveStep(0)}>Select service [Total: <TotalPrice
								services={formik.values.services}/>]
								{activeStep !== 0 ?<IconButton size="small"  onClick={()=>setActiveStep(0)}>  <EditIcon /></IconButton>:''}</StepLabel>

								<StepContent>

									<FieldArray name="services">
										{array => (
											<Grid container direction="column">
												{formik.values.services.length > 0 &&
												formik.values.services.map((service, index) => (
													<Grid

														className="services-service-option" container item
														direction="row" key={index}>

														<Grid xs={5} item>

															<ServiceBase index={index} formik={formik}/>

														</Grid>

														<Grid xs={1} item> </Grid>

														<Grid xs={5} item>

															<ServiceOption formik={formik} index={index}/> </Grid>

														<Grid container  xs={1} item>

															<DeleteService
																array={array} index={index} formik={formik}/>

														</Grid>

													</Grid>
												))}

												 <Divider lighter="true" component="hr"/> <Grid
												container className="services-action-footer"> <Grid item xs={6}> <Box
												mb={2} mt={1}> <AddService array={array} formik={formik}/> </Box>
											</Grid>

												<Grid
													justify="flex-end" alignItems="center" container item xs={6}>

													<NextStep formik={formik} step={0}
														onClick={setActiveStep} />


												</Grid>

											</Grid> <Divider lighter="true"/>
											<pre>
												{JSON.stringify(formik.values.services, null, 2)}
											</pre>
											</Grid>

										)}
									</FieldArray>

								</StepContent>

							</Step>

							<Step><StepLabel>Select Date and Time</StepLabel>

								<StepContent className="step-calendar-select">
									<AvailableTimePicker locale="et"/>
								</StepContent>

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
