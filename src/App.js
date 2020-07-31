import React, {useReducer, useEffect, useState} from "react";
import './App.css'
import ServicesContainer from "./ServicesContainer";
import {AppContext} from "./AppContext";
import reducer from "./reducer";
import ServiceGroupsArray from './components/ServiceGroupsArray';
import AddServiceGroupBtn from './components/AddServiceGroupBtn'
import TotalSumTimePrice from "./components/TotalSumTimePrice";
import {Grid} from '@material-ui/core';


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

				<Grid container direction="column" spacing={2}>
					<ServiceGroupsArray
						state = {state}
						dispatch = {dispatch}/>
					<Grid container item direction="row" spacing={1} className="services-container__footer"
					>
						<Grid item  xs={6} className="service-container__add-service-btn-wrap">
							<AddServiceGroupBtn state = {state}
								dispatch = {dispatch}/>
						</Grid>
						<Grid item xs={6}>
						<TotalSumTimePrice  value={serviceOptions }  onChange={dispatch}/>
						</Grid>
					</Grid>
				</Grid>
			</AppContext.Provider>
		</div>
	);
}
