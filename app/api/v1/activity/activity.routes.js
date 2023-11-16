const express = require("express");
const activityController = require("./activity.controller");
const router = express.Router();

router.post("/activity", activityController.crateActivity);

module.exports = router;
