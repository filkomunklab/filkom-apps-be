//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const sptController = require("./spt.controller");

router.get("/spt", sptController.getListSPT);
router.get("/spt/detail/:id", sptController.getSPTById);
router.post("/spt", sptController.submitSPT);
router.patch("/spt/fak-approval/:id", sptController.patchStatusByFak);
router.get("/spt/fak-approved", sptController.listApprovedSPTbyFak);

module.exports = router;
