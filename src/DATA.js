export const SERVICES = {
	th: {
		et: "Taimassaaž",
		en: "Thai massage",
		ru: "Тайский массаж"
	},
	oil: {
		et: "Tai õlimassaaž",
		en: "Thai oil massage",
		ru: "Масляный массаж"
	},
	f: {
		et: "Jalamassaaž",
		en: "Foot (legs) massage",
		ru: "Массаж ног"
	},
	h: {
		et: "Peamassaaž",
		en: "Head massage",
		ru: "Массаж плеч и головы"
	},
	b: {
		et: "Seljamassaaž",
		en: "Back massage",
		ru: "Массаж спины"
	}
};
export const SERVICE_OPTIONS = {
	th: {th1: 60, th15: 90, th2: 120},
	oil: {oil1: 60, oil15: 90, oil2: 120},
	f: {f05: 30, f1: 60},
	h: {h05: 30},
	b: {b05: 30}
};

export const SERVICE_OPTIONS_NAMES = {
	30: {
		et: "30 min",
		en: "30 min",
		ru: "30 мин"
	},
	60: {
		et: "1 tund",
		en: "1 hour",
		ru: "1 час"
	},
	90: {
		et: "1,5 tundi",
		en: "1,5 hours",
		ru: "1,5 часа"
	},
	120: {
		et: "2 tundi",
		en: "2 hours",
		ru: "2 часа"
	}
};
export const SERVICE_OPTIONS_BASE_CODES = {
	th1: "th",
	th15: "th",
	th2: "th",
	oil1: "oil",
	oil15: "oil",
	oil2: "oil",
	f05: "f",
	f1: "f"
};

export const SERVICE_PRICES = {
	th1: {
		price: 45,
		discountedPrice: 35
	},
	th15: {
		price: 60,
		discountedPrice: 0
	},
	th2: {
		price: 75,
		discountedPrice: 0
	},
	oil1: {
		price: 45,
		discountedPrice: 0
	},
	oil15: {
		price: 60,
		discountedPrice: 0
	},
	oil2: {
		price: 75,
		discountedPrice: 0
	},
	f05: {
		price: 25,
		discountedPrice: 0
	},
	f1: {
		price: 40,
		discountedPrice: 0
	},
	h05: {
		price: 25,
		discountedPrice: 0
	},
	b05: {
		price: 30,
		discountedPrice: 0
	}
};

export const CALENDAR_SETTINGS = {
	maxAvailableDays: 30,
	disabledWeekDays: [1],
	workingTime: {
		start: '11:00',
		end: '21:00'
	},
	timeStep: 15,
	minimalBreak: 15,
	timeSlotGroups: [
		{
			start: '11:00',
			end: '16:00'
		},

		{
			start: '16:00',
			end: '21:00'
		}],
	locale: 'en'
};


