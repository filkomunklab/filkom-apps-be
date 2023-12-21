const express = require("express");
const preRegisController = require("./preRegis.controller");
const router = express.Router();

router.get("/pre-regist/curriculum", preRegisController.preRegisMenu);

router.get("/pre-regist/status", preRegisController.checkPreRegistAccess);

router.post("/pre-regist/create", preRegisController.createPreRegist);

router.post("/pre-regist/submit", preRegisController.submitPreRegist);

router.patch("/pre-regist/approval/:id", preRegisController.submitApproval);

module.exports = router;
