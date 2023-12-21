const express = require("express");
const accessController = require("./open_access.controller");
const router = express.Router();

//=========================== GRADES ACCESS =================================//
router.post("/access/open/grades", accessController.openGradeAccess);
router.patch("/access/close/:id", accessController.closeGradesAccess);
router.get("/access/list/gradeAccess", accessController.getlistGradeAccess);

//=========================== PRE-REGIS ACCESS ===============================//
router.post("/access/open/preRegis", accessController.openPreRegisAccess);
router.patch(
  "/access/preRegis/close/:id",
  accessController.closePreRegisAccess
);
router.get("/access/list/preRegis", accessController.getListPreRegisAccess);

module.exports = router;
