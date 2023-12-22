const express = require("express");
const router = express.Router();
const dashboardController = require("./dashboard_ba.controller");

//======================Dosen Pembimbing Statistic===================//

//========================Kaprodi Statistic==========================//

//Get All Major Student
router.get(
  "/dashboard/statistic/majorStudent",
  dashboardController.getAllMajorStudent
);

//Get All Active Student
router.get(
  "/dashboard/statistic/majorStudent/Active",
  dashboardController.getAllTotalActiveMajorStudent
);

//Get All InActive Student
router.get(
  "/dashboard/statistic/majorStudent/inActive",
  dashboardController.getAllTotalInActiveMajorStudent
);

//==========================General===================================//
//Get All category Certificate
router.get(
  "/dashboard/statistc/categoryCertificate",
  dashboardController.getAllCertificateCategory
);

//Get All Active & InActive Major Student
router.get(
  "/dashboard/statistic/majorStudent/arrivalYear",
  dashboardController.getAllTotalMajorStudent
);
//==========================Dekan Statistic==========================//

//total of All faculty Student
router.get(
  "/dashboard/statistic/faculty",
  dashboardController.getTotalAllFacultyStudent
);

//total of All active faculty Student
router.get(
  "/dashboard/statistic/faculty/active",
  dashboardController.getTotalAllActiveFacultyStudent
);

//total of All In-Active Faculty Student
router.get(
  "/dashboard/statistic/faculty/inActive",
  dashboardController.getTotalAllInActiveFacultyStudent
);
module.exports = router;
