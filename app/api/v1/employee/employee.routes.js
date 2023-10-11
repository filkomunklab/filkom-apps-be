//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const employeeController = require("./employee.controller");
const { auth } = require("../../../middleware/auth");

router.get("/employee", auth, employeeController.getAllEmployees);
router.get("/employee/:id", auth, employeeController.getEmployeeById);
router.post("/employee", auth, employeeController.createEmployee);
router.delete("/employee/:id", auth, employeeController.deleteEmployeeById);
router.patch("/employee/:id", auth, employeeController.patchEmployeeById);
router.put("/employee/:id", auth, employeeController.updateEmployeeById);

module.exports = router;
