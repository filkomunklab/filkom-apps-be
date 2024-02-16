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

//===================================================================
// @description     Get academic calendar list
// @access          DOSEN_MK
router.get(
  "/academic-calendar-list",
  auth,
  academicController.getAcademicCalendarList
);

//===================================================================
// @description     Update academic calendar
// @access          DOSEN_MK
router.put(
  "/academic-calendar/:id",
  auth,
  academicController.updateAcademicCalendaryId
);

//===================================================================
// @description     Delete academic calendar
// @access          DOSEN_MK
router.delete(
  "/academic-calendar/:id",
  auth,
  academicController.deleteAcademicCalendarById
);

module.exports = router;
