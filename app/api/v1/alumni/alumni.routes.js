const express = require("express");
const router = express.Router();
const alumniController = require("./alumni.controller");

router.get("/alumni", alumniController.getAlumniList);

module.exports = router;
