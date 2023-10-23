const alumniRepository = require("./alumni.repository");

//daftar alumni
const getAlumniList = async () => {
  return alumniRepository.getAlumniList();
};

module.exports = {
  getAlumniList,
};
