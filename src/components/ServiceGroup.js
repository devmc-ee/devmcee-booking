import React, {PureComponent} from "react";
//import Services from '../ServicesData';
import {ServicesBaseCodes, Services, ServiceLengths} from '../ServicesData'
import ServiceItemsSelect from "./ServiceItemsSelect";
import ServiceLengthSelect from "./ServiceLengthSelect";
import DeleteServiceGroupdBtn from './DeleteServiceGroupdBtn/DeleteServiceGroupdBtn'
import ServicePrice from "./ServicePrice";
class ServiceGroup extends PureComponent {
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
			lengths: ServiceLengths,
			lang: 'en',
			value: selectedServiceBaseValue,
			selectedService: selectedServiceBaseValue,
			selectedServiceOptions: selectedServiceOptions,
			selectedServiceValue:selectedServiceValue,
			selectedServicePrice: selectedServicePrice
		}
		this.handleServiceChange = this.handleServiceChange.bind(this)

	}

	handleServiceChange(e) {
		this.props.resetServiceOptions(e)
		this.setState({
			value: e.target.value,
			selectedService:e.target.value,
			selectedServiceValue:e.target.value,
			selectedServiceOptions: this.servicesOptions(e.target.value),

		})

	}

	servicesOptions=(selectedServiceBase)=>{
		if(selectedServiceBase){
			return this.state.services[selectedServiceBase].options
		}
		return ''

	}

	render() {
		return (
			<div className="booking-form__service-item-group">
				<ServiceItemsSelect
					serviceGroupId={this.props.serviceGroupId}
					selectedServices={this.props.selectedServices}
					services = {this.state.services}
					local = {this.state.lang}
					changeHandler = {this.handleServiceChange}
					value = {this.state.value}
					lang={this.state.lang}
				/>

				<ServiceLengthSelect
					serviceGroupId={this.props.serviceGroupId}
					lengths = {this.state.lengths}
					selectedService={this.state.selectedService}
					servicesOptions={this.state.selectedServiceOptions}
					selectedServiceValue={this.state.selectedServiceValue}
					services={this.state.services}
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
