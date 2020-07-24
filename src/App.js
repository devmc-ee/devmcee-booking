import React, {useReducer, useEffect} from "react";
import './App.css'
import ServicesContainer from "./ServicesContainer";
import {AppContext} from "./AppContext";
import reducer from "./reducer";
import ServiceGroupsArray from './components/ServiceGroupsArray';
import AddServiceGroupBtn from './components/AddServiceGroupBtn'


export default function App() {
	const [state, dispatch] = useReducer(
		reducer,
		JSON.parse(localStorage.getItem("selectedServices")
		)
	);
	useEffect(() => {
		//console.log('UseEffect: state received>>>>', state);
		if( null === state ){

			localStorage.setItem("selectedServices", JSON.stringify({
				serviceGroups:{group0: 0},
				serviceBase:{},
				serviceOption:{}
			}));
		}else{
			localStorage.setItem("selectedServices", JSON.stringify(state));

		}

	}, [state]);

	let servicesQty = state && state.hasOwnProperty('addedServicesQty') ?
		state.addedServicesQty : 1;

	const contextValues = {
		lang: "en"
	};

	return (
		<div className = "App">
			<AppContext.Provider value = {contextValues}>
				<ServicesContainer>
					<ServiceGroupsArray num = {servicesQty}
						state = {state}
						dispatch = {dispatch}/>
					<div className="services-container__footer">
						<div className="service-container__add-service-btn-wrap">
							<AddServiceGroupBtn state = {state}
								dispatch = {dispatch}/>
						</div>


					</div>
			</ServicesContainer>
			</AppContext.Provider>
		</div>
	);
}
