const express = require("express");
const router = express.Router();
const dashboardController = require("./dashboard_kb.controller");

router.get("/dashboard/statistic", dashboardController.getAllStatistic);

module.exports = router;
