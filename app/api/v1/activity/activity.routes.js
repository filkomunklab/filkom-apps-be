const express = require("express");
const activityController = require("./activity.controller");
const router = express.Router();

router.post("/activity/:nim", activityController.crateActivity);
router.get("/activity/:activityId", activityController.detailActivity);

module.exports = router;
