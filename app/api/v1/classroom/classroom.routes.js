//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const classroomController = require("./classroom.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------
//       create kelas baru
router.post("/classroom", auth, classroomController.createClassroom);
//       view list kelas
router.get("/classroom/list", auth, classroomController.getListClassroom);
//       view kelas
router.get("/classroom/:id", auth, classroomController.getClassroomById);
//       view all kelas
router.get("/classroom", auth, classroomController.getAllClassroom);
//       input student kedalam kelas
router.post("/classroom/insert-student", auth, classroomController.inputStudent);
//       delete kelas
router.delete("/classroom/:id", auth, classroomController.deleteClassroomById);
//       delete mahasiswa skripsi
router.delete("/classroom/delete-student/:id", auth, classroomController.deleteStudentById);

module.exports = router;