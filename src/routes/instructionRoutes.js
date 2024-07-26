const express = require("express");
const {verifyJWT, verifyRoles} = require("../middlewares/authMiddleware");
const {UserRolesEnum} = require("../utils/constants");
const { createUpdateInstruction } = require("../controllers/instructionController");
const { createInstructionValidator } = require("../middlewares/validators/instructionValidator");

const router = express.Router();

router.post("/", verifyJWT, createInstructionValidator, createUpdateInstruction);

module.exports = router;
