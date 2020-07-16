import React, {Component} from "react";
//import Services from '../ServicesData';
import {ServicesBaseCodes, Services, ServiceOptionsNames} from '../ServicesData'
import ServiceBaseSelect from "./ServiceBaseSelect";
import ServiceOptionSelect from "./ServiceOptionSelect";
import DeleteServiceGroupdBtn from './DeleteServiceGroupdBtn/DeleteServiceGroupdBtn'
import ServicePrice from "./ServicePrice";
class ServiceGroup extends Component {
	constructor(props) {
		super(props)
		let selectedServiceBaseValue = '';
		let selectedServiceOptions='';

		if(props.selectedServices){
			selectedServiceBaseValue= ServicesBaseCodes[props.selectedServices]
			selectedServiceOptions=Services[selectedServiceBaseValue].options
		}

		let selectedServiceValue = props.selectedServices?props.selectedServices:''
		let selectedServicePrice= props.selectedServicesPrices[props.serviceGroupId]
		this.state = {
			services: Services,
			ServiceOptionsNames: ServiceOptionsNames,
			lang: 'en',
			value: selectedServiceBaseValue,
			selectedServiceBaseValue: selectedServiceBaseValue,
			selectedServiceOptions: selectedServiceOptions,
			selectedServiceValue:selectedServiceValue,
			selectedServicePrice: selectedServicePrice,
			testValue2: this.props.testValue
		}
		this.handleServiceBaseChange = this.handleServiceBaseChange.bind(this)
	}

	handleServiceBaseChange(e) {
		console.log('ServiceGroup: before handle service change')

		let selectedServiceBase = e.target.value
		let selectedServiceOptions = this.selectedServiceOptions(selectedServiceBase)
		//console.log('selectedServiceBase=>',selectedServiceBase)
		this.setState({
			value: selectedServiceBase,
			selectedService:selectedServiceBase,
			selectedServiceValue:selectedServiceBase,
			selectedServiceOptions: selectedServiceOptions,
		})
		this.props.resetServiceOptions(e)
		//console.log('ServiceGroup: after handle service change')
		//console.log(this.state)
	}

	// Returns selected service options from base
	selectedServiceOptions=(selectedServiceBase)=>{

		if(selectedServiceBase){
			return this.state.services[selectedServiceBase].options
		}
		return ''
	}
	componentDidMount(){
		//console.log('ServiceGroup did mount')
		//console.log(this.state)
	}
	componentDidUpdate(){
		//console.log('ServiceGroup did update')
		//console.log(this.state)
	}
	render() {

		return (
			<div data-service-group-id={this.props.serviceGroupId} className="booking-form__service-item-group">
				<ServiceBaseSelect
					serviceGroupId={this.props.serviceGroupId}
					selectedServices={this.props.selectedServices}
					services = {this.state.services}
					local = {this.state.lang}
					changeHandler = {this.handleServiceBaseChange}
					value = {this.state.value}
					lang={this.state.lang}
					props={this.props}
				/>

				<ServiceOptionSelect
					serviceGroupId={this.props.serviceGroupId}
					serviceOptionsNames = {this.state.ServiceOptionsNames}

					selectedServiceOptions={this.state.selectedServiceOptions}
					selectedServiceValue={this.state.selectedServiceValue}

					lang={this.state.lang}
					handleOptionSelectChange={this.props.handleOptionSelectChange}/>

				<ServicePrice servicePrice={this.props.selectedServicePrice}/>

				<DeleteServiceGroupdBtn
						groupdId={this.props.serviceGroupId}
						deleteService={this.props.deleteService}
						serviceGroupId={this.props.serviceGroupId} />
			</div>
		);
	}

}

export default ServiceGroup
