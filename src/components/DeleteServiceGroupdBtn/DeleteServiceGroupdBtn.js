import React from "react";

function DeleteServiceGroupdBtn(props) {
	let hiddenClass = '';
	let disabled = ''
	if (props.serviceGroupId === 0) {
		hiddenClass = ' hidden ';
		disabled = 'disabled'
	}
	let classes = "btn btn__delete-service-btn btn__delete-service-" + props.serviceGroupId + hiddenClass;

	return <button id={props.groupdId} onClick={props.deleteService} disabled={disabled} className = {classes}>X</button>


}

export default DeleteServiceGroupdBtn;
