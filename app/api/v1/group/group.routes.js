//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const groupController = require("./group.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------

//===================================================================
// @description     Get thesis list
// @access          MAHASISWA
router.get("/group/thesis_list", auth, groupController.getThesisList);

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

//===================================================================
// @description     Get submission list dosen mk
// @access          DOSEN_MK
router.get(
  "/group/submission-list-mk",
  auth,
  groupController.getSubmissionListMK
);

//===================================================================
// @description     Get submission list kaprodi
// @access          KAPRODI
router.get(
  "/group/submission-list-kaprodi",
  auth,
  groupController.getSubmissionListKaprodi
);

//===================================================================
// @description     Get submission list dekan
// @access          DEKAN
router.get(
  "/group/submission-list-dekan",
  auth,
  groupController.getSubmissionListDekan
);

//===================================================================
// @description     Get proposal list dosen (advisor/co)
// @access          DOSEN
router.get(
  "/group/proposal-list-advisor-co-advisor",
  auth,
  groupController.getProposalListAdvisorAndCo
);

//===================================================================
// @description     Get proposal list dosen (panelist)
// @access          DOSEN
router.get(
  "/group/proposal-list-chairman-member",
  auth,
  groupController.getProposalListChairmanAndMember
);

//===================================================================
// @description     Get proposal list mk
// @access          DOSEN_MK
router.get("/group/proposal-list-mk", auth, groupController.getProposalListMK);

//===================================================================
// @description     Get proposal list kaprodi IF/SI
// @access          KAPRODI
router.get(
  "/group/proposal-list-kaprodi",
  auth,
  groupController.getProposalListKaprodi
);

//===================================================================
// @description     Get proposal list dekan
// @access          DEKAN
router.get(
  "/group/proposal-list-dekan",
  auth,
  groupController.getProposalListDekan
);

//===================================================================
// @description     Get proposal list operator fakultas/filkom
// @access          OPERATOR_FAKULTAS
router.get(
  "/group/proposal-list-sekretaris",
  auth,
  groupController.getProposalListSekretaris
);

// //       melihat kelompok mahasiswa
// router.get("/group_student/:id", groupController.getGroupStudentById);

// //       mengisi/update metadata
// router.put("/group/metadata/:id", groupController.updateMetadataById);
// //       melihat metadata
// router.get("/group/metadata/:id", groupController.getMetadataById);

module.exports = router;
