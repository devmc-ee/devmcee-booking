import React from "react";
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';

const AddServiceGroupBtn =({dispatch,state})=>{
	const handleClick=e => {
		e.preventDefault();
		dispatch({type: 'addServiceGroup'})
	}
	return (
		<Button id = "addServiceGroup"

			onClick = {handleClick}>
			<AddIcon /> Add service
		</Button>
	)

}
export default AddServiceGroupBtn
