import React from 'react';
import { useFormikContext, FieldArray } from 'formik';
import { Grid,  Divider, Box } from "@material-ui/core";
import DeleteService from "./DeleteService";
import AddService from "./AddService";
import NextStep from "./NextStep";
import ServiceOption from "./ServiceOption";
import ServiceBase from "./ServiceBase";

const SelectService = ({setActiveStep}) => {
    const formik = useFormikContext();
    return (
        <FieldArray name="services">
            {array => (
                <Grid container direction="column">
                    {formik.values.services.length > 0 &&
                        formik.values.services.map((service, index) => (
                            <Grid

                                className="services-service-option" container item
                                direction="row" key={index}>

                                <Grid xs={5} item>

                                    <ServiceBase index={index} formik={formik} />

                                </Grid>

                                <Grid xs={1} item> </Grid>

                                <Grid xs={5} item>

                                    <ServiceOption formik={formik} index={index} /> </Grid>

                                <Grid container xs={1} item>

                                    <DeleteService
                                        array={array} index={index} formik={formik} />

                                </Grid>

                            </Grid>
                        ))}

                    <Divider lighter="true" component="hr" /> <Grid
                        container className="services-action-footer"> <Grid item xs={6}> <Box
                            mb={2} mt={1}> <AddService array={array} formik={formik} /> </Box>
                        </Grid>

                        <Grid
                            justify="flex-end" alignItems="center" container item xs={6}>

                            <NextStep  step={0}
                                onClick={setActiveStep} />


                        </Grid>

                    </Grid> <Divider lighter="true" />

                </Grid>

            )}
        </FieldArray>
    );
}

export default SelectService;
