//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const studentController = require("./student.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------
//       create     - membuat student baru
router.post("/student", studentController.createStudent);
// //       view all   - melihat student
// router.get("/student", studentController.getAllStudent);
// //       view       - melihat student
// router.get("/student/:id", studentController.getStudentById);
// //       update     - memperbarui student
// router.put("/student/:id", studentController.updateStudentById);
// //       delete     - hapus student
// router.delete("/student/:id", studentController.deleteStudentById);

router.get("/student/:nim", studentController.getStudentByNim);

router.patch("/student/biodata/:nim", studentController.biodataStudent);

router.get("/student/dosen/:nik", studentController.viewByEmployeeNik);

router.get("/management/student", studentController.getAllStudentForManagement);

router.get("/student/major/:major", studentController.getStudentbyMajor);

router.get(
  "/student/arrivalYear/:arrival_Year",
  studentController.getStudentbyArrivalYear
);

router.patch(
  "/management/student/:nim/password",
  studentController.updateStudentPassword
);

module.exports = router;
