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
  "/pre-regist/review/:guidanceClassId",
  preRegisController.getPreRegistListForTeacher
);

router.get("/pre-regist/details/:id", preRegisController.getPreRegistDetails);

router.get(
  "/pre-regist/history-for-student/:studentId",
  preRegisController.getHistoryForStudent
);
router.get(
  "/pre-regist/history-for-advisor/:guidanceClassId",
  preRegisController.getHistoryForAdvisor
);

module.exports = router;
