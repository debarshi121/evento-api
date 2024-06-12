require("dotenv").config();

module.exports = {
	SERVER: {
		PORT: process.env.PORT || 8080,
	},
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
	ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
	REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
	WHITELIST: process.env.WHITELIST,
	STRIPE_SUCCESS_URL: process.env.STRIPE_SUCCESS_URL,
	STRIPE_CANCEL_URL: process.env.STRIPE_CANCEL_URL,
	STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};
