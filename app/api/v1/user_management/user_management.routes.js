const express = require("express");
const router = express.Router();
const userManagementController = require("./user_management.controller");

router.patch(
  "/user-management/role/user/:id",
  userManagementController.updateRoles
);

module.exports = router;
