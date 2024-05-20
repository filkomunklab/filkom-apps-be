const accessRepository = require("./open_access.repository");

/*=============================== GRADES ACCESS =============================*/
//creat access for grades input
const createOpenGradAccess = async (payload) => {
  try {
    const openAccess = await accessRepository.addOpenGradesAccess(payload);
    return openAccess;
  } catch (error) {
    throw error;
  }
};

//close access for grades input
const setGradesAccessClose = async (id) => {
  try {
    const openAccess = await accessRepository.setCloseGradesAccess(id);
    return openAccess;
  } catch (error) {
    throw error;
  }
};

//list grades for dekan
const viewlistGradeAccess = async () => {
  try {
    const openAccess = await accessRepository.findlistGradesAccess();
    return openAccess;
  } catch (error) {
    throw error;
  }
};

//list grades for kaprodi
const viewlistGradeAccessByMajor = async (major) => {
  try {
    const openAccess = await accessRepository.findlistGradesAccessByMajor(
      major
    );
    return openAccess;
  } catch (error) {
    throw error;
  }
};

//cek access
const viewToCheckOpenGradeAccess = async (major) => {
  try {
    return await accessRepository.findToCheckOpenGradesAccess(major);
  } catch (error) {
    throw error;
  }
};

const updateAccess = async (accessId, payload) => {
  return await accessRepository.updateAccess(accessId, payload);
};

module.exports = {
  createOpenGradAccess,
  setGradesAccessClose,
  viewlistGradeAccess,
  viewToCheckOpenGradeAccess,
  viewlistGradeAccessByMajor,
  updateAccess,
};
