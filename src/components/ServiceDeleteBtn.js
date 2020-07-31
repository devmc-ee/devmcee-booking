import React from "react";
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton, Button } from '@material-ui/core';

const ServiceDeleteBtn= ({state, dispatch, value, id}) =>{
	const handleClick=value=> e=>{dispatch({
		type: 'deleteServiceGroup',
		payload: {
			value: value,
		}
	})}
	return <Button  id={id} value = {value}
		onClick={handleClick(value)}><ClearIcon /></Button >

}

export default ServiceDeleteBtn;
