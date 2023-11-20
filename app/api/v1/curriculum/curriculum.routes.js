const express = require("express");
const router = express.Router();
const curriculumController = require("./curriculum.controller");

//-------------------Bimbingan Akademik ------------------------

//===================================================================
// @description     Create Curriculum
// @access
router.post("/curriculum", curriculumController.createCurriculumWithItsSubject);

//===================================================================
// @description     Get Curriculum
// @access
router.get("/curriculum", curriculumController.getAllCurriculum);

module.exports = router;
