//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const employeeController = require("./employee.controller");
const { auth } = require("../../../middleware/auth");

router.get("/employee", employeeController.getAllEmployees);
router.get("/employee/:id", employeeController.getEmployeeById);
router.post("/employee", employeeController.createEmployee);
router.delete("/employee/:id", employeeController.deleteEmployeeById);
router.patch("/employee/:id", employeeController.patchEmployeeById);
router.put("/employee/:id", employeeController.updateEmployeeById);

module.exports = router;
