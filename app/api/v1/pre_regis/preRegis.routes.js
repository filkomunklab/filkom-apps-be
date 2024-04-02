const express = require("express");
const preRegisController = require("./preRegis.controller");
const router = express.Router();
const { auth } = require("../../../middleware/auth");

router.get("/pre-regist", auth, preRegisController.getAllPreRegis);

router.get("/pre-regist/curriculum", auth, preRegisController.preRegisMenu);

router.get(
  "/pre-regist/status/:major/:studentId",
  auth,
  preRegisController.checkPreRegistAccess
);

router.post("/pre-regist/create", auth, preRegisController.createPreRegist);

router.post("/pre-regist/submit", auth, preRegisController.submitPreRegist);

router.patch(
  "/pre-regist/approval/:id",
  auth,
  preRegisController.submitApproval
);

router.get(
  "/pre-regist/review/:guidanceClassId",
  auth,
  preRegisController.getPreRegistListForTeacher
);

router.get(
  "/pre-regist/details/:id",
  auth,
  preRegisController.getPreRegistDetails
);

router.get(
  "/pre-regist/history-for-student/:studentId",
  auth,
  preRegisController.getHistoryForStudent
);
router.get(
  "/pre-regist/history-for-advisor/:guidanceClassId",
  auth,
  preRegisController.getHistoryForAdvisor
);
router.get("/pre-regist/current/:id", preRegisController.getCurrentPreRegist);

router.get(
  "/pre-regist/current/student/:studentId",
  auth,
  preRegisController.getCurrentForStudent
);

router.get(
  "/pre-regist/list-submitted/:id",
  auth,
  preRegisController.getAllSubmitedPreRegist
);

router.get("/pre-regist/list-subject/:id", preRegisController.getAllSubject);

router.patch(
  "/pre-regist/close-access/:id",
  auth,
  preRegisController.patchManualCloseAccess
);

router.patch(
  "/pre-regist/update/:preRegId",
  auth,
  preRegisController.updatePreRegisAccess
);

module.exports = router;
