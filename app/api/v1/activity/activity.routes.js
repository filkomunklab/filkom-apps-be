const express = require("express");
const activityController = require("./activity.controller");
const router = express.Router();

router.post("/activity", activityController.createActivity);

router.get("/activity/detail/:activityId", activityController.detailActivity);

router.patch(
  "/activity/take-attendance/:activityId",
  activityController.takeAttendance
);

module.exports = router;
