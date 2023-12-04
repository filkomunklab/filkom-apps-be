const express = require("express");
const activityController = require("./activity.controller");
const router = express.Router();

//create activity for student
router.post("/activity/:nim", activityController.crateActivity);

//get detail activity information
router.get("/activity/:activityId", activityController.detailActivity);

//student post grades last semester
router.post("/activity/grades/:nim", activityController.gradesSubmission);

module.exports = router;
