const express = require("express");
const accessController = require("./open_access.controller");
const router = express.Router();
const { auth } = require("../../../middleware/auth");

router.post("/access/open/grades", auth, accessController.openGradeAccess);
router.patch("/access/close/:id", auth, accessController.closeGradesAccess);
router.get(
  "/access/list/gradesAccess/:major",
  auth,
  accessController.getlistGradeAccessByMajor
);
router.get(
  "/access/isOpen/:major",
  auth,
  accessController.checkingOpenGradeAccess
);
router.get(
  "/access/list/gradeAccess",
  auth,
  accessController.getlistGradeAccess
);
module.exports = router;
