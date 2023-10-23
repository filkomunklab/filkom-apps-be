//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const classroomController = require("./classroom.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------

//===================================================================
// @description     Create classroom
// @access          DOSEN_MK
router.post("/classroom", auth, classroomController.createClassroom);

//===================================================================
// @description     Get list classroom
// @access          DOSEN_MK
router.get("/classroom/list", auth, classroomController.getListClassroom);

//===================================================================
// @description     Get classroom by id
// @access          DOSEN_MK
router.get("/classroom/:id", auth, classroomController.getClassroomById);

//===================================================================
// @description     Get all classroom
// @access          DOSEN_MK
router.get("/classroom", auth, classroomController.getAllClassroom);

//===================================================================
// @description     Input student into classroom
// @access          DOSEN_MK
router.post(
  "/classroom/insert-student",
  auth,
  classroomController.inputStudent
);

//===================================================================
// @description     Delete classroom by id
// @access          DOSEN_MK
router.delete("/classroom/:id", auth, classroomController.deleteClassroomById);

//===================================================================
// @description     Delete student by id
// @access          DOSEN_MK
router.delete(
  "/classroom/delete-student/:id",
  auth,
  classroomController.deleteStudentById
);

module.exports = router;
