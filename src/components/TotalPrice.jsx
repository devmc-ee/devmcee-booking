import React from "react";
import {getTotalPrice} from "../utils";
import './TotalSumTimePrice.css'


const TotalPrice = ({services}) => {
	//services: [{serviceBase: string, serviceOption: string}, ...]

	let totalPrice = 0;
	let options = [];
	if (services && Reflect.ownKeys(services).length > 0) {
		for (let i in services){
			options.push(services[i].serviceOption)
		}
		totalPrice = getTotalPrice(Object.values(options)) + '€';
	}

	return <span className = "services__total-price">{totalPrice}</span>
}
export default TotalPrice;
