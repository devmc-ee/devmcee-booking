# Booking form
This app is a booking form of a thai massage salon. 
It allows to select a number of services and their options,
select avaialble date and time for an appointment, enter
contact details (incl. another person name, if booking is for another person),
and selecting payment options. The final step is review of the booking details and 
confirmation.


![devmcee-booking sample view](devmcee-booking.gif "Booking app, Reactjs")

The app is built with **React.js** by using the hooks 
 technique. The forms are build mostly with [Formik](https://formik.org/docs/overview) library. 
 The design and form visual interactions are provided with [Material-UI](https://material-ui.com/) React library.
Form validation is build (mostly) with [Yup](https://github.com/jquense/yup) validationSchemas, 
which integration is supportded by Formik forms.

The app is supposed to be a part of a Wordpress plugin, that fetches data (configuration, settings, 
services info, working time and etc ) from the backend. Meanwhile static JSON objects
 (imported from js) are used as a data source.  

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Start
Clone the repository: 

### `git clone https://github.com/devmc-ee/devmcee-booking.git`

Change directory to devmcee-booking

### `cd devmcee-booking`

Install dependencies

### `yarn`

Start the app with the start script (see below)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
