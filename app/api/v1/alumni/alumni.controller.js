const alumniService = require("./alumni.service");

//daftar alumni
const getAlumniList = async (req, res) => {
  try {
    const alumniList = await alumniService.getAlumniList();
    res.send({ status: "OK", data: alumniList });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAlumniList,
};
