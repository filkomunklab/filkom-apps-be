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

const signInEmployee = async (nik, password) => {
  const checkNIK = await authRepository.findEmployeeByNik(nik);

  if (checkNIK) {
    const role = await authRepository.findRolesByUserId(checkNIK.nik);
    const checkPassword = bcrypt.compareSync(password, checkNIK.password);
    if (checkPassword) {
      const token = jwt.sign(
        {
          user: {
            nik: checkNIK.nik,
            name: `${checkNIK.firstName} ${checkNIK.lastName}`,
            role: role,
          },
        },
        secretKey
      );
      checkNIK.token = token;
      await employeeRepository.updateEmployee(checkNIK.id, checkNIK);
      const data = {
        user: {
          nik: checkNIK.nik,
          name: `${checkNIK.firstName} ${checkNIK.lastName}`,
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

const signInStudent = async (nim, password) => {
  const checkNIM = await authRepository.findStudentByNim(nim);

  if (checkNIM) {
    const role = await authRepository.findRolesByUserId(checkNIM.nim);
    const checkPassword = bcrypt.compareSync(password, checkNIM.password);
    if (checkPassword) {
      const token = jwt.sign(
        {
          user: {
            nim: checkNIM.nim,
            name: `${checkNIM.firstName} ${checkNIM.lastName}`,
            role: role,
          },
        },
        secretKey
      );
      checkNIM.token = token;
      await studentRepository.updateStudent(checkNIM.id, checkNIM);
      const data = {
        user: {
          nim: checkNIM.nim,
          name: `${checkNIM.firstName} ${checkNIM.lastName}`,
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

module.exports = {
  signInAdmin,
  signOutAdmin,
  signInEmployee,
  signInStudent,
};
