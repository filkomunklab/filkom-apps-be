//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const academicController = require("./academic_calendar.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------
//       create tahun ajaran baru
router.post("/academic-calendar", auth, academicController.createAcademic);
//       view tahun ajaran
router.get("/academic-calendar/:id", auth, academicController.getAcademicById);
//       view all tahun ajaran
router.get("/academic-calendar", auth, academicController.getAllAcademic);
// //       mengubah tahun ajaran
// router.put("/academic-calendar/:id", auth, academicController.updateAcademicById);
// //       hapus tahun ajaran
// router.delete("/academic-calendar/:id", auth, academicController.deleteAcademicById);

module.exports = router;