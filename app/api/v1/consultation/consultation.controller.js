//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const consultationChangesService = require("./consultation.service");
const { policyFor } = require("../policy");

//===================================================================
// @description     Create consultation
// @route           POST /consultation
// @access          DOSEN
const createConsultation = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("create", "Consultation")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const payload = req.body;
    if (!payload.group_id && payload.description && payload.date) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "Some field is missing" } });
    }
    const consultation = await consultationChangesService.createConsultation(
      userId,
      payload
    );
    res.status(201).send({ status: "OK", data: consultation });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get all consultation by group id
// @route           GET /consultation/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getAllConsultationByGroupId = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "Consultation")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const consultation =
      await consultationChangesService.getAllConsultationByGroupId(id);
    res.send({ status: "OK", data: consultation });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  createConsultation,
  getAllConsultationByGroupId,
};
