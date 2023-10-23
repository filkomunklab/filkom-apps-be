//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const submissionService = require("./submission.service");
const { policyFor } = require("../policy");

//===================================================================
// @description     Create submission
// @route           POST /submission
// @access          MAHASISWA
const createSubmission = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("create", "Submission")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const payload = req.body;
    if (
      !(
        payload.title &&
        payload.file_name &&
        payload.file_size &&
        payload.is_consultation &&
        payload.proposed_advisor_id &&
        payload.classroom_id
      )
    ) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "Some field is missing" } });
    }
    const submission = await submissionService.createSubmission(
      userId,
      payload
    );
    res.status(201).send({ status: "OK", data: submission });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get submission
// @route           GET /submission/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN
const getSubmissionById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "Submission")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const submission = await submissionService.getSubmissionById(id);
    res.send({ status: "OK", data: submission });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Update submission
// @route           PUT /submission/:id
// @access          MAHASISWA
const updateSubmissionById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "Submission")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const payload = req.body;
    if (
      !(
        payload.title &&
        payload.file_name &&
        payload.file_size &&
        payload.is_consultation &&
        payload.proposed_advisor_id
      )
    ) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const submission = await submissionService.updateSubmissionById(
      id,
      userId,
      payload
    );
    res.send({ status: "OK", data: submission });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Change advisor, co-advisor
// @route           PUT /submission/advisor-and-co-advisor/:id
// @access          DOSEN_MK
const updateAdvisorAndCoAdvisorById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposed_advisor_and_co_advisor")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const payload = req.body;
    if (!payload.proposed_advisor_id) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const submission = await submissionService.updateAdvisorAndCoAdvisorById(
      id,
      userId,
      payload
    );
    res.send({ status: "OK", data: submission });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Approve pengajuan judul
// @route           PUT /submission/approve/:id
// @access          DOSEN_MK
const approveSubmissionById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "approve_submission")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const submission = await submissionService.approveSubmissionById(
      id,
      userId
    );
    res.send({ status: "OK", data: submission });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Reject pengajuan judul
// @route           PUT /submission/reject/:id
// @access          DOSEN_MK
const rejectSubmissionById = async (req, res) => {
  try {
    const policy = policyFor(req.user);
    if (policy.can("update", "approve_submission")) {
      const id = req.params.id;
      const userId = req.user.user.id;
      const submission = await submissionService.rejectSubmissionById(
        id,
        userId
      );
      res.send({ status: "OK", data: submission });
    } else {
      res.status(403).send({
        status: "FAILED",
        data: { message: "You don't have permission to perform this action" },
      });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Change title in group
// @route           PUT /submission/title/:id
// @access          MAHASISWA
const updateSubmissionTitleById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "title")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const payload = req.body;

    if (!payload.title) {
      return res.status(400).send({
        status: "FAILED",
        data: { error: "title field is missing" },
      });
    }
    const submission = await submissionService.updateSubmissionTitleById(
      id,
      userId,
      payload
    );
    res.send({ status: "OK", data: submission });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  // getAllSubmission,
  // deleteSubmissionById,
  // deleteAllSubmission,
  createSubmission,
  getSubmissionById,
  updateSubmissionById,
  updateAdvisorAndCoAdvisorById,
  approveSubmissionById,
  rejectSubmissionById,
  updateSubmissionTitleById,
};
