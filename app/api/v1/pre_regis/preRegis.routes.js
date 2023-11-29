const express = require("express");
const preRegisController = require("./preRegis.controller");
const router = express.Router();

router.get("/preregis/curriculum", preRegisController.preRegisMenu);

module.exports = router;
