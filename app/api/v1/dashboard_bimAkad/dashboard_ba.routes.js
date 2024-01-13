const express = require("express");
const router = express.Router();
const dashboardController = require("./dashboard_ba.controller");
const { auth } = require("../../../middleware/auth");

//======================Dosen Pembimbing Statistic===================//

//total Active & InActive Student
router.get(
  "/dashboard/statistic/studentGuidance",
  dashboardController.getTotalStudentGuidance
);

//total Active Student
router.get(
  "/dashboard/statistic/studentGuidance/Active",
  dashboardController.getTotalActiveStudentGuidance
);

//total InActive Student
router.get(
  "/dashboard/statistic/studentGuidance/inActive",
  dashboardController.getTotalInActiveStudentGuidance
);

//========================Kaprodi Statistic==========================//

//Get All Major Student
router.get(
  "/dashboard/statistic/majorStudent",
  auth,
  dashboardController.getAllMajorStudent
);

//Get All Active Student
router.get(
  "/dashboard/statistic/majorStudent/Active",
  auth,
  dashboardController.getAllTotalActiveMajorStudent
);

//Get All InActive Student
router.get(
  "/dashboard/statistic/majorStudent/inActive",
  auth,
  dashboardController.getAllTotalInActiveMajorStudent
);

//==========================General===================================//
//Get All category Certificate
router.get(
  "/dashboard/statistc/categoryCertificate",
  auth,
  dashboardController.getAllCertificateCategory
);

//Get All Active & InActive Major Student
router.get(
  "/dashboard/statistic/majorStudent/arrivalYear",
  auth,
  dashboardController.getAllTotalMajorStudent
);
//==========================Dekan Statistic==========================//

//total of All faculty Student
router.get(
  "/dashboard/statistic/faculty",
  auth,
  dashboardController.getTotalAllFacultyStudent
);

//total of All active faculty Student
router.get(
  "/dashboard/statistic/faculty/active",
  auth,
  dashboardController.getTotalAllActiveFacultyStudent
);

//total of All In-Active Faculty Student
router.get(
  "/dashboard/statistic/faculty/inActive",
  auth,
  dashboardController.getTotalAllInActiveFacultyStudent
);
module.exports = router;
