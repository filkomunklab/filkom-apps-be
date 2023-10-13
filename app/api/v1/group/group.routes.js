//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const groupController = require("./group.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------

//       membuat kelompok baru -> submission

//       melihat daftar submission
router.get("/group_student/submission_list", groupController.getSubmissionListById);
//       melihat detail submission
router.get("/group_student/submission_details/:id", groupController.getSubmissionDetailsById);

// //       melihat kelompok mahasiswa
// router.get("/group_student/:id", groupController.getGroupStudentById);

// //       mengisi/update metadata
// router.put("/group/metadata/:id", groupController.updateMetadataById);
// //       melihat metadata
// router.get("/group/metadata/:id", groupController.getMetadataById);

module.exports = router;