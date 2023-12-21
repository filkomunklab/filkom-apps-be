const accessRepository = require("./open_access.repository");

/*=============================== GRADES ACCESS =============================*/
const createOpenGradAccess = async (payload) => {
  try {
    const openAccess = await accessRepository.addOpenGradesAccess(payload);
    return openAccess;
  } catch (error) {
    throw error;
  }
};

const setGradesAccessClose = async (id) => {
  try {
    const openAccess = await accessRepository.setCloseGradesAccess(id);
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

const viewToCheckOpenGradeAccess = async (major) => {
  try {
    return await accessRepository.findToCheckOpenGradesAccess(major);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOpenGradAccess,
  setGradesAccessClose,
  viewlistGradeAccess,
  viewToCheckOpenGradeAccess,
};
