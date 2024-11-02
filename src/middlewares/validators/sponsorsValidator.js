const Joi = require("joi");
const ApiError = require("../../utils/ApiError");
const validationErrorsFormatter = require("../../utils/validationErrorsFormatter");

const createSponsorsValidator = (req, res, next) => {
	const sponsorsSchema = Joi.object({
		bannerUrl: Joi.string().uri().optional().messages({
			"string.base": "Banner URL must be a string",
			"string.uri": "Banner URL must be a valid URI",
			"any.required": "Banner URL is required",
		}),
		redirectUrl: Joi.string().uri().optional().allow("").messages({
			"string.base": "Redirect URL must be a string",
			"string.uri": "Redirect URL must be a valid URI",
		}),
	});

	const schema = Joi.object({
		eventId: Joi.number().required().messages({
			"number.base": "Event ID must be a number",
			"any.required": "Event ID is required",
		}),
		sponsors: Joi.array().items(sponsorsSchema).required().messages({
			"array.base": "Sponsors must be an array",
			"any.required": "Sponsors is required",
		}),
	});

	const {error} = schema.validate(req.body);

	if (error) throw new ApiError(422, "Received data is not valid", validationErrorsFormatter(error));

	return next();
};

module.exports = {
	createSponsorsValidator,
};
