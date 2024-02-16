const express = require("express");
const router = express.Router();
const tsController = require("./ts.controller");
const { auth } = require("../../../middleware/auth");

router.get("/tracer-study", auth, tsController.getListTS);
router.post("/tracer-study", auth, tsController.submitTS);
router.get("/admin-operator/exportDataTS", auth, tsController.exportTStoExcel);

module.exports = router;
