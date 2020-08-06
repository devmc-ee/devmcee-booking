import {SERVICE_PRICES, SERVICE_OPTIONS} from "./DATA";


export const getPrices = codes => {
	return codes.map(code => {
		if (SERVICE_PRICES[code]) {
			return SERVICE_PRICES[code].discountedPrice > 0 ?
				SERVICE_PRICES[code].discountedPrice :
				SERVICE_PRICES[code].price
		}

		return false
	})

}

export const totalPriceCalc = prices => {
	let sum = 0;
	for (let i in prices) {
		sum += prices[i] ? prices[i] : 0;
	}
	return sum;
};

export const getTotalPrice = codes => {
	const prices = getPrices(codes);
	return totalPriceCalc(prices);
}

export const updatePrices = (service, skipIndex) => {
	//console.log('updatePrices',service)

	let totalServicesPrice = 0
	let selectedServicesPrices = {}

	if (service && skipIndex) {
		for (let key in service) {
			if (SERVICE_PRICES[service[key]] && key.toString() !== skipIndex.toString()) {
				totalServicesPrice += SERVICE_PRICES[service[key]].price
				selectedServicesPrices[key] = SERVICE_PRICES[service[key]].price
			} else {
				selectedServicesPrices[key] = ''
			}
		}

	} else {
		for (let key in service) {
			if (SERVICE_PRICES[service[key]]) {
				totalServicesPrice += SERVICE_PRICES[service[key]].price
				selectedServicesPrices[key] = SERVICE_PRICES[service[key]].price
			} else {
				selectedServicesPrices[key] = ''
			}
		}
	}
	//console.log(selectedServicesPrices)
	return {
		totalServicesPrice: totalServicesPrice,
		selectedServicesPrices: selectedServicesPrices
	}

}

export const getTotalDuration = services => {
	//service: [{serviceBase: string, serviceOption: string}, ...]
	let durations = [];
	if (services && services.length > 0) {
		durations = services.map(service => {
			return SERVICE_OPTIONS[service.serviceBase][service.serviceOption]
		});
		return durations.reduce((accum, current) => accum + current);
	}
	return 0;

}
