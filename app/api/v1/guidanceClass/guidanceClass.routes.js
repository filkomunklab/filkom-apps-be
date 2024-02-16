const express = require("express");
const guidanceClassController = require("./guidanceClass.controller");
const router = express.Router();
const { auth } = require("../../../middleware/auth");

router.get("/guidance-class", auth, guidanceClassController.getAllClass);

router.get(
  "/guidance-class/:id",
  auth,
  guidanceClassController.getGuidanceClassDetail
);

router.get(
  "/guidance-class/get-all-unassigned-student/list",
  auth,
  guidanceClassController.getAllUnassignedStudent
);

router.get(
  "/guidance-class/get-all-unassigned-teacher/list",
  auth,
  guidanceClassController.getAllUnassignetTeacher
);

router.post(
  "/guidance-class/create-new/:teacherId",
  auth,
  guidanceClassController.createGuidanceClass
);

router.post(
  "/guidance-class/add-student/:guidanceClassId",
  auth,
  guidanceClassController.addStudentToGuidanceClass
);

router.delete(
  "/guidance-class/delete-student",
  auth,
  guidanceClassController.deleteStudentFromGuidanceClass
);

router.delete(
  "/guidance-class/:id",
  auth,
  guidanceClassController.deleteGuidanceClass
);

module.exports = router;
