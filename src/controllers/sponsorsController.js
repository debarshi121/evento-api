const {ApiResponse} = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const prisma = require("../prisma");
const {UserRoles, EventStatus} = require("../utils/constants");

const createUpdateSponsors = asyncHandler(async (req, res) => {
	const {eventId, sponsors} = req.body;
	const event = await prisma.event.findUnique({where: {id: eventId}});

	if (event?.userId !== req.user?.id) throw new ApiError(403, "You don't have permission to do this!");

	await prisma.sponsors.deleteMany({
		where: {
			eventId,
		},
	});

	const dataToInsert = sponsors.map((item) => {
		return {
			eventId,
			...item,
		};
	});

	const results = await prisma.$transaction(
		dataToInsert.map((data) =>
			prisma.sponsors.create({
				data,
				select: {
					bannerUrl: true,
					redirectUrl: true,
				},
			}),
		),
	);

	return res.status(200).json(new ApiResponse(200, {sponsors: results}, "Event created successfully"));
});

module.exports = {
	createUpdateSponsors,
};
