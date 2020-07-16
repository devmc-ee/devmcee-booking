import React from "react";
import PropTypes from 'prop-types';

function DeleteServiceGroupdBtn(props) {
	let hiddenClass = '';
	let disabled = ''
	if (props.serviceGroupId === 0) {
		hiddenClass = ' hidden ';
		disabled = 'disabled'
	}
	let classes = "btn btn__delete-service-btn btn__delete-service-" + props.serviceGroupId + hiddenClass;

	return <button
		data-testid={"btn-delete-"+props.groupdId}
		id={props.groupdId}
		data-service-group-id={props.serviceGroupId}
		onClick={props.deleteService}
		disabled={disabled} className = {classes}>X</button>


}
DeleteServiceGroupdBtn.propTypes = {
	groupdId: PropTypes.number.isRequired,
	deleteService: PropTypes.func.isRequired,

};
export default DeleteServiceGroupdBtn;
