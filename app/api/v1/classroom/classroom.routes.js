//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const classroomController = require("./classroom.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------
//       membuat kelas baru
router.post("/classroom", classroomController.createClassroom);
//       melihat kelas
router.get("/classroom", classroomController.getClassroom);
//       mengubah kelas
router.put("/classroom", classroomController.updateClassroom);
//       hapus kelas
router.delete("/classroom", classroomController.deleteClassroom);

module.exports = router;