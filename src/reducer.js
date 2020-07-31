export default function (state, {type, payload}) {

	switch (type) {
		case "selectServiceBase":

			if (null === state)
				state = JSON.parse( localStorage.getItem("selectedServices"))
			if (state && state.hasOwnProperty('serviceBase')) {

				state.serviceBase = {...state.serviceBase, ...{[payload.serviceGroupdId]: payload.value}};
				delete state.serviceOption[payload.serviceGroupdId]

			}

			return {...state};
		case "selectServiceOption":

			if (state && state.hasOwnProperty('serviceOption')) {
				//assign and merge
				state.serviceOption = {...state.serviceOption, ...{[payload.serviceGroupdId]: payload.value}};
			}

			return {...state};
		case 'deleteServiceGroup':

			let {serviceBase, serviceGroups, serviceOption} = state;


			if ('group0' === payload.value) {

				return null
			}

			if (payload.value && serviceGroups.hasOwnProperty(payload.value)) {

				delete serviceBase[serviceGroups[payload.value]];
				delete serviceOption[serviceGroups[payload.value]];
				delete serviceGroups[payload.value];
			}

			return {...state};
		case 'addServiceGroup':

			if (state && state.hasOwnProperty('serviceOption')) {
				let baseLength = Object.values(state.serviceBase).length;

				let optionsLength = Object.values(state.serviceOption).length;
				//qty of added services groups
				const serviceGroupsLength = state.serviceGroups && Object.values(state.serviceGroups).length;
				let lastServiceGroupId = state.serviceGroups && Object.values(state.serviceGroups)[serviceGroupsLength - 1];

				if (baseLength === optionsLength && serviceGroupsLength === optionsLength) {
					state.addedServicesQty++;
					state.serviceGroups = {
						...state.serviceGroups,
						...{['group' + (lastServiceGroupId + 1)]: (lastServiceGroupId + 1)}
					}
				}


			}

			return {...state}
		default:

			return {...state}
	}


}
