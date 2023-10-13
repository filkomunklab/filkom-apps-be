const authRepository = require("./auth.repository");
const adminRepository = require("../admin/admin.repository");
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
            nik: checkUsername.nik,
            name: `${checkUsername.firstName} ${checkUsername.lastName}`,
            role: role,
          },
        },
        secretKey
      );
      const data = {
        user: {
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

const signInStudent = async (username, password) => {
  const checkUsername = await authRepository.findStudentByNim(username);

  if (checkUsername) {
    const role = await authRepository.findRoleById(checkUsername.nim);
    const checkPassword = bcrypt.compareSync(password, checkUsername.password);
    if (checkPassword) {
      const token = jwt.sign(
        {
          user: {
            nim: checkUsername.nim,
            name: `${checkUsername.firstName} ${checkUsername.lastName}`,
            role,
          },
        },
        secretKey
      );
      const data = {
        user: {
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

module.exports = {
  signInAdmin,
  signOutAdmin,
  signInEmployee,
  signInStudent,
};
