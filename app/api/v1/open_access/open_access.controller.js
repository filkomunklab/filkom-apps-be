const accessService = require("./open_access.service");

/*=============================== GRADES ACCESS =============================*/
const openGradeAccess = async (req, res) => {
  const payload = req.body;
  try {
    const openAccess = await accessService.createOpenGradAccess(payload);
    res.status(201).send({ status: "OK", data: openAccess });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getlistGradeAccess = async (req, res) => {
  try {
    const openAccess = await accessService.viewlistGradeAccess();
    res.status(200).send({ status: "OK", data: openAccess });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const closeGradesAccess = async (req, res) => {
  const { id } = req.params;
  try {
    const openAccess = await accessService.setGradesAccessClose(id);
    res.status(201).send({ status: "OK", data: openAccess });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const checkingOpenGradeAccess = async (req, res) => {
  const { major } = req.params;
  try {
    const openAccess = await accessService.viewToCheckOpenGradeAccess(major);
    res.status(200).send({ status: "OK", data: openAccess });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  //GRADE ACCESS
  openGradeAccess,
  closeGradesAccess,
  getlistGradeAccess,
  checkingOpenGradeAccess,
};
