//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const sptController = require("./spt.controller");

router.get("/spt", sptController.getListSPT);
router.get("/spt/sort-by", sptController.sortSPTby);
router.get("/spt/detail/id/:id", sptController.getSPTById);
router.get("/spt/detail/student/nim/:nim", sptController.getSPTByNIM);
router.post("/spt", sptController.submitSPT);
router.patch("/spt/fak-approval/:id", sptController.patchStatusByFak);
router.patch("/spt/reg-approval/:id", sptController.patchStatusByReg);
router.get("/spt/fak-approved", sptController.listApprovedSPTbyFak);
router.get("/spt/reg-approved", sptController.listApprovedSPTbyReg);

module.exports = router;
