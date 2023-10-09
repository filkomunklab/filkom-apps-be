//Layer untuk handle business logic

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

module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  deleteAdminById,
  updateOrPatchAdminById,
};
