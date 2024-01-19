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
router.get("/employee", employeeController.getAllEmployees);
router.get("/employee/:id", employeeController.getEmployeeById);
router.get("/employee/:id", employeeController.getEmployeeById);
router.get(
  "/employee/head/:major",
  employeeController.getDekanAndKaprodiByMajor
);
router.post("/employee", employeeController.createEmployee);
router.post("/employees", auth, employeeController.createManyEmployee);
router.delete("/employee/:id", auth, employeeController.deleteEmployeeById);
router.patch("/employee/:id", auth, employeeController.patchEmployeeById);
router.put("/employee/:id", employeeController.updateEmployeeById);
router.get("/employee/dosen/:major", employeeController.viewDosenByMajor);

router.get(
  "/employee/profile/:classId",
  employeeController.viewDosenDetailProfile
);

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

router.patch(
  "/management/employee/:nik/password",
  auth,
  employeeController.updateEmployeePassword
);

router.patch(
  "/employee/biodataStudent/status/:nim",
  auth,
  employeeController.patchStudentStatus
);

router.patch(
  "/change-password-employee/:id",
  employeeController.changePasswordByEmployee
);

module.exports = router;
