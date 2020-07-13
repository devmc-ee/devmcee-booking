import React from "react";

const ServicePrice=props=>{

	let price =props.servicePrice>0?props.servicePrice + '€':''

	return <span className="service-item__price-regular">{price}</span>

}
export default ServicePrice
