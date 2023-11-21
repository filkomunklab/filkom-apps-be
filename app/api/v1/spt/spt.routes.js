//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const sptController = require("./spt.controller");
const { auth } = require("../../../middleware/auth");

//@description     Get (pagination and filter) calon tamatan
//@route           GET /api/v1/spt?search_query=
//@access          Public
router.get("/spt", auth, sptController.getListSPT);

router.get("/spt/registar/filter-by", auth, sptController.filterSPTBy);
router.get("/spt/faculty/filter-by", auth, sptController.filterSPTBy);
router.get("/spt/detail/id/:id", auth, sptController.getSPTById);
router.get("/spt/detail/student/nim/:nim", auth, sptController.getSPTByNIM);
router.post("/spt", auth, sptController.submitSPT);
router.patch("/spt/fac-approval/:id", auth, sptController.patchStatusByFak);
router.patch("/spt/reg-approval/:id", auth, sptController.patchStatusByReg);
router.get("/spt/fac-approved", auth, sptController.listApprovedSPTbyFak);
router.get("/spt/reg-approved", auth, sptController.listApprovedSPTbyReg);
router.get("/spt/checkSPT/:studentId", auth, sptController.checkAvSPT);

router.patch(
  "/spt/reg-changeStatus/:nim",
  auth,
  sptController.changeStudentStatus
);

module.exports = router;
