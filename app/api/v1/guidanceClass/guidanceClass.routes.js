const express = require("express");
const guidanceClassController = require("./guidanceClass.controller");
const router = express.Router();

router.get("/guidance-class", guidanceClassController.getAllClass);

router.get(
  "/guidance-class/:id",
  guidanceClassController.getGuidanceClassDetail
);

router.get(
  "/guidance-class/get-all-unassigned-student/list",
  guidanceClassController.getAllUnassignedStudent
);

router.get(
  "/guidance-class/get-all-unassigned-teacher/list",
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

router.delete(
  "/guidance-class/:id",
  guidanceClassController.deleteGuidanceClass
);

module.exports = router;
