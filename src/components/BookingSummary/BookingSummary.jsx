import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import {Field, useFormikContext} from "formik";
import {Typography, List, ListItem, ListItemText, Divider, Grid, Button} from "@material-ui/core";
import {TextField} from "formik-material-ui";
import {SERVICES, SERVICE_OPTIONS, SERVICE_OPTIONS_NAMES, SERVICE_PRICES, SETTINGS, T} from '../../DATA';
import {getTotalPrice} from '../../utils'

const useStyles = makeStyles((theme) => ({
	listItem: {
		padding: theme.spacing(0, 0, 1),
	},
	subtitle: {
		padding: theme.spacing(1, 0, 0),
	},
	total: {
		fontWeight: 700,
		padding: theme.spacing(1, 0)
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

const BookingSummary = ({setActiveStep}) => {
	const lang = SETTINGS.locale;
	const [callingCode, setCallingCode] = useState('');
	const classes = useStyles();
	const {services,  appointment, contacts, payment} = useFormikContext().values;

	const {forAnother, anotherName, countryCode} = contacts;
	const {contactBillingDetails, contactBillingHeaders} = T.bookingSummary;
	const __services = T.bookingSummary.services;
	const __appointment=  T.bookingSummary.appointment;
	const servicesTotalCost = getTotalPrice([...services].map(service => service.serviceOption));

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
					{__appointment.header[lang]}
				</Typography>

				<Typography className={classes.subtitle} variant="subtitle2" gutterBottom align="left">
					{__services.header[lang]}
				</Typography>

				<Divider variant="inset"/>

				<List disablePadding>
					{services.map(({serviceBase, serviceOption}) => (
						<ListItem className={classes.listItem} key={serviceOption}>
							<ListItemText
								primary={SERVICES[serviceBase][lang]}
								secondary={SERVICE_OPTIONS_NAMES[SERVICE_OPTIONS[serviceBase][serviceOption]][lang]}/>
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
						<ListItemText primary=""/>
						<Typography variant="subtitle1" className={classes.total}>
							 {`${__services.total[lang]} ${servicesTotalCost}€`}
						</Typography>
					</ListItem>
					<Divider variant="inset"/>
				</List>

				<List disablePadding>
					<Typography className={classes.subbtitle} align="left" variant="subtitle2">
						{T.bookingSummary.appointment.subbtitle[lang]}
					</Typography>
					<ListItem className={classes.listItem}>
						<ListItemText
							primary={moment(appointment.date).format('Do MMM, (dddd)') + ' ' + appointment.time}/>
					</ListItem>

					{((true === forAnother) || ('true' === forAnother))
					&& (<Typography className={classes.subbtitle} align="left" variant="subtitle2">
						{T.bookingSummary.appointment.anotherName[lang]}
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
						{contactBillingHeaders.header[lang]}
					</Typography>

					{Object.keys(contactBillingDetails).map((key) =>
						<div key={key}>
							<Typography className={classes.subbtitle} align="left" variant="subtitle2">
								{contactBillingDetails[key][lang]}
							</Typography>
							<ListItem className={classes.listItem}>
								{key === 'paymentMethod'
									? <ListItemText
										primary={SETTINGS.payment.methods[payment.method].name[lang]
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
			<Grid item container justify="flex-end" xs={12}>
				<Button
					type="submit" onClick={()=>setActiveStep(prev=> prev +1)}
					href="" variant="contained" color="primary" disableRipple={false} > Submit </Button>
			</Grid>

		</Grid>
	)
};

export default BookingSummary;
