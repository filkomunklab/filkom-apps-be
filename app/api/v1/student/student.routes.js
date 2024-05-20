//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const studentController = require("./student.controller");
const { auth } = require("../../../middleware/auth");
const multer = require("multer");

const upload = multer();

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

router.post(
  "/student-many/file",
  upload.single("xlsxFile"),
  studentController.insertByXlsx
);

router.get("/student/:nim", studentController.getStudentByNim);

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

router.get("/Student", studentController.getAllStudent);

router.get(
  "/students-without-supervisor",
  studentController.getStudentHasNoSupervisorAndActive
);

//       create     - membuat many student baru
router.post("/student-many", studentController.createManyStudent);

// update student by id
router.put("/student/update/id/:id", studentController.patchStudentById);

router.delete("/student/:id", studentController.deleteStudentById);

//============================BimAkad Profile Management=========================

//Student Input data for first time login
router.patch(
  "/student/biodata/:studentId",
  auth,
  studentController.patchBiodataStudent
);

//check if student already input data in first time login
router.get(
  "/student/biodata/check/:studentId",
  auth,
  studentController.getToCheckBiodata
);

//view of student profile/biodata
router.get(
  "/student/view/biodata/:studentId",
  auth,
  studentController.getBiodataStudent
);

// student change password byself
router.patch(
  "/change-password-student/:id",
  auth,
  studentController.changePasswordByStudent
);

module.exports = router;
