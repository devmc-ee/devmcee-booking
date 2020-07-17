import React from "react";
import PropTypes from "prop-types";

const ServiceGroup = props => {
	return (
		<div
			className={"service-group-container " + props.classes}
			data-service-group-id={props.serviceGroupdId}
		>
			<div
				className="service-base-select-container"
				data-service-group-id={props.serviceGroupdId}
			>
				{props.serviceBase}
			</div>
			<div
				className="service-option-select-container"
				data-service-group-id={props.serviceGroupdId}
			>
				{props.serviceOption}
			</div>
			<div
				className="service-price-container"
				data-service-group-id={props.serviceGroupdId}
			>
				{props.servicePrice}
			</div>
			<div
				className="service-group-delete-btn-container"
				data-service-group-id={props.serviceGroupdId}
			>
				{props.serviceDeleteBtn}
			</div>
		</div>
	);
};
ServiceGroup.propTypes = {
	classes: PropTypes.string,
	serviceGroupdId: PropTypes.number.isRequired,
	serviceBase: PropTypes.object.isRequired,
	serviceOption: PropTypes.object.isRequired,
	servicePrice: PropTypes.object.isRequired,
	serviceDeleteBtn: PropTypes.object.isRequired
};
export default ServiceGroup;
