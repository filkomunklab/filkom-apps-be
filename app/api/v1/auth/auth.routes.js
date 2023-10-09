const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");

router.post("/auth/signin-admin", authController.signInAdmin);

module.exports = router;
