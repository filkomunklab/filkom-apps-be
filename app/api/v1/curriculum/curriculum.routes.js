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

//===================================================================
// @description     Delete Curriculum
// @access
router.delete(
  "/curriculums/:curriculum_id",
  curriculumController.deleteCurriculum
);

//===================================================================
// @description     Get Curriculum by major and year
// @access
router.get(
  "/curriculum/check/by-major-year/:major/:year",
  curriculumController.getCurriculumByMajorAndYear
);

module.exports = router;
