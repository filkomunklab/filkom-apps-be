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

/*============================= PRE-REGIS ACCESS =============================*/
const createOpenPreRegisAccess = async (payload) => {
  try {
    const openAccess = await accessRepository.addOpenPreRegisAccess(payload);
    return openAccess;
  } catch (error) {
    throw error;
  }
};

const setClosePreRegisAccess = async (id) => {
  try {
    const openAccess = await accessRepository.setClosePreRegisAccess(id);
    return openAccess;
  } catch (error) {
    throw error;
  }
};

const viewListPreRegisAccess = async () => {
  try {
    const openAccess = await accessRepository.findListPreRegisAccess();
    return openAccess;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  //GRADE ACCESS
  createOpenGradAccess,
  setGradesAccessClose,
  viewlistGradeAccess,

  //PRE-REGIS ACCESS
  createOpenPreRegisAccess,
  setClosePreRegisAccess,
  viewListPreRegisAccess,
};
