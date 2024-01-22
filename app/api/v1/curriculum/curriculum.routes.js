const express = require("express");
const router = express.Router();
const curriculumController = require("./curriculum.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Bimbingan Akademik ------------------------

//===================================================================
// @description     Create Curriculum
// @access
router.post(
  "/curriculum",
  auth,
  curriculumController.createCurriculumWithItsSubject
);

//===================================================================
// @description     Get Curriculum
// @access
router.get("/curriculum", auth, curriculumController.getAllCurriculum);

//===================================================================
// @description     Get Curriculum by Id
// @access
router.get("/curriculum/:id", auth, curriculumController.getCurriculumById);

//===================================================================
// @description     Delete Curriculum
// @access
router.delete(
  "/curriculums/:curriculum_id",
  auth,
  curriculumController.deleteCurriculum
);

//===================================================================
// @description     Get Curriculum by major and year
// @access
router.get(
  "/curriculum/check/by-major-year/:major/:year",
  auth,
  curriculumController.getCurriculumByMajorAndYear
);

module.exports = router;
