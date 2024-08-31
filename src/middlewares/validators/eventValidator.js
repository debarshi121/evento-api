const Joi = require("joi");
const ApiError = require("../../utils/ApiError");
const validationErrorsFormatter = require("../../utils/validationErrorsFormatter");

const createEventValidator = (req, res, next) => {
	const createEventSchema = Joi.object({
		title: Joi.string().max(255).required().messages({
			"string.base": "Title must be a string",
			"string.max": "Title must be at most 255 characters long",
			"any.required": "Title is required",
		}),
		description: Joi.string().required().messages({
			"string.base": "Description must be a string",
			"any.required": "Description is required",
		}),
		bannerUrl: Joi.string().uri().required().messages({
			"string.base": "Banner URL must be a string",
			"string.uri": "Banner URL must be a valid URI",
			"any.required": "Banner URL is required",
		}),
		videoUrl: Joi.string().uri().optional().allow(null, "").messages({
			"string.base": "Video URL must be a string",
			"string.uri": "Video URL must be a valid URI",
		}),
		venue: Joi.string().required().messages({
			"string.base": "Venue must be a string",
			"any.required": "Venue is required",
		}),
		startDate: Joi.date().required().messages({
			"date.base": "Start date must be a valid date",
			"any.required": "Start date is required",
		}),
		endDate: Joi.date().optional().allow(null).messages({
			"date.base": "End date must be a valid date",
		}),
		entryFee: Joi.number().integer().min(0).required().messages({
			"number.base": "Entry fee must be a number",
			"number.integer": "Entry fee must be an integer",
			"number.min": "Entry fee must be at least 0",
			"any.required": "Entry fee is required",
		}),
		latitude: Joi.number().required().messages({
			"number.base": "Latitude must be a number",
			"any.required": "Latitude is required",
		}),
		longitude: Joi.number().required().messages({
			"number.base": "Longitude must be a number",
			"any.required": "Longitude is required",
		}),
		organizerName: Joi.string().required().messages({
			"string.base": "Organizer name must be a string",
			"any.required": "Organizer name is required",
		}),
		organizerEmail: Joi.string().email().required().messages({
			"string.base": "Organizer email must be a string",
			"string.email": "Organizer email must be a valid email address",
			"any.required": "Organizer email is required",
		}),
		organizerPhone: Joi.string().required().messages({
			"string.base": "Organizer phone must be a string",
			"any.required": "Organizer phone is required",
		}),
		categories: Joi.array()
			.items(
				Joi.number().integer().required().messages({
					"number.base": "Category ID must be a number",
					"number.integer": "Category ID must be an integer",
					"any.required": "Category ID is required",
				}),
			)
			.required()
			.messages({
				"array.base": "Categories must be an array",
				"any.required": "Categories are required",
			}),
	});

	const {error} = createEventSchema.validate(req.body);

	if (error) throw new ApiError(422, "Received data is not valid", validationErrorsFormatter(error));

	return next();
};

const updateEventValidator = (req, res, next) => {
	const updateEventSchema = Joi.object({
		title: Joi.string().max(255).optional().messages({
			"string.base": "Title must be a string",
			"string.max": "Title must be at most 255 characters long",
			"any.required": "Title is required",
		}),
		slug: Joi.string().optional().messages({
			"string.base": "Slug must be a string",
			"any.required": "Slug is required",
		}),
		description: Joi.string().optional().messages({
			"string.base": "Description must be a string",
			"any.required": "Description is required",
		}),
		bannerUrl: Joi.string().uri().optional().messages({
			"string.base": "Banner URL must be a string",
			"string.uri": "Banner URL must be a valid URI",
			"any.required": "Banner URL is required",
		}),
		videoUrl: Joi.string().uri().optional().allow(null, "").messages({
			"string.base": "Video URL must be a string",
			"string.uri": "Video URL must be a valid URI",
		}),
		venue: Joi.string().optional().messages({
			"string.base": "Venue must be a string",
			"any.required": "Venue is required",
		}),
		startDate: Joi.date().optional().messages({
			"date.base": "Start date must be a valid date",
			"any.required": "Start date is required",
		}),
		endDate: Joi.date().optional().allow(null).messages({
			"date.base": "End date must be a valid date",
		}),
		entryFee: Joi.number().integer().min(0).optional().messages({
			"number.base": "Entry fee must be a number",
			"number.integer": "Entry fee must be an integer",
			"number.min": "Entry fee must be at least 0",
			"any.required": "Entry fee is required",
		}),
		latitude: Joi.number().optional().messages({
			"number.base": "Latitude must be a number",
			"any.required": "Latitude is required",
		}),
		longitude: Joi.number().optional().messages({
			"number.base": "Longitude must be a number",
			"any.required": "Longitude is required",
		}),
		organizerName: Joi.string().optional().messages({
			"string.base": "Organizer name must be a string",
			"any.required": "Organizer name is required",
		}),
		organizerEmail: Joi.string().email().optional().messages({
			"string.base": "Organizer email must be a string",
			"string.email": "Organizer email must be a valid email address",
			"any.required": "Organizer email is required",
		}),
		organizerPhone: Joi.string().optional().messages({
			"string.base": "Organizer phone must be a string",
			"any.required": "Organizer phone is required",
		}),
		categories: Joi.array()
			.items(
				Joi.number().integer().optional().messages({
					"number.base": "Category ID must be a number",
					"number.integer": "Category ID must be an integer",
					"any.required": "Category ID is required",
				}),
			)
			.optional()
			.messages({
				"array.base": "Categories must be an array",
				"any.required": "Categories are required",
			}),
	});

	const {error} = updateEventSchema.validate(req.body);

	if (error) throw new ApiError(422, "Received data is not valid", validationErrorsFormatter(error));

	return next();
};

module.exports = {
	createEventValidator,
	updateEventValidator,
};
