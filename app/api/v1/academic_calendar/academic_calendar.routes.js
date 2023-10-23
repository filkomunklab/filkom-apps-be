//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const academicController = require("./academic_calendar.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------

//===================================================================
// @description     Create academic calendar
// @access          DOSEN_MK
router.post(
  "/academic-calendar",
  auth,
  academicController.createAcademicCalendar
);

//===================================================================
// @description     Get academic calendar
// @access          DOSEN_MK
router.get(
  "/academic-calendar/:id",
  auth,
  academicController.getAcademicCalendarById
);

//===================================================================
// @description     Get all academic calendar
// @access          DOSEN_MK
router.get(
  "/academic-calendar",
  auth,
  academicController.getAllAcademicCalendar
);
// //       mengubah tahun ajaran
// router.put("/academic-calendar/:id", auth, academicController.updateAcademicById);
// //       hapus tahun ajaran
// router.delete("/academic-calendar/:id", auth, academicController.deleteAcademicById);

module.exports = router;
