const express = require("express");
const router = express.Router();
const tsController = require("./ts.controller");

router.get("/tracer-study", tsController.getListTS);
router.post("/tracer-study", tsController.submitTS);
router.get("/admin-operator/exportDataTS", tsController.exportTStoExcel);

module.exports = router;
