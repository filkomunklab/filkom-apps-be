const accessRepository = require("./open_access.repository");

// const createOpenAccessTodb = async (payload) => {
//   try {
//     const openAccess = await openRepository.addOpenAccessTodb(payload);
//     return openAccess;
//   } catch (error) {
//     throw error;
//   }
// };

// const patchSetOpenAccess = async (id, set_access) => {
//   try {
//     return openRepository.changeSetAccess(id, set_access);
//   } catch (error) {
//     throw error;
//   }
// };

const createOpenGradAccess = async (payload) => {
  try {
    const openAccess = await accessRepository.addOpenGradesAccess(payload);
    return openAccess;
  } catch (error) {
    throw error;
  }
};

const setGradesAccessClose = async (id, isOpen) => {
  try {
    const openAccess = await accessRepository.setCloseGradesAccess(id, isOpen);
    return openAccess;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  //   createOpenAccessTodb,
  //   patchSetOpenAccess,
  createOpenGradAccess,
  setGradesAccessClose,
};
