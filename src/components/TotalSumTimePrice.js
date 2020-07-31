import React from "react";
import {getTotalPrice} from "../utils";
import './TotalSumTimePrice.css'


const TotalSumTimePrice = ({value}) => {
	let totalPrice, totalTime = 0;
	if (value && Reflect.ownKeys(value).length > 0) {
		totalPrice = getTotalPrice(Object.values(value)) + '€';
	}

	return (
		<div className = "services__total-sums">
			<div className = "services__total-length"></div>
			<div className = "services__total-price">{totalPrice}</div>

		</div>)
}
export default TotalSumTimePrice;
