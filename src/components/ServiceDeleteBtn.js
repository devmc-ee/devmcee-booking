import React from "react";

const ServiceDeleteBtn= ({state, dispatch, value, id}) =>{
	return <button id={id} value = {value}
		onClick={e=>{dispatch({
			type: 'deleteServiceGroup',
			payload: {
				value: e.target.value,
			}
		})}}>X</button>

}

export default ServiceDeleteBtn;
