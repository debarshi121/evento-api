const express = require("express");
const {verifyJWT, verifyRoles} = require("../middlewares/authMiddleware");
const {UserRolesEnum} = require("../utils/constants");
const {getAllCategories} = require("../controllers/eventCategoryController");

const router = express.Router();

router.get("/", getAllCategories);

module.exports = router;
