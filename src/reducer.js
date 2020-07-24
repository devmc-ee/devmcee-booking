export default function (state, {type, payload}) {

	switch (type) {
		case "selectServiceBase":
			/*console.log('____________selectServiceBase__________');
			console.log( '1. state before: ', state);*/
			if (state && state.hasOwnProperty('serviceBase')) {

				state.serviceBase = {...state.serviceBase, ...{[payload.serviceGroupdId]: payload.value}};

				delete state.serviceOption[payload.serviceGroupdId]
			}
			/*console.log( '2. stateAfter', state);
			console.log('____________//selectServiceBase__________');*/
			return {...state};
		case "selectServiceOption":

			/*console.log('____________selectServiceOption__________');
			console.log( '1. stateBefore', state);*/
			if (state && state.hasOwnProperty('serviceOption')) {
				//assign and merge
				state.serviceOption = {...state.serviceOption, ...{[payload.serviceGroupdId]: payload.value}};
			}
			/*console.log( '2. stateAfter', state);
			console.log( '2. stateAfter{}', {...state});
			console.log('____________//selectServiceOption__________');*/
			return {...state};
		case 'deleteServiceGroup':
			/*console.log('____________deleteServiceGroup__________');
			console.log( '1. Payload: ', payload);
			console.log( '2. State: ', state);*/
			let { serviceBase, serviceGroups, serviceOption} = state;

			/*console.log('3. serviceGroups, serviceBase, serviceOption:  ',x
				serviceBase, serviceGroups, serviceOption);*/
			if ('group0' === payload.value){
				return {
					serviceGroups:{group0: 0},
					serviceBase:{},
					serviceOption:{}
				}
			}

			if(payload.value && serviceGroups.hasOwnProperty(payload.value)){
				/*console.log( '4. Delete service group: ', payload.value, serviceGroups[payload.value]);*/
				delete serviceBase[serviceGroups[payload.value]];
				delete serviceOption[serviceGroups[payload.value]];
				delete serviceGroups[payload.value];

			}

			/*console.log( '5. State out >>>>: ', state);
			console.log('____________//deleteServiceGroup__________');*/
			return {...state};
		case 'addServiceGroup':

			if (state && state.hasOwnProperty('serviceOption')) {
				/*console.log('____________addServiceGroup__________');*/

				let baseLength = Object.values(state.serviceBase).length;

				let optionsLength = Object.values(state.serviceOption).length;
				/*console.log('1.addService optionsLengths', baseLength, optionsLength, state.addedServicesQty)*/
				//qty of added services groups
				const serviceGroupsLength = state.serviceGroups && Object.values(state.serviceGroups).length;
				let  lastServiceGroupId = state.serviceGroups && Object.values(state.serviceGroups)[serviceGroupsLength-1];
				/*console.log( '2.lastServiceGroupId length, values, lastId',
					serviceGroupsLength,
					state.serviceGroups && Object.values(state.serviceGroups),
					lastServiceGroupId );*/
				/*console.log( '3.lastServiceGroupId baseLength, optionsLength',
					baseLength,
					optionsLength );*/
				if (baseLength === optionsLength && serviceGroupsLength === optionsLength) {
					state.addedServicesQty++;
					state.serviceGroups = {...state.serviceGroups,
						...{['group' + (lastServiceGroupId+1)] : (lastServiceGroupId+1) } }
				}


			}
		/*	console.log('____________//addServiceGroup_________')*/
			return {...state}
		default:

			return state;
	}

}
