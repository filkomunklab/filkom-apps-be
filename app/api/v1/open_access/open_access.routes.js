const express = require("express");
const accessController = require("./open_access.controller");
const router = express.Router();

// router.post("/access/set/To/database", openController.openAccessTodb);
// router.patch("/openAccess/set/:open", openController.setAccess);
router.post("/access/open/grades", accessController.openGradeAccess);
router.patch("/access/close/:id", accessController.closeGradesAccess);

module.exports = router;
