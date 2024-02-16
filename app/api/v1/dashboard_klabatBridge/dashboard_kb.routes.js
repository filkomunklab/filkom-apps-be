const express = require("express");
const router = express.Router();
const dashboardController = require("./dashboard_kb.controller");
const { auth } = require("../../../middleware/auth");

router.get("/dashboard/statistic", auth, dashboardController.getAllStatistic);

module.exports = router;
