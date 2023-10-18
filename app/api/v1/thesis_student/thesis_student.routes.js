//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const thesisStudentController = require("./thesis_student.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------
//       membuat student baru
router.post("/thesis-student", thesisStudentController.createThesisStudent);
//       melihat student
router.get("/thesis-student", thesisStudentController.getThesisStudent);
//       memperbarui student
router.put("/thesis-student", thesisStudentController.updateThesisStudent);
//       hapus student
router.delete("/thesis-student", thesisStudentController.deleteThesisStudent);

module.exports = router;