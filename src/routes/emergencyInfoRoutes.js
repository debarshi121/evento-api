const express = require("express");
const {createUpdateEmergencyInfo} = require("../controllers/emergencyInfoController");
const {verifyJWT, verifyRoles} = require("../middlewares/authMiddleware");
const {UserRolesEnum} = require("../utils/constants");
const {createEmergencyInfoValidator} = require("../middlewares/validators/emergencyInfoValidator");

const router = express.Router();

router.post("/", verifyJWT, createEmergencyInfoValidator, createUpdateEmergencyInfo);

module.exports = router;
