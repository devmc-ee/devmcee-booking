const ServicesData= {
	services: {
		'th': {

			code: 'th',
			name: {
				et: 'Taimassaaaž',
				en: 'Thai massage',
				ru: 'Тайский массаж'
			},
			options: {
				60: {
					code: 'th1',
					length: 60,


				},
				90: {
					code: 'th15',
					length: 90,
					price: 60,
					discountedPrice:0

				},
				120: {
					code: 'th2',
					length: 120,
					price: 75,
					discountedPrice:0

				}

			}

		},
		'oil': {

			code: 'oil',
			name: {
				et: 'Tai õlimassaaaž',
				en: 'Thai oil massage',
				ru: 'Масляный массаж'
			},
			options: {
				60: {
					code: 'oil1',
					length: 60,
					price: 45,
					discountedPrice:0

				},
				90: {
					code: 'oil15',
					length: 90,
					price: 60,
					discountedPrice:0
				},
				120: {
					code: 'oil2',
					length: 120,
					price: 75,
					discountedPrice:0
				}

			}

		},
		'f': {

			code: 'f',
			name: {
				et: 'Jalamassaaaž',
				en: 'Foot (legs) massage',
				ru: 'Массаж ног'
			},
			options: {
				30: {
					code: 'f05',
					length: 30,
					price: 25,
					discountedPrice:0

				},
				60: {
					code: 'f1',
					length: 60,
					price: 40,
					discountedPrice:0
				},

			}

		},

	},
	lengths: {
		30: {
			et: '30 min',
			en: '30 min',
			ru: '30 мин'

		},
		60: {
			et: '1 tund',
			en: '1 hour',
			ru: '1 час'

		},
		90:{
			et: '1,5 tundi',
			en: '1,5 hours',
			ru: '1,5 часа'
		},
		120: {
			et: '2 tundi',
			en: '2 hours',
			ru: '2 часа'
		}

	},
	bookingSettings:{
		step: 15,
		maxAvailableDays: 30,
		disabledDays:{
			daysOfWeek: [0],
		}

	},
	prices:{
		th1:{
			price: 45,
			discountedPrice:0
		},
		th15:{
			price: 60,
			discountedPrice:0
		},
		th2:{
			price: 75,
			discountedPrice:0
		},
		oil1:{
			price: 45,
			discountedPrice:0
		},
		oil15:{
			price: 60,
			discountedPrice:0
		},
		oil2:{
			price: 75,
			discountedPrice:0
		},
		f05:{
			price: 25,
			discountedPrice:0
		},
		f1:{
			price: 40,
			discountedPrice:0
		},

	},
	baseCodes:{
		th1: 'th',
		th15:'th',
		th2:'th',
		oil1:'oil',
		oil15:'oil',
		oil2:'oil',
		f05:'f',
		f1:'f'
	}
}
export default ServicesData

export const Prices = ServicesData.prices;
export const BookingSettings = ServicesData.bookingSettings;
export const ServiceLengths = ServicesData.lengths;
export const ServicesBaseCodes=ServicesData.baseCodes;
export const Services=ServicesData.services;


