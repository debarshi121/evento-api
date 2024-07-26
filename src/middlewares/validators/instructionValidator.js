const Joi = require("joi");
const ApiError = require("../../utils/ApiError");
const validationErrorsFormatter = require("../../utils/validationErrorsFormatter");

const createInstructionValidator = (req, res, next) => {
	const schema = Joi.object({
		eventId: Joi.number().required().messages({
			"number.base": "Event ID must be a number",
			"any.required": "Event ID is required",
		}),
		instructions: Joi.array()
			.items(
				Joi.string().max(255).messages({
					"string.max": "Each instruction must be at most 255 characters long",
				}),
			)
			.required()
			.messages({
				"array.base": "Instructions must be an array",
				"any.required": "Instructions are required",
			}),
	});

	const {error} = schema.validate(req.body);

	if (error) throw new ApiError(422, "Received data is not valid", validationErrorsFormatter(error));

	return next();
};

module.exports = {
	createInstructionValidator,
};
