const express = require("express");
const preRegisController = require("./preRegis.controller");
const router = express.Router();

router.get("/pre-regist", preRegisController.getAllPreRegis);

router.get("/pre-regist/curriculum", preRegisController.preRegisMenu);

router.get(
  "/pre-regist/status/:major/:studentId",
  preRegisController.checkPreRegistAccess
);

router.post("/pre-regist/create", preRegisController.createPreRegist);

router.post("/pre-regist/submit", preRegisController.submitPreRegist);

router.patch("/pre-regist/approval/:id", preRegisController.submitApproval);

router.get(
  "/pre-regist/list-for-advisor/:guidanceClassId",
  preRegisController.getPreRegistListForTeacher
);

router.get(
  "/pre-regist/list-for-student/:studentId",
  preRegisController.getPreRegistListForStudent
);

router.get("/pre-regist/details/:id", preRegisController.getPreRegistDetails);

module.exports = router;
