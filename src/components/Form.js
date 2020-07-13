import React, {Component} from "react";
import ServiceGroup from "./ServiceGroup";
import {Prices} from '../ServicesData';
import TotalPrice from './TotalPrice'

class Form extends Component {
	constructor(props) {
		super(props);
		//localStorage.clear()

		let totalServicesPrice = 0;
		let selectedServicesPrices = {}
		let selectedServices = JSON.parse(localStorage.getItem('DevmceeBooking__selectedServices'));
		selectedServices = selectedServices ? selectedServices : {};
		if (selectedServices) {
			for (let key in selectedServices) {
				if (Prices[selectedServices[key]]) {
					totalServicesPrice += Prices[selectedServices[key]].price
					selectedServicesPrices[key] = Prices[selectedServices[key]].price
				}
			}

		}


		let selectedServicesNumber = JSON.parse(localStorage.getItem('DevmceeBooking__selectedServicesNumber'))

		this.state = {
			name: '',
			selectedServices: selectedServices ? selectedServices : {},
			selectedServiceCode: '',
			servicePrice: '',
			selectedServicesNumber: selectedServicesNumber ? selectedServicesNumber : 1,
			totalServicesPrice: totalServicesPrice,
			selectedServicesPrices: selectedServicesPrices

		}
		this.handleServiceOptionSelect = this.handleServiceOptionSelect.bind(this)
		this.addServiceClickandler = this.addServiceClickandler.bind(this)
		this.deleteService = this.deleteService.bind(this)
	}


	handleServiceOptionSelect = (e) => {
		let serviceId = e.target.id;
		let selectedServiceCode = e.target.value;


		let selectedServices = this.state.selectedServices;
		selectedServices[serviceId] = selectedServiceCode;

		let prices = this.getPrices(Object.values(selectedServices))
		let servicePrice = selectedServiceCode ? Prices[selectedServiceCode].price : 0

		this.setState({
			selectedServiceCode: {
				serviceName: selectedServiceCode
			},
			selectedServices: selectedServices,
			servicePrice: servicePrice,
			servicePrices: this.selectedServiceCode,
			totalServicesPrice: this.totalPriceCalc(prices),
			selectedServicesPrices: prices
		})

		localStorage.setItem('DevmceeBooking__selectedServices',
			JSON.stringify(selectedServices))

	}

	resetServiceOptionSelected = (e) => {

		let targetId=e.target.id;
		let serviceGroupId=targetId?targetId.substring(targetId.indexOf('__')+2):'';
		console.log(serviceGroupId)
		let services=this.state.selectedServices
		this.updatePrices(services,serviceGroupId)

	}

	getPrices = codes => {
		return codes.map(code => {
			if (Prices[code])
				return Prices[code].price
			return false
		})

	}

	addServiceClickandler = (e) => {
		e.preventDefault();
		let selectedServicesNumber = this.state.selectedServicesNumber + 1
		console.log(selectedServicesNumber)
		this.setState({
			selectedServicesNumber: selectedServicesNumber

		})
		localStorage.setItem('DevmceeBooking__selectedServicesNumber', selectedServicesNumber)

	}

	totalPriceCalc = prices => {
		let sum = 0;
		for (let i in prices) {
			sum += prices[i] ? prices[i] : 0;
		}
		return sum;
	};

	updatePrices=(service,skipIndex)=>{
		let totalServicesPrice = 0
		let selectedServicesPrices = {}
		if (service) {
			for (let key in service) {
				if (Prices[service[key]] && key.toString()!==skipIndex.toString()) {
					totalServicesPrice += Prices[service[key]].price
					selectedServicesPrices[key] =Prices[service[key]].price
				}else{
					selectedServicesPrices[key] =''
				}
			}

		}
		console.log(selectedServicesPrices)
		this.setState({
			totalServicesPrice: totalServicesPrice,
			selectedServicesPrices: selectedServicesPrices
		})
	}

	deleteService = (e) => {
		e.preventDefault()
		console.log(e.target.id)
		let groupsQty = this.state.selectedServicesNumber - 1
		let selectedServices = this.state.selectedServices
		let selectedServicesNewKeys = Object.keys(selectedServices).filter(key => key.toString() !== e.target.id)
		let selectedServicesNew = {...selectedServicesNewKeys.map(key => selectedServices[key])}
		let totalServicesPrice = 0
		let selectedServicesPrices = {}
		if (selectedServicesNew) {
			for (let key in selectedServicesNew) {
				if (Prices[selectedServicesNew[key]]) {
					totalServicesPrice += Prices[selectedServicesNew[key]].price
					selectedServicesPrices[key] = Prices[selectedServicesNew[key]].price
				}
			}

		}
		this.setState({
			selectedServicesNumber: groupsQty,
			selectedServices: selectedServicesNew,
			totalServicesPrice: totalServicesPrice,
			selectedServicesPrices: selectedServicesPrices

		})
		localStorage.setItem('DevmceeBooking__selectedServicesNumber', groupsQty)
		localStorage.setItem('DevmceeBooking__selectedServices', JSON.stringify(selectedServicesNew))

	}

	listServicesGroups = servicesNumber => {
		let servicesGroups = []
		let selectedServices = JSON.parse(localStorage.getItem('DevmceeBooking__selectedServices'))
		//let selectedServicesPrices=this.getPrices(Object.values(selectedServices))

		for (let i = 0; i < servicesNumber; i++) {
			servicesGroups.push(
				<ServiceGroup deleteService = {this.deleteService} key = {i} serviceGroupId = {i} selectedServices = {selectedServices ? selectedServices[i] : ''} handleOptionSelectChange = {this.handleServiceOptionSelect} resetServiceOptions = {this.resetServiceOptionSelected} selectedServicesPrices = {this.state.selectedServicesPrices} selectedServicePrice = {this.state.selectedServicesPrices[i]}/>
			)
		}
		return servicesGroups
	}

	render() {
		return (
			<form name = {this.props.name} method = {this.props.method} action = {this.props.action}>

				{this.listServicesGroups(this.state.selectedServicesNumber)}

				<div className = "booking-form__services-groups-footer">
					<button name = "add-service" onClick = {this.addServiceClickandler} value = "1">Add Service</button>

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

 //Customer Info Group -
 //Name
 //Tel
 //Email
 //Person that comes to massage

 //Payment Options Groupd
 //Payment Way Select
 */
