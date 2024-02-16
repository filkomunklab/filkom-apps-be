const express = require("express");
const activityController = require("./activity.controller");
const router = express.Router();
const { auth } = require("../../../middleware/auth");

router.post("/activity", auth, activityController.createActivity);

router.get(
  "/activity/detail/:activityId",
  auth,
  activityController.detailActivity
);

router.get("/activity/student-list", auth, activityController.getStudentList);

router.get(
  "/activity/history-for-student/:studentNim",
  auth,
  activityController.getHistoryForStudent
);

router.get(
  "/activity/history-for-advisor/:employeeNik",
  auth,
  activityController.getHistoryForAdvisor
);

router.get("/activity/current/:id", auth, activityController.getRecentActivity);

router.patch(
  "/activity/take-attendance/:activityId",
  auth,
  activityController.takeAttendance
);

module.exports = router;
