const express = require("express");
const router = express.Router();
const academicConsController = require("./academic_consultation.controller");
const { auth } = require("../../../middleware/auth");

module.exports = router;
