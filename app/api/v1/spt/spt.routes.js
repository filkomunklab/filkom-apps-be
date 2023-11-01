//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const sptController = require("./spt.controller");

//@description     Get (pagination and filter) calon tamatan
//@route           GET /api/v1/spt?search_query= &page= &limit= &filterBy= & filterValue=
//@access          Public
router.get("/spt", sptController.getListSPT);

router.get("/spt/registar/filter-by", sptController.filterSPTBy);
router.get("/spt/faculty/filter-by", sptController.filterSPTBy);
router.get("/spt/detail/id/:id", sptController.getSPTById);
router.get("/spt/detail/student/nim/:nim", sptController.getSPTByNIM);
router.post("/spt", sptController.submitSPT);
router.patch("/spt/fac-approval/:id", sptController.patchStatusByFak);
router.patch("/spt/reg-approval/:id", sptController.patchStatusByReg);
router.get("/spt/fac-approved", sptController.listApprovedSPTbyFak);
router.get("/spt/reg-approved", sptController.listApprovedSPTbyReg);
router.get("/spt/checkSPT/:studentId", sptController.checkAvSPT);

module.exports = router;
