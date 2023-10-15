const authRepository = require("./auth.repository");
const adminRepository = require("../admin/admin.repository");
const employeeRepository = require("../employee/employee.repository");
const studentRepository = require("../student/student.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../../../config");

const signInAdmin = async (username, password) => {
  const checkUsername = await authRepository.findAdminByUsername(username);

  if (checkUsername) {
    const checkPassword = bcrypt.compareSync(password, checkUsername.password);
    if (checkPassword) {
      const token = jwt.sign(
        {
          user: {
            id: checkUsername.id,
            name: checkUsername.username,
            email: checkUsername.email,
            role: checkUsername.role,
          },
        },
        secretKey
      );
      checkUsername.token = token;
      await adminRepository.updateAdmin(checkUsername.id, checkUsername);
      const data = {
        user: {
          id: checkUsername.id,
          name: checkUsername.username,
          email: checkUsername.email,
          role: checkUsername.role,
        },
        token: token,
      };
      return data;
    } else {
      throw {
        status: 403,
        message: "email or password incorrect",
      };
    }
  } else {
    throw {
      status: 403,
      message: "email or password incorrect",
    };
  }
};

const signOutAdmin = async (token) => {
  const admin = await adminRepository.findAdminByToken(token);
  admin.token = null;
  await adminRepository.updateAdmin(admin.id, admin);
};

const signInEmployee = async (username, password) => {
  const checkUsername = await authRepository.findEmployeeByNik(username);

  if (checkUsername) {
    const role = await authRepository.findRoleById(checkUsername.nik);
    const checkPassword = bcrypt.compareSync(password, checkUsername.password);
    if (checkPassword) {
      const token = jwt.sign(
        {
          user: {
            id: checkUsername.id,
            nik: checkUsername.nik,
            name: `${checkUsername.firstName} ${checkUsername.lastName}`,
            role: role,
          },
        },
        secretKey
      );
      checkUsername.token = token;
      await employeeRepository.updateEmployee(checkUsername.id, checkUsername);
      const data = {
        user: {
          id: checkUsername.id,
          nik: checkUsername.nik,
          name: `${checkUsername.firstName} ${checkUsername.lastName}`,
          role: role,
        },
        token: token,
      };
      return data;
    } else {
      throw {
        status: 403,
        message: "email or password incorrect",
      };
    }
  } else {
    throw {
      status: 403,
      message: "email or password incorrect",
    };
  }
};

const signOutEmployee = async (token) => {
  const employee = await employeeRepository.findEmployeeByToken(token);
  employee.token = null;
  await employeeRepository.updateEmployee(employee.id, employee);
};

const signInStudent = async (username, password) => {
  const checkUsername = await authRepository.findStudentByNim(username);

  if (checkUsername) {
    const role = await authRepository.findRoleById(checkUsername.nim);
    const checkPassword = bcrypt.compareSync(password, checkUsername.password);
    if (checkPassword) {
      const token = jwt.sign(
        {
          user: {
            id: checkUsername.id,
            nim: checkUsername.nim,
            name: `${checkUsername.firstName} ${checkUsername.lastName}`,
            role,
          },
        },
        secretKey
      );
      checkUsername.token = token;
      await studentRepository.updateStudent(checkUsername.id, checkUsername);
      const data = {
        user: {
          id: checkUsername.id,
          nim: checkUsername.nim,
          name: `${checkUsername.firstName} ${checkUsername.lastName}`,
          role,
        },
        token: token,
      };
      return data;
    } else {
      throw {
        status: 403,
        message: "email or password incorrect",
      };
    }
  } else {
    throw {
      status: 403,
      message: "email or password incorrect",
    };
  }
};

const signOutStudent = async (token) => {
  const student = await studentRepository.findStudentByToken(token);
  student.token = null;
  await studentRepository.updateStudent(student.id, student);
};

module.exports = {
  signInAdmin,
  signOutAdmin,
  signInEmployee,
  signOutEmployee,
  signInStudent,
  signOutStudent,
};
