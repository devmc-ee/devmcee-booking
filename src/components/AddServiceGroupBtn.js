import React from "react";

const AddServiceGroupBtn =({dispatch,state})=>{
	console.log('AddServiceGroupBtn state',state)
	return (
		<button id = "addServiceGroup"

			onClick = {e => {
				e.preventDefault();
				dispatch({type: 'addServiceGroup'})
			}}>
			Add service
		</button>
	)

}
export default AddServiceGroupBtn
