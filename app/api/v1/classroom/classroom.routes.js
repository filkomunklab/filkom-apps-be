//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const classroomController = require("./classroom.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------
//       create kelas baru
router.post("/classroom", auth, classroomController.createClassroom);
// //       view kelas
// router.get("/classroom/:id", auth, classroomController.getClassroom);
//       view all kelas
router.get("/classroom", auth, classroomController.getAllClassroom);
//       input student kedalam kelas
router.post("/classroom/insert-student", auth, classroomController.inputStudent);
// //       update kelas
// router.put("/classroom", auth, classroomController.updateClassroom);
// //       delete kelas
// router.delete("/classroom", auth, classroomController.deleteClassroom);

module.exports = router;