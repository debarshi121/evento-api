const Joi = require("joi");
const ApiError = require("../../utils/ApiError");
const validationErrorsFormatter = require("../../utils/validationErrorsFormatter");

const createEmergencyInfoValidator = (req, res, next) => {
	const emergencyInfoSchema = Joi.object({
		title: Joi.string().max(255).required().messages({
			"string.base": "Title must be a string",
			"string.max": "Title must be at most 255 characters long",
			"any.required": "Title is required",
		}),
		description: Joi.string().max(1024).required().messages({
			"string.base": "Description must be a string",
			"string.max": "Description must be at most 1024 characters long",
			"any.required": "Description is required",
		}),
	});

	const schema = Joi.object({
		eventId: Joi.number().required().messages({
			"number.base": "Event ID must be a number",
			"any.required": "Event ID is required",
		}),
		emergencyInfo: Joi.array().items(emergencyInfoSchema).required().messages({
			"array.base": "Emergency info must be an array",
			"any.required": "Emergency info is required",
		}),
	});

	const {error} = schema.validate(req.body);

	if (error) throw new ApiError(422, "Received data is not valid", validationErrorsFormatter(error));

	return next();
};

module.exports = {
	createEmergencyInfoValidator,
};
