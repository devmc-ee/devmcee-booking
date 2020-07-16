import React from 'react';
//import axios from 'axios';
//import qs from 'qs';
import './App.css';

import Form from "./components/Form";
//const devmcee_booking = localStorage.getItem('devmcee_booking')
//get settings from localstorage
/*
const devmcee_booking_ajax_nonce = localStorage.getItem('devmcee_booking_ajax_nonce')
const devmcee_booking_ajaxurl = localStorage.getItem('devmcee_booking_ajaxurl')?'':'https://thai-massage.dev/wp-admin/admin-ajax.php'



var data={
	action: 'devmcee_booking_action',
	security:devmcee_booking_ajax_nonce,
	wpdocs_string: 'Hello World!'

}
axios.post(devmcee_booking_ajaxurl, qs.stringify(data))
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});
*/
function App() {
	return (
		<div className = "App">
			<header className = "App-header">
				<h1>Booking</h1>
				<div className = {"container"}>

					<Form name = "booking-form" method = "post" action = "" />


				</div>

			</header>
		</div>
	);
}

export default App;
