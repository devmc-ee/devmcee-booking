import React from "react";

import ServiceBaseSelect from "./ServiceBaseSelect";
import ServiceOptionSelect from "./ServiceOptionSelect";
import ServicePrice from "./ServicePrice";
import ServiceDeleteBtn from "./ServiceDeleteBtn";
import {Grid} from '@material-ui/core';


const ServiceGroupsArray = ({errors, state, dispatch}) => {
	//let servicesQty = num ? num : 1;
	let serviceInputs = [];
	let serviceBase, serviceOption = '';
	let serviceGroups = state && state.hasOwnProperty('serviceGroups') ?
		state.serviceGroups :
		{group0: 0};

	for (let groupId in serviceGroups) {
		serviceBase = state && state.hasOwnProperty('serviceBase') ?
			state.serviceBase[serviceGroups[groupId]] : '';
		serviceOption = state && state.hasOwnProperty('serviceOption') ?
			state.serviceOption[serviceGroups[groupId]] : '';

		serviceInputs.push(
			<Grid container
				key = {groupId}
				spacing = {1}
				direction = "row"
				justify = "flex-start"
				alignItems = "flex-end">

				<Grid item
					xs = {12}
					sm = {6}>

					<ServiceBaseSelect value = {serviceBase}
						onChange = {dispatch}
						errors = {errors}
						serviceGroupdId = {serviceGroups[groupId]}/>

				</Grid>

				<Grid item
					xs = {4}>

					<ServiceOptionSelect servicebase = {serviceBase}
						value = {serviceOption}
						onChange = {dispatch}
						serviceGroupdId = {serviceGroups[groupId]}/>

				</Grid>

				<Grid xs = {2}
					item>

					<ServiceDeleteBtn value = {groupId}
						id = {groupId}
						dispatch = {dispatch}
						state = {state}/>

				</Grid>

			</Grid>
		);
	}

	return serviceInputs;
};
export default ServiceGroupsArray;
