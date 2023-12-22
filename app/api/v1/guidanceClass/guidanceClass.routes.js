const express = require("express");
const guidanceClassController = require("./guidanceClass.controller");
const router = express.Router();

router.get(
  "/guidance-class/get-all-unassigned-student",
  guidanceClassController.getAllUnassignedStudent
);

router.get(
  "/guidance-class/get-all-unassigned-teacher",
  guidanceClassController.getAllUnassignetTeacher
);

router.post(
  "/guidance-class/create-new/:teacherId",
  guidanceClassController.createGuidanceClass
);

router.post(
  "/guidance-class/add-student/:guidanceClassId",
  guidanceClassController.addStudentToGuidanceClass
);

router.delete(
  "/guidance-class/delete-student",
  guidanceClassController.deleteStudentFromGuidanceClass
);

module.exports = router;
