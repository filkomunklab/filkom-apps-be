//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const sptController = require("./spt.controller");

router.get("/spt", sptController.getAllSPT);
router.get("/spt/:id", sptController.getSPTById);
router.post("/spt", sptController.submitSPT);

module.exports = router;
