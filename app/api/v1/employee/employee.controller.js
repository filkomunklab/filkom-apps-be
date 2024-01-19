//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const employeeService = require("./employee.service");
const { policyFor } = require("../policy");
const { subject } = require("@casl/ability");
const { message } = require("../../../database");
const prisma = require("../../../database");

const getAllEmployees = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "Employee")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  const employee = await employeeService.getAllEmployees();
  res.send({ status: "OK", data: employee });
};

const getEmployeeById = async (req, res) => {
  // const policy = policyFor(req.user);
  // if (!policy.can("read", "Employee")) {
  //   return res.status(401).send({
  //     status: "FAILED",
  //     data: { error: "You don't have permission to perform this action" },
  //   });
  // }
  try {
    const id = req.params.id;
    const employee = await employeeService.getEmployeeById(id);
    //Todo: format data
    res.send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createEmployee = async (req, res) => {
  // const policy = policyFor(req.user);
  // if (!policy.can("create", "Employee")) {
  //   return res.status(401).send({
  //     status: "FAILED",
  //     data: { error: "You don't have permission to perform this action" },
  //   });
  // }

  const payload = req.body;
  const employee = await employeeService.createEmployee(payload);
  res.status(201).send({ status: "OK", data: employee });
};

const createManyEmployee = async (req, res) => {
  try {
    const data = req.body.data;
    const employee = await employeeService.createManyEmployee(data);
    res.status(201).send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteEmployeeById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("delete", "Employee")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    await employeeService.deleteEmployeeById(id);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    console.log("ini error di controler: ", error);
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error || error.Error },
    });
  }
};

const patchEmployeeById = async (req, res) => {
  const policy = policyFor(req.user);
  const Employee = { id: req.params.id };
  if (!policy.can("update", subject("Employee", Employee))) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const payload = req.body;
    const employee = await employeeService.updateOrPatchEmployeeById(
      id,
      payload
    );
    res.send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateEmployeeById = async (req, res) => {
  const policy = policyFor(req.user);
  const Employee = { id: req.params.id };
  if (!policy.can("update", subject("Employee", Employee))) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const payload = req.body;
    if (
      !(
        payload.nik &&
        payload.password &&
        payload.firstName &&
        payload.lastName
      )
    ) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const employee = await employeeService.updateOrPatchEmployeeById(
      id,
      payload
    );
    res.send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const viewDosenByMajor = async (req, res) => {
  const { major } = req.params;
  try {
    const employee = await employeeService.getEmployeeByMajor(major);
    res.status(201).send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const viewDosenDetailProfile = async (req, res) => {
  const { classId } = req.params;
  try {
    const employee = await employeeService.getDosenDetailProfile(classId);
    res.status(200).send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getDekanAndKaprodiByMajor = async (req, res) => {
  const { major } = req.params;
  try {
    const employee = await employeeService.getDekanAndKaprodiByMajor(major);
    res.status(200).send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const addStudentGuidance = async (req, res) => {
  const payload = req.body;
  try {
    const employee = await employeeService.assignStudentGuidance(payload);
    res.status(201).send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getSupervisorHasStudent = async (req, res) => {
  try {
    const employee = await employeeService.getSupervisorHasStudent();
    res.status(200).send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getSupervisorNoStudent = async (req, res) => {
  try {
    const employee = await employeeService.getSupervisorNoStudent();
    res.status(200).send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const assignSupervisorToStudents = async (req, res) => {
  const employeeNik = req.params.employeeNik;
  const { nims } = req.body;

  if (!employeeNik || !nims) {
    return res.status(400).send({
      status: "FAILED",
      message: "Please include employeeNik and nim students!!",
    });
  }
  try {
    const updatedRows = await employeeService.assignSupervisorToStudents(
      employeeNik,
      nims
    );
    res.status(200).send({ status: "OK", data: updatedRows });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateStudentSupervisor = async (req, res) => {
  console.log("halo bang");
  const employeeNik = req.params.employeeNik;
  const { nims } = req.body;

  if (!employeeNik || !nims) {
    return res.status(400).send({
      status: "FAILED",
      message: "Please include employeeNik and nim students!!",
    });
  }
  try {
    const updatedRows = await employeeService.updateStudentSupervisor(
      employeeNik,
      nims
    );
    res.status(200).send({ status: "OK", data: updatedRows });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getSupervisorByNik = async (req, res) => {
  const nik = req.params.nik;
  console.log("ini nik: ", nik);
  try {
    const employee = await employeeService.getSupervisorByNik(nik);
    res.status(200).send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateEmployeePassword = async (req, res) => {
  try {
    const { nik } = req.params;
    const payload = req.body;
    await employeeService.updateEmployeePassword(nik, payload);
    res.status(200).send({ status: "OK", data: "Password updated" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const patchStudentStatus = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "student_status")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const { nim } = req.params;
  const payload = req.body;
  try {
    const employee = await employeeService.changeStudentStatus(nim, payload);
    res.status(201).send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//--------------------skripsi app-------------------------

//===================================================================
// @description     all dosen skripsi
// @route           GET /employee/dosen-skripsi
// @access          OPERATOR_FILKOM
const getAllDosenSkripsi = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "dosen_mk")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const employee = await employeeService.getAllDosenSkripsi();
    res.send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get all dosen not dosen skripsi
// @route           GET /employee/dosen
// @access          OPERATOR_FILKOM
const getAllDosen = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "dosen")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const employee = await employeeService.getAllDosen();
    res.send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Create dosen skripsi
// @route           POST /employee/dosen-skripsi
// @access          OPERATOR_FILKOM
const createDosenSkripsi = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("create", "dosen_mk")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const payload = req.body;
    if (!payload.employee_id) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const employee = await employeeService.createDosenSkripsi(payload);
    res.send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Delete dosen skripsi by id
// @route           DELETE /employee/dosen-skripsi/:id
// @access          OPERATOR_FILKOM
const deleteDosenSkripsiById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("delete", "dosen_mk")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    await employeeService.deleteDosenSkripsiById(id);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const changePasswordByEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;

    const admin = await employeeService.changePasswordByEmployee(id, payload);
    res.status(200).send({ status: "OK", data: admin });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployeeById,
  patchEmployeeById,
  updateEmployeeById,
  viewDosenByMajor,
  viewDosenDetailProfile,
  getDekanAndKaprodiByMajor,
  addStudentGuidance,
  getSupervisorHasStudent,
  getSupervisorNoStudent,
  assignSupervisorToStudents,
  updateStudentSupervisor,
  getSupervisorByNik,
  createManyEmployee,
  updateEmployeePassword,
  patchStudentStatus,
  // ---------skripsi app------------
  getAllDosenSkripsi,
  getAllDosen,
  createDosenSkripsi,
  deleteDosenSkripsiById,
  changePasswordByEmployee,
};
