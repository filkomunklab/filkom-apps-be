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
      return token;
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

module.exports = {
  signInAdmin,
  signOutAdmin,
};
