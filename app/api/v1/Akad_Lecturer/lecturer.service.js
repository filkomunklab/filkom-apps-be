const lecturerRepository = require("./lecturer.repository");

const getAllLecturer = async () => {
  return await lecturerRepository.getAllLecturer();
};

module.exports = {
  getAllLecturer,
};
