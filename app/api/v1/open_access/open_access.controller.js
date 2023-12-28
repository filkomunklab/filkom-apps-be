const accessService = require("./open_access.service");

/*=============================== GRADES ACCESS =============================*/

//create access for grades input
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

//list grades for dekan
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

const getlistGradeAccessByMajor = async (req, res) => {
  const {major} = req.params;
  try {
    const openAccess = await accessService.viewlistGradeAccessByMajor(major);
    res.status(200).send({ status: "OK", data: openAccess });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//close access for grades input
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

//cek access
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
  getlistGradeAccessByMajor
};
