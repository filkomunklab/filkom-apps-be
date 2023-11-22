//Layer untuk handle business logic

const employeeRepository = require("./employee.repository");
const bcrypt = require("bcrypt");

const getAllEmployees = async () => {
  const employee = await employeeRepository.findEmployees();
  return employee;
};

const getEmployeeById = async (id) => {
  const employee = await employeeRepository.findEmployeeById(id);
  if (!employee) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return employee;
};

const createEmployee = async (payload) => {
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(payload.password, salt);
  payload = { ...payload, password };
  const employee = await employeeRepository.insertEmployee(payload);
  return employee;
};

const deleteEmployeeById = async (id) => {
  await getEmployeeById(id);
  await employeeRepository.deleteEmployee(id);
};

const updateOrPatchEmployeeById = async (id, payload) => {
  await getEmployeeById(id);
  if (payload.password) {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(payload.password, salt);
    payload = { ...payload, password };
  }

  const employee = await employeeRepository.updateEmployee(id, payload);
  return employee;
};

const getEmployeeByMajor = async (major) => {
  try {
    const employee = await employeeRepository.findEmployeeByMajor(major);
    return employee;
  } catch (error) {
    return error;
  }
};

const getDosenDetailProfile = async (nik) => {
  try {
    const employee = await employeeRepository.findDosenDetailProfile(nik);
    return employee;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployeeById,
  updateOrPatchEmployeeById,
  getEmployeeByMajor,
  getDosenDetailProfile,
};
