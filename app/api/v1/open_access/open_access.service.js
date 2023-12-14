const accessRepository = require("./open_access.repository");

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

const viewlistGradeAccess = async () => {
  try {
    const openAccess = await accessRepository.findlistGradesAccess();
    return openAccess;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOpenGradAccess,
  setGradesAccessClose,
  viewlistGradeAccess,
};
