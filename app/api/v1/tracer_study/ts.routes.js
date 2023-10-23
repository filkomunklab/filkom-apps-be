const express = require("express");
const router = express.Router();
const tsController = require("./ts.controller");

router.get("/tracer-study", tsController.getListTS);
router.post("/tracer-study", tsController.submitTS);

module.exports = router;
