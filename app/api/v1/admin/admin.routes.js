//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const adminController = require("./admin.controller");
const { auth } = require("../../../middleware/auth");

router.get("/admin", auth, adminController.getAllAdmins);
router.get("/admin/:id", auth, adminController.getAdminById);
router.post("/admin", auth, adminController.createAdmin);
router.delete("/admin/:id", auth, adminController.deleteAdminById);
router.patch("/admin/:id", auth, adminController.patchAdminById);
router.put("/admin/:id", auth, adminController.updateAdminById);
router.patch(
  "/change-password-admin/:id",
  auth,
  adminController.changePasswordByAdmin
);

module.exports = router;
