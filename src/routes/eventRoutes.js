const express = require("express");
const {getSingleEvent, getAllEvents, uploadEventBanner, createEvent, createCheckoutSession, updateEvent} = require("../controllers/eventController");
const {verifyJWT, verifyRoles} = require("../middlewares/authMiddleware");
const {UserRolesEnum} = require("../utils/constants");
const upload = require("../middlewares/multerMiddleware");
const {createEventValidator, updateEventValidator} = require("../middlewares/validators/eventValidator");

const router = express.Router();

router.get("/", verifyJWT, getAllEvents);
router.post("/", verifyJWT, createEventValidator, createEvent);
router.post("/checkout-session", createCheckoutSession);
router.get("/:id", getSingleEvent);
router.put("/:id", updateEventValidator, updateEvent);
router.post("/upload-banner", upload.single("banner"), uploadEventBanner);

module.exports = router;
