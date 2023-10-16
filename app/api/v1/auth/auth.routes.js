const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const { auth } = require("../../../middleware/auth");

router.post("/auth/signin-admin", authController.signInAdmin);
router.post("/auth/signout-admin", auth, authController.signOutAdmin);
router.post("/auth/signin-employee", authController.signInEmployee);
router.post("/auth/signout-employee", auth, authController.signOutEmployee);
router.post("/auth/signin-student", authController.signInStudent);
router.post("/auth/signout-student", authController.signOutStudent);
router.get("/auth/me", auth, authController.me);

module.exports = router;
