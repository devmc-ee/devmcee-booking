import React from "react";
import PropTypes from "prop-types";
import { SERVICE_PRICES } from "../DATA";
const ServicePrice = props => {
	const priceRegular =props.serviceOption && SERVICE_PRICES[props.serviceOption]["price"] + "€";
	let priceDiscounted =
		props.serviceOption &&
		SERVICE_PRICES[props.serviceOption]["discountedPrice"];
	let priceDiscountedBlock, discountedClass = "";

	if (priceDiscounted > 0) {
		priceDiscounted = priceDiscounted + "€";
		priceDiscountedBlock = (
			<div className="service-price--discounted">{priceDiscounted}</div>
		);
		discountedClass = " discounted-price";
	}

	return (
		<div className="service-price-container ">
			<div className={"service-price--regular" + discountedClass}>
				{priceRegular}
			</div>
			{priceDiscountedBlock}
		</div>
	);
};
ServicePrice.propTypes = {
	serviceOption: PropTypes.string
};
export default ServicePrice;
