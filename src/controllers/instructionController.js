const {ApiResponse} = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const prisma = require("../prisma");
const {UserRoles, EventStatus} = require("../utils/constants");

const createUpdateInstruction = asyncHandler(async (req, res) => {
	const {eventId, instructions} = req.body;
	const event = await prisma.event.findUnique({where: {id: eventId}});

	if (event?.userId !== req.user?.id) throw new ApiError(403, "You don't have permission to do this!");

	await prisma.instruction.deleteMany({
		where: {
			eventId,
		},
	});

	const dataToInsert = instructions.map((item) => {
		return {
			eventId,
			title: item,
		};
	});

	const results = await prisma.$transaction(
		dataToInsert.map((data) =>
			prisma.instruction.create({
				data,
				select: {
					title: true,
				},
			}),
		),
	);

	return res.status(200).json(new ApiResponse(200, {instructions: results}, "Instructions saved successfully"));
});

module.exports = {
	createUpdateInstruction,
};
