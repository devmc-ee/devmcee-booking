import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import {Field, useFormikContext} from "formik";
import {Typography, List, ListItem, ListItemText, Divider, Grid} from "@material-ui/core";
import {TextField} from "formik-material-ui";
import {SERVICES, SERVICE_OPTIONS, SERVICE_OPTIONS_NAMES, SERVICE_PRICES, SETTINGS, T} from '../../DATA'

const useStyles = makeStyles((theme) => ({
	listItem: {
		padding: theme.spacing(0, 0, 1),
	},
	subtitle: {
		padding: theme.spacing(1, 0, 0),
	},
	total: {
		fontWeight: 700,
	},
	title: {
		marginTop: theme.spacing(1),
	},
	comments: {
		margin: theme.spacing(1, 0)
	},
	discountedPrice: {
		color: 'red',
		fontWeight: 700,
	}
}));

const BookingSummary = () => {
	const locale = SETTINGS.locale;
	const [callingCode, setCallingCode] = useState('');
	const classes = useStyles();
	const {services,  appointment, contacts, payment} = useFormikContext().values;

	const {forAnother, anotherName, countryCode} = contacts;
	const {contactBillingDetails, contactBillingHeaders} = T.bookingSummary;
	let servicesTotalCost = 0;
	useEffect(() => {
		let url = `https://restcountries.eu/rest/v2/alpha/${countryCode}?fields=callingCodes`;
		fetch(url)
			.then(res => res.json())
			.then(res => {
				if (!res.hasOwnProperty('status')) {
					if (res.hasOwnProperty('callingCodes')
						&& (res.callingCodes[0] !== callingCode)) {
						setCallingCode(res.callingCodes[0]);
					}
				}
			});
	}, [callingCode, countryCode]);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={5}>
				<Typography variant="h6" gutterBottom align="left">
					{T.bookingSummary.appointment.header[locale]}
				</Typography>

				<Typography className={classes.subtitle} variant="subtitle2" gutterBottom align="left">
					{T.bookingSummary.services.header[locale]}
				</Typography>

				<Divider variant="inset"/>

				<List disablePadding>
					{services.map(({serviceBase, serviceOption}) => (
						<ListItem className={classes.listItem} key={serviceOption}>
							<ListItemText
								primary={SERVICES[serviceBase][locale]}
								secondary={SERVICE_OPTIONS_NAMES[SERVICE_OPTIONS[serviceBase][serviceOption]][locale]}/>
							<Typography variant="body2">
								{SERVICE_PRICES[serviceOption].discountedPrice > 0
									? <span className={classes.discountedPrice}>
									{SERVICE_PRICES[serviceOption].discountedPrice + '€'}
									</span>
									: SERVICE_PRICES[serviceOption].price + '€'}
							</Typography>
						</ListItem>
					))}
					<Divider variant="inset"/>
					<ListItem className={classes.listItem}>
						<ListItemText primary={T.bookingSummary.services.total[locale]}/>
						<Typography variant="subtitle1" className={classes.total}>
							{servicesTotalCost}€
						</Typography>
					</ListItem>
				</List>

				<List disablePadding>
					<Typography className={classes.subbtitle} align="left" variant="subtitle2">
						{T.bookingSummary.appointment.subbtitle[locale]}
					</Typography>
					<ListItem className={classes.listItem}>
						<ListItemText
							primary={moment(appointment.date).format('Do MMM, (dddd)') + ' ' + appointment.time}/>
					</ListItem>

					{((true === forAnother) || ('true' === forAnother))
					&& (<Typography className={classes.subbtitle} align="left" variant="subtitle2">
						{T.bookingSummary.appointment.anotherName[locale]}
					</Typography>)}

					{((true === forAnother) || ('true' === forAnother))
					&& (<ListItem className={classes.listItem}>
						<ListItemText
							primary={anotherName}/>
					</ListItem>)}
				</List>
			</Grid>

			<Grid item xs={12} sm={1}> <Divider variant="middle" orientation="vertical"/></Grid>

			<Grid item xs={12} sm={6}>
				<List disablePadding>

					<Typography variant="h6" gutterBottom align="left">
						{contactBillingHeaders.header[locale]}
					</Typography>

					{Object.keys(contactBillingDetails).map((key) =>
						<div key={key}>
							<Typography className={classes.subbtitle} align="left" variant="subtitle2">
								{contactBillingDetails[key][locale]}
							</Typography>
							<ListItem className={classes.listItem}>
								{key === 'paymentMethod'
									? <ListItemText
										primary={SETTINGS.payment.methods[payment.method].name[locale]
										+ ` ${payment.addInfo}`}/>
									: (key === 'telephone'
										? <ListItemText
											primary={(callingCode.length > 0 ? `(+${callingCode}) ` : '')
											+ contacts.telephone}/>
										: <ListItemText
											primary={contacts[key]}/>)}
							</ListItem>
						</div>
					)}
					<Divider/>
				</List>

				<Field
					component={TextField}
					className={classes.comments}
					id="comments"
					name="comments"
					label="Comments"
					multiline
					rows={4}
					fullWidth
					variant="outlined"
				/>
			</Grid>
		</Grid>
	)
};

export default BookingSummary;
