const preRegisService = require("./preRegis.service");
const { preRegistPolicy } = require("./preRegist.policy");

const getAllPreRegis = async (req, res) => {
  const payload = req.query;
  const policy = preRegistPolicy(req.user);
  try {
    if (!policy.can("read", "allPreRegist")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const preRegis = await preRegisService.getAllPreRegis(payload);
    res.status(200).send({ status: "OK", data: preRegis });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const preRegisMenu = async (req, res) => {
  const payload = req.query;
  const policy = preRegistPolicy(req.user);
  try {
    if (!policy.can("read", "subjects")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const preRegis = await preRegisService.viewPreRegisMenu(payload);
    res.status(201).send({ status: "OK", data: preRegis });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const checkPreRegistAccess = async (req, res) => {
  const payload = req.params;
  const policy = preRegistPolicy(req.user);
  try {
    if (!policy.can("read", "preRegistAccess")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const data = await preRegisService.checkPreRegistAccess(payload);
    res.status(200).send({ status: "OK", data });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: error.errors } });
    }
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createPreRegist = async (req, res) => {
  const payload = req.body;
  const policy = preRegistPolicy(req.user);
  try {
    if (!policy.can("create", "preRegist")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const data = await preRegisService.createPreRegist(payload);
    res.status(201).send({ status: "OK", data });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: error.errors } });
    }
    if (error.code === "P2003") {
      return res.status(404).send({
        status: "FAILED",
        data: { error: "Teacher ID or Curriculum ID Not Found" },
      });
    }

    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const submitPreRegist = async (req, res) => {
  const payload = req.body;
  const policy = preRegistPolicy(req.user);
  try {
    if (!policy.can("create", "submitPreRegist")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const data = await preRegisService.submitPreRegist(payload);
    res.status(201).send({ status: "OK", data });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: error.errors } });
    }
    if (error.code === "P2003") {
      return res.status(404).send({
        status: "FAILED",
        data: {
          error: "Student, Employee, Pre-Registration or Subject ID Not Found",
        },
      });
    }
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const submitApproval = async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  const policy = preRegistPolicy(req.user);
  try {
    if (!policy.can("update", "preRegistApproval")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const data = await preRegisService.submitApproval({ ...payload, id });
    res.status(201).send({ status: "OK", data });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: error.errors } });
    }
    if (error.code === "P2025") {
      return res.status(404).send({
        status: "FAILED",
        data: { error: "Pre-Registration Data Not Found" },
      });
    }

    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getPreRegistListForTeacher = async (req, res) => {
  const payload = req.params;
  const policy = preRegistPolicy(req.user);
  try {
    if (!policy.can("read", "preRegistList")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const data = await preRegisService.getPreRegistListForTeacher(payload);
    res.status(200).send({ status: "OK", data });
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getPreRegistDetails = async (req, res) => {
  const payload = req.params;
  const policy = preRegistPolicy(req.user);
  try {
    if (!policy.can("read", "preRegistDetails")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const data = await preRegisService.getPreRegistDetails(payload);
    res.status(200).send({ status: "OK", data });
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getHistoryForStudent = async (req, res) => {
  const payload = req.params;
  const policy = preRegistPolicy(req.user);
  try {
    if (!policy.can("read", "preRegistHistoryForStudent")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const data = await preRegisService.getHistoryForStudent(payload);
    res.status(200).send({ status: "OK", data });
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getHistoryForAdvisor = async (req, res) => {
  const payload = req.params;
  const policy = preRegistPolicy(req.user);
  try {
    if (!policy.can("read", "preRegistHistoryForAdvisor")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const data = await preRegisService.getHistoryForAdvisor(payload);
    res.status(200).send({ status: "OK", data });
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getCurrentPreRegist = async (req, res) => {
  const payload = req.params;
  try {
    const data = await preRegisService.getCurrentPreRegist(payload);
    res.status(200).send({ status: "OK", data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const patchManualCloseAccess = async (req, res) => {
  const { id } = req.params;
  const policy = preRegistPolicy(req.user);
  try {
    if (!policy.can("update", "closeAccessPreRegist")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const data = await preRegisService.patchManualClosedPreRegist(id);
    res.status(201).send({ status: "OK", data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getCurrentForStudent = async (req, res) => {
  const payload = req.params;
  const policy = preRegistPolicy(req.user);
  try {
    if (!policy.can("read", "preRegistCurrentForStudent")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const data = await preRegisService.getCurrentForStudent(payload);
    res.status(200).send({ status: "OK", data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllSubmitedPreRegist = async (req, res) => {
  const payload = req.params;
  const { major } = req.query;
  const policy = preRegistPolicy(req.user);
  try {
    if (!policy.can("read", "submitedList")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const data = await preRegisService.getAllSubmitedPreRegist(payload, major);
    res.status(200).send({ status: "OK", data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllSubject = async (req, res) => {
  const payload = req.params;
  try {
    const data = await preRegisService.getAllSubject(payload);
    res.status(200).send({ status: "OK", data });
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updatePreRegisAccess = async (req, res) => {
  const payload = req.body;
  const { preRegId } = req.params;
  const policy = preRegistPolicy(req.user);
  try {
    if (!policy.can("update", "preRegistAccess")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const access = await preRegisService.updatePreRegisAccess(
      preRegId,
      payload
    );
    res.status(200).send({ status: "OK", data: access });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getPreRegistListForTeacher,
  getAllSubmitedPreRegist,
  checkPreRegistAccess,
  getHistoryForStudent,
  getCurrentForStudent,
  getHistoryForAdvisor,
  getPreRegistDetails,
  getCurrentPreRegist,
  createPreRegist,
  submitPreRegist,
  getAllPreRegis,
  submitApproval,
  getAllSubject,
  preRegisMenu,
  patchManualCloseAccess,
  updatePreRegisAccess,
};
