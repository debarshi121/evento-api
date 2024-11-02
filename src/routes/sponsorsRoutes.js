const express = require("express");
const {verifyJWT, verifyRoles} = require("../middlewares/authMiddleware");
const {UserRolesEnum} = require("../utils/constants");
const {createUpdateSponsors} = require("../controllers/sponsorsController");
const {createSponsorsValidator} = require("../middlewares/validators/sponsorsValidator");

const router = express.Router();

router.post("/", verifyJWT, createSponsorsValidator, createUpdateSponsors);

module.exports = router;
