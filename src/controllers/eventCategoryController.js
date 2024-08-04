const {ApiResponse} = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const prisma = require("../prisma");
const {UserRoles, EventStatus} = require("../utils/constants");

const getAllCategories = asyncHandler(async (req, res) => {
	const categories = await prisma.category.findMany({select: {id: true, title: true}});
	return res.status(200).json(new ApiResponse(200, {categories}));
});

module.exports = {getAllCategories};
