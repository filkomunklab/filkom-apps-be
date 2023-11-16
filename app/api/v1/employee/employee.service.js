//Layer untuk handle business logic

const employeeRepository = require("./employee.repository");
const userManagement = require("../user_management/user_namagement.repository");
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

//--------------------skripsi app-------------------------

//===================================================================
// @description     Get all dosen skripsi
// @route           GET /employee/dosen-skripsi
// @access          OPERATOR_FILKOM
const getAllDosenSkripsi = async () => {
  const dosenSkripsiData = [];
  const dosenSkripsis = await userManagement.findAllUserByRole("DOSEN_MK");
  if (dosenSkripsis) {
    for (const entry of dosenSkripsis) {
      const employee = await employeeRepository.findEmployeeByNIK(entry.userId);
      if (employee) {
        let fullName = employee.firstName;
        if (employee.lastName) {
          fullName += ` ${employee.lastName}`;
        }

        if (employee.degree) {
          fullName += `, ${employee.degree}`;
        }
        const data = {
          employee_id: employee.id,
          role_id: entry.id,
          fullName,
          nidn: employee.nidn,
        };
        dosenSkripsiData.push(data);
      }
    }
  }
  return dosenSkripsiData;
};

//===================================================================
// @description     Get all dosen not dosen skripsi
// @route           GET /employee/dosen
// @access          OPERATOR_FILKOM
const getAllDosen = async () => {
  const dosen = [];
  const employees = await employeeRepository.findEmployees();
  if (employees) {
    for (const entry of employees) {
      // cek jika sudah jadi dosen skripsi
      const isDosenSkripsi = await userManagement.findUserByNIKAndRole(
        entry.nik,
        "DOSEN_MK"
      );
      if (!isDosenSkripsi) {
        // cek jika dosen
        const isDosen = await userManagement.findUserByNIKAndRole(
          entry.nik,
          "DOSEN"
        );
        if (isDosen) {
          let name = entry.firstName;
          // Tambahkan lastName jika ada
          if (entry.lastName) {
            name += ` ${entry.lastName}`;
          }
          // Tambahkan degree jika tidak null
          if (entry.degree) {
            name += `, ${entry.degree}`;
          }
          const data = {
            id: entry.id,
            name,
          };
          dosen.push(data);
        }
      }
    }
  }
  return dosen;
};

//===================================================================
// @description     Create dosen skripsi
// @route           POST /employee/dosen-skripsi
// @access          OPERATOR_FILKOM
const createDosenSkripsi = async (payload) => {
  const employee = await employeeRepository.findEmployeeById(
    payload.employee_id
  );
  if (employee) {
    const existingDosenSkripsi = await userManagement.findUserByNIKAndRole(
      employee.nik,
      "DOSEN_MK"
    );
    if (existingDosenSkripsi) {
      throw {
        status: 400,
        message: `Dosen already has a Dosen Skipsi`,
      };
    }
    const dosenSkripsi = await userManagement.inputRoleByNIK(
      employee.nik,
      "DOSEN_MK"
    );
    return dosenSkripsi;
  } else {
    throw {
      status: 400,
      message: `Dosen not found`,
    };
  }
};

//===================================================================
// @description     Delete dosen skripsi by id
// @route           DELETE /employee/dosen-skripsi/:id
// @access          OPERATOR_FILKOM
const deleteDosenSkripsiById = async (id) => {
  await userManagement.deleteRoleById(id);
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployeeById,
  updateOrPatchEmployeeById,

  //-----------skripsi app-----------
  getAllDosenSkripsi,
  getAllDosen,
  createDosenSkripsi,
  deleteDosenSkripsiById,
};
