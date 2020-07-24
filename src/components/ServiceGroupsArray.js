import React from "react";
import ServiceGroup from "./ServiceGroup";
import ServiceBaseSelect from "./ServiceBaseSelect";
import ServiceOptionSelect from "./ServiceOptionSelect";
import ServicePrice from "./ServicePrice";
import ServiceDeleteBtn from "./ServiceDeleteBtn";


const ServiceGroupsArray = ({num, state, dispatch}) => {
	let servicesQty = num ? num : 1;
	let serviceInputs = [];
	let serviceBase, serviceOption = '';
	let serviceGroups = state && state.hasOwnProperty('serviceGroups') ?
		state.serviceGroups :
		{group0: 0};

	//for (let i = 0; i < servicesQty; i++) {
	for(let groupId in serviceGroups){
		serviceBase = state && state.hasOwnProperty('serviceBase') ?
			state.serviceBase[serviceGroups[groupId]] : '';
		serviceOption = state && state.hasOwnProperty('serviceOption') ?
			state.serviceOption[serviceGroups[groupId]] : '';

		serviceInputs.push(
			<ServiceGroup key = {groupId}
				serviceGroupdId = {groupId}
				serviceBase = {
					<ServiceBaseSelect value = {serviceBase}
						onChange = {dispatch}
						serviceGroupdId = {serviceGroups[groupId]}/>
				}
				serviceOption = {
					<ServiceOptionSelect servicebase = {serviceBase}
						value = {serviceOption}
						onChange = {dispatch}
						serviceGroupdId = {serviceGroups[groupId]}/>
				}
				servicePrice = {<ServicePrice serviceOption = {serviceOption}/>}
				serviceDeleteBtn = {<ServiceDeleteBtn value = {groupId}
					id = {groupId}
					dispatch = {dispatch}
					state = {state}/>}/>
		);
	}

	return serviceInputs;
};
export default ServiceGroupsArray;
