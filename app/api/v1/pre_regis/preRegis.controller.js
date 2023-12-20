const preRegisService = require("./preRegis.service");

const preRegisMenu = async (req, res) => {
  const { major, year } = req.body;
  try {
    const preRegis = await preRegisService.viewPreRegisMenu(major, year);
    res.status(201).send({ status: "OK", data: preRegis });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const checkPreRegistAccess = async (req, res) => {
  const payload = req.body;
  try {
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
  try {
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
  try {
    const data = await preRegisService.submitPreRegist(payload);
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
        data: { error: "Student, Employee or Subject ID Not Found" },
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
  try {
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

module.exports = {
  preRegisMenu,
  checkPreRegistAccess,
  createPreRegist,
  submitPreRegist,
  submitApproval,
};
