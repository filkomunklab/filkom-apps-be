const authRepository = require("./auth.repository");
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
      return token;
    } else {
      throw {
        status: 403,
        message: `Invalid Password`,
      };
    }
  } else {
    throw {
      status: 403,
      message: `Invalid Username`,
    };
  }
};

module.exports = {
  signInAdmin,
};
