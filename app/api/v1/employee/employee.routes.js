//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const employeeController = require("./employee.controller");
const { auth } = require("../../../middleware/auth");

router.get("/employee", auth, employeeController.getAllEmployees);

//===================================================================
// @description     Get all dosen skripsi
// @access          OPERATOR_FILKOM
router.get(
  "/employee/dosen-skripsi",
  auth,
  employeeController.getAllDosenSkripsi
);

//===================================================================
// @description     Get all dosen not dosen skripsi
// @access          OPERATOR_FILKOM
router.get("/employee/dosen", auth, employeeController.getAllDosen);

//===================================================================
// @description     Create dosen skripsi
// @access          OPERATOR_FILKOM
router.post(
  "/employee/dosen-skripsi",
  auth,
  employeeController.createDosenSkripsi
);

//===================================================================
// @description     Delete dosen skripsi by id
// @access          OPERATOR_FILKOM
router.delete(
  "/employee/dosen-skripsi/:id",
  auth,
  employeeController.deleteDosenSkripsiById
);

router.get("/employee/:id", auth, employeeController.getEmployeeById);
router.post("/employee", auth, employeeController.createEmployee);
router.delete("/employee/:id", auth, employeeController.deleteEmployeeById);
router.patch("/employee/:id", auth, employeeController.patchEmployeeById);
router.put("/employee/:id", auth, employeeController.updateEmployeeById);

module.exports = router;
