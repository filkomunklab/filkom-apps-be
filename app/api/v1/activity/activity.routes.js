const express = require("express");
const activityController = require("./activity.controller");
const router = express.Router();

//create activity for student
router.post(
  "/activity/allStudent/:nim",
  activityController.postActivityForAllStudent
);

//get detail activity information
router.get("/activity/detail/:activityId", activityController.detailActivity);

module.exports = router;
