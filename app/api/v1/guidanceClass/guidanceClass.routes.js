const express = require("express");
const guidanceClassController = require("./guidanceClass.controller");
const router = express.Router();

router.get(
  "/guidanceClass/getAllUnassignedStudent",
  guidanceClassController.getAllUnassignedStudent
);

router.post(
  "/guidanceClass/createNew/:teacherId",
  guidanceClassController.createGuidanceClass
);

router.post(
  "/guidanceClass/addStudent/:guidanceClassId",
  guidanceClassController.addStudentToGuidanceClass
);

router.delete(
  "/guidanceClass/deleteStudent",
  guidanceClassController.deleteStudentFromGuidanceClass
);

module.exports = router;
