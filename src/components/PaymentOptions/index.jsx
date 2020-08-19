import React from 'react';
import { Field, useFormikContext } from "formik";
import { TextField } from "formik-material-ui";
import { MenuItem } from "@material-ui/core";

const PaymentOptions = props => {
	const formik = useFormikContext();
	const {method} =formik.values.payment;
	const helpText = method => {
		switch (method) {
			case 'bank':
				return 'Invoice will be issued for making prepayment via bank transfer';
			case 'sportId':
				return 'Only SportId tickets are accepted';
			default:
				return ''


		}
	}
	return (
		<>
			<Field
				name={`payment.method`}
				id={`payment.method`}
				component={TextField}
				as="select"
				select={true}
				type="text"
				variant="standard"
				label="Select payment method"
				placeholder="Services..."
				helperText={helpText(method)}
				fullWidth
			>

				<MenuItem value="salon">Pay in salon (by cash/ card)</MenuItem>
				<MenuItem value="bank">Bank transfer (invoice)</MenuItem>
				<MenuItem value="sportId" >SportID (ticket)</MenuItem>
				<MenuItem value="giftCard" >Gift Card</MenuItem>
				<MenuItem value="other"  >Other</MenuItem>

			</Field>
			{}
		</>
	)
};
export default PaymentOptions;
