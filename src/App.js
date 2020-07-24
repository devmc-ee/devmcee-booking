import React, {useReducer, useEffect} from "react";
import './App.css'
import ServicesContainer from "./ServicesContainer";
import {AppContext} from "./AppContext";
import reducer from "./reducer";
import ServiceGroupsArray from './components/ServiceGroupsArray';
import AddServiceGroupBtn from './components/AddServiceGroupBtn'
import TotalSumTimePrice from "./components/TotalSumTimePrice";


export default function App() {

	const [state, dispatch] = useReducer(
		reducer,
		JSON.parse(localStorage.getItem("selectedServices"))
	);

	useEffect(() => {

		if( null === state || Reflect.ownKeys(state).length === 0 ){
			localStorage.setItem("selectedServices", JSON.stringify({
				serviceGroups:{group0: 0},
				serviceBase:{},
				serviceOption:{}
			}));

		}else{

			localStorage.setItem("selectedServices", JSON.stringify(state));

		}

	}, [state]);


	const contextValues = {
		lang: "en",
		dispatch: dispatch,
		state: state
	};
	const serviceOptions = state && state.hasOwnProperty('serviceOption')?
		state.serviceOption: {};

	return (
		<div className = "App">
			<AppContext.Provider value = {contextValues}>
				<ServicesContainer>
					<ServiceGroupsArray
						state = {state}
						dispatch = {dispatch}/>
					<div className="services-container__footer">
						<div className="service-container__add-service-btn-wrap">
							<AddServiceGroupBtn state = {state}
								dispatch = {dispatch}/>
						</div>
						<TotalSumTimePrice  value={serviceOptions }  onChange={dispatch}/>

					</div>
			</ServicesContainer>
			</AppContext.Provider>
		</div>
	);
}
