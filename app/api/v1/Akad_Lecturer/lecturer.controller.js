const lecturerService = require("./lecturer.service");

const getAllLecturer = async (req, res) => {
  try {
    const data = await lecturerService.getAllLecturer();
    res.send({ status: "OK", data: data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllLecturer,
};
