//Layer untuk handle business logic

const employeeRepository = require("./employee.repository");
const studentRepository = require("../student/student.repository");
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

const getDekanAndKaprodiByMajor = async (major) => {
  try {
    // ambil nik
    const dekan = await employeeRepository.selectDekan();
    const kaprodi = await employeeRepository.selectKaprodi();

    // ambil nama dekan berdasarkan nik kemudian tambah key role
    let dekanName = await employeeRepository.selectDekanName(dekan);
    dekanName = dekanName.map((value) => {
      return {
        ...value,
        role: "dekan",
      };
    });

    // ambil nama kaprodi berdasarkan nik dan major kemudian tambah key role
    let kaprodiNameByMajor = await employeeRepository.selectKaprodiNameByMajor(
      major,
      kaprodi
    );
    kaprodiNameByMajor = kaprodiNameByMajor.map((value) => {
      return {
        ...value,
        role: "kaprodi",
      };
    });

    // gabung array dekan dan kaprodi jadi satu array
    const employees = dekanName.concat(kaprodiNameByMajor);

    return employees;
  } catch (error) {
    throw error.message;
  }
};

const assignStudentGuidance = async (payload) => {
  try {
    const employee = await employeeRepository.addStudentGuidanceForLecturer(
      payload
    );
    return employee;
  } catch (error) {
    throw error;
  }
};

const getSupervisorHasStudent = async () => {
  try {
    const employee = await employeeRepository.selectAllSupervisor();

    const employeeHasStudent = employee
      .filter((item) => item.student.length > 0)
      .map((item) => ({
        numberOfStudent: item.student.length,
        ...item,
      }));
    return employeeHasStudent;
  } catch (error) {
    throw error.message;
  }
};

const getSupervisorNoStudent = async () => {
  try {
    const employee = await employeeRepository.selectAllSupervisor();

    const employeeNoStudent = employee
      .filter((item) => item.student.length === 0)
      .map((item) => {
        const { student, ...itemWithoutStudent } = item;
        return itemWithoutStudent;
      });
    return employeeNoStudent;
  } catch (error) {
    throw error.message;
  }
};

const assignSupervisorToStudents = async (employeeNik, nims) => {
  try {
    const updatedRows = await studentRepository.updateEmployeeNikStudentByNim(
      employeeNik,
      nims
    );

    return updatedRows;
  } catch (error) {
    throw error.message;
  }
};

const updateStudentSupervisor = async (employeeNik, nims) => {
  try {
    const updatedRows = await employeeRepository.updateStudentSupervisor(
      employeeNik,
      nims
    );

    return updatedRows;
  } catch (error) {
    throw error.message;
  }
};

const getSupervisorByNik = async (nik) => {
  try {
    const employee = await employeeRepository.getSupervisorByNik(nik);

    return employee;
  } catch (error) {
    throw error.message;
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
  getDekanAndKaprodiByMajor,
  assignStudentGuidance,
  getSupervisorHasStudent,
  getSupervisorNoStudent,
  assignSupervisorToStudents,
  updateStudentSupervisor,
  getSupervisorByNik,
};
