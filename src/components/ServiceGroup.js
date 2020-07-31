import React from "react";
import PropTypes from "prop-types";
import {Grid, Paper} from '@material-ui/core'

const ServiceGroup = props => {
	return (<Grid container
			spacing = {1}
			direction = "row"
			justify = "flex-start"
			alignItems = "bottom"> <Grid item
			xs = {12}
			sm = {6}>

			{props.serviceBase}

		</Grid> <Grid item
			xs = {4}>
			{props.serviceOption}
		</Grid> {/*	<Grid item xs={2} >
				{props.servicePrice}
			</Grid>*/} <Grid xs = {2}
			item>
			{props.serviceDeleteBtn}
		</Grid>

		</Grid>
	);
};
ServiceGroup.propTypes = {
	classes: PropTypes.string,
	serviceGroupdId: PropTypes.string.isRequired,
	serviceBase: PropTypes.object.isRequired,
	serviceOption: PropTypes.object.isRequired,
	servicePrice: PropTypes.object.isRequired,
	serviceDeleteBtn: PropTypes.object.isRequired
};
export default ServiceGroup;
