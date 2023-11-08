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
// @description     Get classroom proposal list
// @access          MAHASISWA
router.get("/group/classroom_list", auth, groupController.getClassroomList);

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
// @description     Get proposal list advisor
// @access          DOSEN
router.get(
  "/group/proposal-list-advisor",
  auth,
  groupController.getProposalListAdvisor
);

//===================================================================
// @description     Get skripsi list advisor
// @access          DOSEN
router.get(
  "/group/skripsi-list-advisor",
  auth,
  groupController.getSkripsiListAdvisor
);

//===================================================================
// @description     Get proposal list co-advisor
// @access          DOSEN
router.get(
  "/group/proposal-list-co-advisor",
  auth,
  groupController.getProposalListCoAdvisor
);

//===================================================================
// @description     Get skripsi list co-advisor
// @access          DOSEN
router.get(
  "/group/skripsi-list-co-advisor",
  auth,
  groupController.getSkripsiListCoAdvisor
);

//===================================================================
// @description     Get proposal list chairman
// @access          DOSEN
router.get(
  "/group/proposal-list-chairman",
  auth,
  groupController.getProposalListChairman
);

//===================================================================
// @description     Get skripsi list chairman
// @access          DOSEN
router.get(
  "/group/skripsi-list-chairman",
  auth,
  groupController.getSkripsiListChairman
);

//===================================================================
// @description     Get proposal list member
// @access          DOSEN
router.get(
  "/group/proposal-list-member",
  auth,
  groupController.getProposalListMember
);

//===================================================================
// @description     Get skripsi list member
// @access          DOSEN
router.get(
  "/group/skripsi-list-member",
  auth,
  groupController.getSkripsiListMember
);

//===================================================================
// @description     Get proposal list mk
// @access          DOSEN_MK
router.get("/group/proposal-list-mk", auth, groupController.getProposalListMK);

//===================================================================
// @description     Get skripsi list mk
// @access          DOSEN_MK
router.get("/group/skripsi-list-mk", auth, groupController.getSkripsiListMK);

//===================================================================
// @description     Get proposal list kaprodi IF/SI
// @access          KAPRODI
router.get(
  "/group/proposal-list-kaprodi",
  auth,
  groupController.getProposalListKaprodi
);

//===================================================================
// @description     Get skripsi list kaprodi IF/SI
// @access          KAPRODI
router.get(
  "/group/skripsi-list-kaprodi",
  auth,
  groupController.getSkripsiListKaprodi
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
// @description     Get skripsi list dekan
// @access          DEKAN
router.get(
  "/group/skripsi-list-dekan",
  auth,
  groupController.getSkripsiListDekan
);

//===================================================================
// @description     Get proposal list operator fakultas/filkom
// @access          OPERATOR_FAKULTAS
router.get(
  "/group/proposal-list-sekretaris",
  auth,
  groupController.getProposalListSekretaris
);

//===================================================================
// @description     Get skripsi list operator fakultas/filkom
// @access          OPERATOR_FAKULTAS
router.get(
  "/group/skripsi-list-sekretaris",
  auth,
  groupController.getSkripsiListSekretaris
);

// //       melihat kelompok mahasiswa
// router.get("/group_student/:id", groupController.getGroupStudentById);

// //       mengisi/update metadata
// router.put("/group/metadata/:id", groupController.updateMetadataById);
// //       melihat metadata
// router.get("/group/metadata/:id", groupController.getMetadataById);

module.exports = router;
