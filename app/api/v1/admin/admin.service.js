//handle businnes logic
const adminRepository = require("./admin.repository");

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
  const admin = await adminRepository.insertAdmin(payload);
  return admin;
};

const deleteAdminById = async (id) => {
  await getAdminById(id);
  await adminRepository.deleteAdmin(id);
};

const updateOrPatchAdminById = async (id, payload) => {
  await getAdminById(id);
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
