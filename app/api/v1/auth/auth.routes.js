const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const { auth } = require("../../../middleware/auth");

router.post("/auth/signin-admin", authController.signInAdmin);
router.post("/auth/signout-admin", auth, authController.signOutAdmin);
router.post("/auth/signin-employee", authController.signInEmployee);
router.get("/auth/me", auth, authController.me);

module.exports = router;
