const express = require("express");
const router = express.Router();
const lecturerController = require("./lecturer.controller");

router.get("/lecturer", lecturerController.getAllLecturer);

module.exports = router;
