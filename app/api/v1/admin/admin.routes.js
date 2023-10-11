//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const adminController = require("./admin.controller");
// const { auth } = require("../../../middleware/auth");

router.get("/admin", adminController.getAllAdmins);
router.get("/admin/:id", adminController.getAdminById);
router.post("/admin", adminController.createAdmin);
router.delete("/admin/:id", adminController.deleteAdminById);
router.patch("/admin/:id", adminController.patchAdminById);
router.put("/admin/:id", adminController.updateAdminById);

module.exports = router;
