import React, {useEffect, useReducer} from "react";
import reducer from "./reducer";

const TComp = (props) => {
	const [state, dispatch] = useReducer(
		reducer,
		{
			serviceGroups: {group0: 0, group1: 1},
			serviceBase: {
				0: 'th', 1: 'f'
			},
			serviceOption: {
				0: 'th1', 1: 'f05'
			},


		}
	);
	useEffect(() => {

		if (null === state) {

			localStorage.setItem("selectedServicesTest", JSON.stringify({
				serviceGroups: {
					group0: 0, group1: 1
				},
				serviceBase:
					{
						0:
							'th', 1:
							'f'
					}
				,
				serviceOption: {
					0:
						'th1', 1:
						'f05'
				}
				,


			}))
			;
		} else {
			localStorage.setItem("selectedServicesTest", JSON.stringify(state));

		}
	}, [state]);

	return (
		<div>
			<select name = "selectServiceBase_0"
				value = {state.serviceBase[0]}
				onChange = {e => {
					dispatch({
						type: 'selectServiceBase',
						payload: {
							value: e.target.value,
							serviceGroupdId: '0'
						}
					})
				}
				}>
				<option value = "th">thai</option>
				<option value = "f">thai</option>
				<option value = "b">thai</option>
				<option value = "h">thai</option>
			</select> <select name = "selectServiceBase_1"

			value = {state.serviceBase[1]}
			onChange = {e => {
				dispatch({
					type: 'selectServiceBase',
					payload: {
						value: e.target.value,
						serviceGroupdId: '1'
					}
				})
			}
			}>
			<option value = "th">thai</option>
			<option value = "f">thai</option>
			<option value = "b">thai</option>
			<option value = "h">thai</option>
		</select> <select name = "selectServiceOption_0"
			value = {state.serviceOption[0]}
			className = 'serviceOption'
			onChange = {e => {
				dispatch({
					type: 'selectServiceOption',
					payload: {
						value: e.target.value,
						serviceGroupdId: '0'
					}
				})
			}
			}>
			<option value = "th1">th1_</option>
			<option value = "th15">th15_</option>
			<option value = "th2">th2_</option>
		</select> <select id = "selectServiceOption_1"
			value = {state.serviceOption[1]}
			className = 'serviceOption'
			onChange = {e => {
				dispatch({
					type: 'selectServiceOption',
					payload: {
						value: e.target.value,
						serviceGroupdId: '1'
					}
				})
			}
			}>
			<option value = "f05">f05_</option>
			<option value = "f1">f1_</option>
		</select>
			<button id = "deleteServiceGroup_1"
				value="group1"
				onClick = {e => {
					dispatch({
						type: 'deleteServiceGroup',
						payload: {
							value: e.target.value,
						}
					})
				}}>X
			</button>
			<button id = "deleteServiceGroup_2"
				value="group2"
				onClick = {e => {
					dispatch({
						type: 'deleteServiceGroup',
						payload: {
							value: e.target.value,
						}
					})
				}}>X
			</button>
			}/>
			<button id = "addServiceGroup"


				onClick = {e => {
					e.preventDefault();
					dispatch({
						type: 'addServiceGroup',

					})
				}}>X</button>}/> </div>
	);
}

export default TComp;
