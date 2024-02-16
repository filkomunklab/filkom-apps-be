//Layer untuk handle business logic

const { createHttpStatusError } = require("../../../utils");
const adminRepository = require("./admin.repository");
const bcrypt = require("bcrypt");

const getAllAdmins = async () => {
  const admin = await adminRepository.findAdmins();
  return admin;
};

const getAdminById = async (id) => {
  const admin = await adminRepository.findAdminById(id);
  if (!admin) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return admin;
};

const createAdmin = async (payload) => {
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(payload.password, salt);
  payload = { ...payload, password };
  const admin = await adminRepository.insertAdmin(payload);
  return admin;
};

const deleteAdminById = async (id) => {
  await getAdminById(id);
  await adminRepository.deleteAdmin(id);
};

const updateOrPatchAdminById = async (id, payload) => {
  await getAdminById(id);
  if (payload.password) {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(payload.password, salt);
    payload = { ...payload, password };
  }

  const admin = await adminRepository.updateAdmin(id, payload);
  return admin;
};

const changePasswordByAdmin = async (id, payload) => {
  try {
    const admin = await adminRepository.findAdminById(id);

    if (!admin) {
      throw createHttpStatusError("Your Account is not found!!");
    }

    const checkPassword = bcrypt.compareSync(
      payload.oldPassword,
      admin.password
    );

    if (checkPassword) {
      if (payload.newPassword === payload.confirmationNewPassword) {
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(payload.newPassword, salt);

        const updatePasswordAdmin = await adminRepository.updatePasswordAdmin(
          id,
          password
        );

        return updatePasswordAdmin;
      } else {
        throw createHttpStatusError(
          "New Password and Confirmation Do Not Match",
          400
        );
      }
    } else {
      throw createHttpStatusError("Incorrect Old Password", 400);
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  deleteAdminById,
  updateOrPatchAdminById,
  changePasswordByAdmin,
};
