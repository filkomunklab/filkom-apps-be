const express = require("express");
const router = express.Router();
const dashboardController = require("./dashboard_kb.controller");

router.get("/dashboard/totalAlumni", dashboardController.getTotalAlumni);
router.get("/dashboard/totalAlumniIF", dashboardController.getTotalAlumniIF);
router.get("/dashboard/totalAlumniSI", dashboardController.getTotalAlumniSI);
router.get(
  "/dashboard/distribusiAlumni",
  dashboardController.getDistribusiAlumni
);
router.get("/dashboard/statistic", dashboardController.getAllStatistic);

module.exports = router;
