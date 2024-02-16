const accessService = require("./open_access.service");
const { policyFor } = require("../policy");

/*=============================== GRADES ACCESS =============================*/

//create access for grades input
const openGradeAccess = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("create", "open_grades_access")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

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

//list created grades access for Kaprodi
const getlistGradeAccessByMajor = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "list_created_access")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const { major } = req.params;
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
  const policy = policyFor(req.user);
  if (!policy.can("update", "grades_close_access")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

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
  const policy = policyFor(req.user);
  if (!policy.can("read", "grades_check_access")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

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

//list grades access for dekan
const getlistGradeAccess = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "grades_access_dekan")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  try {
    const openAccess = await accessService.viewlistGradeAccess();
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
  getlistGradeAccessByMajor,
};
