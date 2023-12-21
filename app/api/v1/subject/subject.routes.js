const express = require("express");
const router = express.Router();

const subjectController = require("./subject.controller");

//-------------------Bimbingan Akademik ------------------------

//===================================================================
// @description     Get All Subject by id curriculum
// @access
router.get(
  "/subject/:curriculum_id",
  subjectController.getAllSubjectByIdCurriculum
);

module.exports = router;
