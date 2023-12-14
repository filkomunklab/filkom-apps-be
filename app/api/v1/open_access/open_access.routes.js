const express = require("express");
const accessController = require("./open_access.controller");
const router = express.Router();

router.post("/access/open/grades", accessController.openGradeAccess);
router.patch("/access/close/:id", accessController.closeGradesAccess);
router.get("/access/list/gradeAccess", accessController.getlistGradeAccess);

module.exports = router;
