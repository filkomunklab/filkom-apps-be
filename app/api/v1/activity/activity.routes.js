const express = require("express");
const activityController = require("./activity.controller");
const router = express.Router();

router.post("/activity", activityController.createActivity);

router.get("/activity/detail/:activityId", activityController.detailActivity);

router.get("/activity/student-list", activityController.getStudentList);

router.get(
  "/activity/history-for-student/:studentNim",
  activityController.getHistoryForStudent
);

router.get(
  "/activity/history-for-advisor/:employeeNik",
  activityController.getHistoryForAdvisor
);

router.get("/activity/current/:id", activityController.getRecentActivity);

router.patch(
  "/activity/take-attendance/:activityId",
  activityController.takeAttendance
);

module.exports = router;
