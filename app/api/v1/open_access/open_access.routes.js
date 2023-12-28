const express = require("express");
const accessController = require("./open_access.controller");
const router = express.Router();

//=========================== GRADES ACCESS =================================//
router.post("/access/open/grades", accessController.openGradeAccess);
router.patch("/access/close/:id", accessController.closeGradesAccess);
router.get("/access/list/gradeAccess", accessController.getlistGradeAccess);
router.get("/access/list/gradesAccess/:major", accessController.getlistGradeAccessByMajor)
router.get("/access/isOpen/:major", accessController.checkingOpenGradeAccess);
module.exports = router;
