//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const academicController = require("./academic_calendar.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------
//       membuat tahun ajaran baru
router.post("/academic-calendar", academicController.createAcademic);
//       melihat tahun ajaran
router.get("/academic-calendar", academicController.getAcademic);
//       mengubah tahun ajaran
router.put("/academic-calendar", academicController.updateAcademic);
//       hapus tahun ajaran
router.delete("/academic-calendar", academicController.deleteAcademic);

module.exports = router;