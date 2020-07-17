import {Prices} from "./SERVICES_DATA";

export const getPrices = codes => {
	return codes.map(code => {
		if (Prices[code])
			return Prices[code].price
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

export const updatePrices=(service,skipIndex)=>{
	//console.log('updatePrices',service)

	let totalServicesPrice = 0
	let selectedServicesPrices = {}

	if (service && skipIndex) {
		for (let key in service) {
			if (Prices[service[key]] && key.toString()!==skipIndex.toString()) {
				totalServicesPrice += Prices[service[key]].price
				selectedServicesPrices[key] =Prices[service[key]].price
			}else{
				selectedServicesPrices[key] =''
			}
		}

	}else{
		for (let key in service) {
			if (Prices[service[key]]) {
				totalServicesPrice += Prices[service[key]].price
				selectedServicesPrices[key] =Prices[service[key]].price
			}else{
				selectedServicesPrices[key] =''
			}
		}
	}
	//console.log(selectedServicesPrices)
	return {
		totalServicesPrice: totalServicesPrice,
		selectedServicesPrices: selectedServicesPrices
	}

}
