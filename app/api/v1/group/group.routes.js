//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const groupController = require("./group.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------

//===================================================================
// @description     Get list submission
// @access          MAHASISWA
router.get("/group/submission_list", auth, groupController.getSubmissionList);

//===================================================================
// @description     Get details submission by id
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN
router.get(
  "/group/submission_details/:id",
  auth,
  groupController.getSubmissionDetailsById
);

//===================================================================
// @description     Get student list in the same proposal classroom
// @access          MAHASISWA
router.get(
  "/group/classroom/students-list/:id",
  auth,
  groupController.getStudentListByClassroomId
);

//===================================================================
// @description     Get dosen list
// @access          MAHASISWA
router.get("/group/dosen-list", auth, groupController.getDosenList);

//===================================================================
// @description     Get advisor team by id
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/group/advisor-group/:id",
  auth,
  groupController.getAdvisorTeamById
);

//===================================================================
// @description     Get committee list
// @access          DOSEN
router.get("/group/committee-list", auth, groupController.getCommitteeList);

// //       melihat kelompok mahasiswa
// router.get("/group_student/:id", groupController.getGroupStudentById);

// //       mengisi/update metadata
// router.put("/group/metadata/:id", groupController.updateMetadataById);
// //       melihat metadata
// router.get("/group/metadata/:id", groupController.getMetadataById);

module.exports = router;
