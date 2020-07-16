import React, {Component} from "react";
import ServiceGroup from "./ServiceGroup";
import {Prices} from '../ServicesData';
import {getPrices, totalPriceCalc, updatePrices} from "../utils";
import TotalPrice from './TotalPrice'

class Form extends Component {
	constructor(props) {
		super(props);
		//localStorage.clear()
		// {index: serviceOptionCode,...}
		let selectedServices = JSON.parse(localStorage.getItem('DevmceeBooking__selectedServices'));
		selectedServices = selectedServices ? selectedServices : {};

		let updatedPrices=updatePrices(selectedServices)
		let selectedServicesNumber = JSON.parse(localStorage.getItem('DevmceeBooking__selectedServicesNumber'))

		this.state = {
			name: '',
			selectedServices: selectedServices ? selectedServices : {},
			selectedServiceCode: '',
			servicePrice: '',
			selectedServicesNumber: selectedServicesNumber ? selectedServicesNumber : 1,
			totalServicesPrice: updatedPrices.totalServicesPrice,
			selectedServicesPrices: updatedPrices.selectedServicesPrices,
			testValue: ''
		}
		this.handleServiceOptionSelect = this.handleServiceOptionSelect.bind(this)
		this.addServiceClickandler = this.addServiceClickandler.bind(this)
		this.deleteService = this.deleteService.bind(this)
	}

	handleServiceOptionSelect = (e) => {
		let serviceId = e.target.dataset.serviceGroupId;
		let selectedServiceCode = e.target.value;

		let selectedServices = this.state.selectedServices;
		selectedServices[serviceId] = selectedServiceCode;

		let prices = getPrices(Object.values(selectedServices))


		let servicePrice = selectedServiceCode ? Prices[selectedServiceCode].price : 0

		this.setState({
			selectedServiceCode: {
				serviceName: selectedServiceCode
			},
			selectedServices: selectedServices,
			servicePrice: servicePrice,
			servicePrices: this.selectedServiceCode,
			totalServicesPrice: totalPriceCalc(prices),
			selectedServicesPrices: prices
		})

		localStorage.setItem('DevmceeBooking__selectedServices',
			JSON.stringify(selectedServices))

	}

	resetServiceOptionSelected = (e) => {
		//console.log('Forms: resetServiceOptionSelected=> ',e.target)
		let serviceGroupId= e.target.dataset.serviceGroupId;
		let services=this.state.selectedServices
		let updatedPrices=updatePrices(services,serviceGroupId)
		//console.log('Forms: updatePrices=> ',updatedPrices)
		this.setState(updatePrices)
	}

	addServiceClickandler = (e) => {
		e.preventDefault();
		let selectedServicesNumber = this.state.selectedServicesNumber + 1

		this.setState({
			selectedServicesNumber: selectedServicesNumber

		})
		localStorage.setItem('DevmceeBooking__selectedServicesNumber', selectedServicesNumber)

	}

	deleteService = (e) => {
		const {selectedServicesNumber, selectedServices}= this.state
		e.preventDefault()
		let groupsQty = selectedServicesNumber - 1
		let selectedServicesNewKeys = Object.keys(selectedServices).filter(key => key.toString() !== e.target.id)
		let selectedServicesNew = {...selectedServicesNewKeys.map(key => selectedServices[key])}

		let updatedPrices=updatePrices(selectedServicesNew)
		this.setState({
			selectedServicesNumber: groupsQty,
			selectedServices: selectedServicesNew,

			totalServicesPrice: updatedPrices.totalServicesPrice,
			selectedServicesPrices: updatedPrices.selectedServicesPrices

		})

		localStorage.setItem('DevmceeBooking__selectedServicesNumber', groupsQty)
		localStorage.setItem('DevmceeBooking__selectedServices', JSON.stringify(selectedServicesNew))
	}
	componentWillUnmount() {

	}

	listServicesGroups = servicesNumber => {
		let servicesGroups = []
		let selectedServices = JSON.parse(localStorage.getItem('DevmceeBooking__selectedServices'))


		for (let i = 0; i < servicesNumber; i++) {
			servicesGroups.push(
				<ServiceGroup
					props={this.state}
					deleteService = {this.deleteService}
					key = {i}
					testValue={this.state.testValue}
					serviceGroupId = {i}
					selectedServices = {selectedServices ? selectedServices[i] : ''}
					handleOptionSelectChange = {this.handleServiceOptionSelect}
					resetServiceOptions = {this.resetServiceOptionSelected}
					selectedServicesPrices = {this.state.selectedServicesPrices}
					selectedServicePrice = {this.state.selectedServicesPrices[i]}/>
			)
		}
		return servicesGroups
	}

	render() {
	const {name, method, action} = this.props;
		return (
			<form name = {name} method = {method} action = {action}>

				{this.listServicesGroups(this.state.selectedServicesNumber)}

				<div className = "booking-form__services-groups-footer">
					<button
						name = "add-service"
						id="add-service"
						onClick = {this.addServiceClickandler}
						value = "1">
							Add Service
					</button>

					<TotalPrice totalServicesPrice = {this.state.totalServicesPrice}/>
				</div>
			</form>
		)
	}

}

export default Form;
/**
 * <TextInput name = "customer-name" label = "Name: " value = {this.state.value}/> <DatePick/>
 //Service Select Component
 //Service Item Select
 //Service Length Select

 // Appointment Booking Group
 //Appointment Date
 //Appointment Time
 //TODO: Testing React

 //Customer Info Group -
 //Name
 //Tel
 //Email
 //Person that comes to massage

 //Payment Options Groupd
 //Payment Way Select
 */
