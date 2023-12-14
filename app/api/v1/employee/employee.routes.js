//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const employeeController = require("./employee.controller");
const { auth } = require("../../../middleware/auth");

router.get("/employee", employeeController.getAllEmployees);
router.get("/employee/:id", employeeController.getEmployeeById);
router.get("/employee/:id", employeeController.getEmployeeById);
router.get(
  "/employee/head/:major",
  employeeController.getDekanAndKaprodiByMajor
);
router.post("/employee", employeeController.createEmployee);
router.post("/employees", employeeController.createManyEmployee);
router.delete("/employee/:id", employeeController.deleteEmployeeById);
router.patch("/employee/:id", employeeController.patchEmployeeById);
router.put("/employee/:id", employeeController.updateEmployeeById);
router.get("/employee/dosen/:major", employeeController.viewDosenByMajor);
router.get("/employee/profile/:nik", employeeController.viewDosenDetailProfile);
router.patch(
  "/employee/student/addStudent",
  employeeController.addStudentGuidance
);

router.get("/supervisor/nik/:nik", employeeController.getSupervisorByNik);
router.get(
  "/supervisor/has-student",
  employeeController.getSupervisorHasStudent
);
router.get("/supervisor/no-student", employeeController.getSupervisorNoStudent);
router.patch(
  "/supervisor/:employeeNik/student",
  employeeController.assignSupervisorToStudents
);
router.patch(
  "/supervisor/:employeeNik/student/update",
  employeeController.updateStudentSupervisor
);

module.exports = router;
