const {ApiResponse} = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const prisma = require("../prisma");
const {UserRoles, EventStatus} = require("../utils/constants");

const getAllEmergencyInfo = asyncHandler(async (req, res) => {
	const eventId = parseInt(req.params.eventId);

	const emergencyInfos = await prisma.emergencyInfo.findMany({
		where: {
			eventId,
		},
	});

	return res.status(200).json(new ApiResponse(200, {emergencyInfos}));
});

const createUpdateEmergencyInfo = asyncHandler(async (req, res) => {
	const {eventId, emergencyInfo} = req.body;
	const event = await prisma.event.findUnique({where: {id: eventId}});

	if (event?.userId !== req.user?.id) throw new ApiError(403, "You don't have permission to do this!");

	await prisma.emergencyInfo.deleteMany({
		where: {
			eventId,
		},
	});

	const dataToInsert = emergencyInfo.map((item) => {
		return {
			eventId,
			...item,
		};
	});

	const results = await prisma.$transaction(
		dataToInsert.map((data) =>
			prisma.emergencyInfo.create({
				data,
				select: {
					title: true,
					description: true,
				},
			}),
		),
	);

	return res.status(200).json(new ApiResponse(200, {emergencyInfos: results}, "Event created successfully"));
});

module.exports = {
	getAllEmergencyInfo,
	createUpdateEmergencyInfo,
};
