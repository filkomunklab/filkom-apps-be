//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const proposalService = require("./proposal.service");
const { policyFor } = require("../policy");

//===================================================================
// @description     Upload dokumen proposal
// @route           PUT /proposal/proposal-document/:id
// @access          MAHASISWA
const updateProposalDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_document")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const id = req.params.id;
    const payload = req.body;
    if (!(payload.file_name_proposal && payload.file_size_proposal)) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const proposal = await proposalService.updateProposalDocumentById(
      userId,
      id,
      payload
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get dokumen proposal
// @route           GET /proposal/proposal-document/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getProposalDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_document")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const proposal = await proposalService.getProposalDocumentById(id);
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Delete/Update dokumen proposal
// @route           PUT /proposal/proposal-document/delete/:id
// @access          MAHASISWA
const deleteProposalDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_document")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const id = req.params.id;
    await proposalService.deleteProposalDocumentById(userId, id);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Approve dokumen proposal
// @route           PUT /proposal/proposal-document/approve/:id
// @access          DOSEN
const approveProposalDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "is_proposal_approve")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const id = req.params.id;
    const proposal = await proposalService.approveProposalDocumentById(
      userId,
      id
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Reject dokumen proposal
// @route           PUT /proposal/proposal-document/reject/:id
// @access          DOSEN
const rejectProposalDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "is_proposal_approve")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const id = req.params.id;
    const proposal = await proposalService.rejectProposalDocumentById(
      userId,
      id
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Upload/Update bukti pembayaran
// @route           PUT /proposal/proposal-payment/:id
// @access          MAHASISWA
const updateProposalPaymentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposal_payment")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const payload = req.body;
    if (!(payload.file_name_payment && payload.file_size_payment)) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const proposal = await proposalService.updateProposalPaymentById(
      id,
      userId,
      payload
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get bukti pembayaran
// @route           GET /proposal/proposal-payment/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getProposalPaymentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_payment")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const proposal = await proposalService.getProposalPaymentById(id);
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Delete/Update bukti pembayaran
// @route           PUT /proposal/proposal-payment/delete/:id
// @access          MAHASISWA
const deleteProposalPaymentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposal_payment")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    await proposalService.deleteProposalPaymentById(id, userId);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Upload/Update bukti hasil cek plagiat
// @route           PUT /proposal/proposal-plagiarism-check/:id
// @access          MAHASISWA
const updateProposalPlagiarismById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposal_plagiarism")) {
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
      !(payload.file_name_plagiarismcheck && payload.file_size_plagiarismcheck)
    ) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const proposal = await proposalService.updateProposalPlagiarismById(
      id,
      userId,
      payload
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get bukti hasil cek plagiat
// @route           PUT /proposal/proposal-plagiarism-check/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getProposalPlagiarismById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_plagiarism")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const proposal = await proposalService.getProposalPlagiarismById(id);
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Delete/Update bukti hasil cek plagiat
// @route           PUT /proposal/proposal-plagiarism-check/delete/:id
// @access          MAHASISWA
const deleteProposalPlagiarismById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposal_plagiarism")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    await proposalService.deleteProposalPlagiarismById(id, userId);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get all proposal schedule
// @route           GET /proposal/schedule
// @access          OPERATOR_FAKULTAS
const getAllProposalSchedule = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_schedule")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const proposal = await proposalService.getAllProposalSchedule();
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Create/Update proposal schedule
// @route           POST /proposal/schedule/:id
// @access          OPERATOR_FAKULTAS
const updateProposalScheduleById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposal_schedule")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const payload = req.body;
    if (
      !(
        payload.panelist_chairman_id &&
        payload.panelist_member_id &&
        payload.start_defence &&
        payload.end_defence &&
        payload.defence_room &&
        payload.defence_date
      )
    ) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const proposal = await proposalService.updateProposalScheduleById(
      id,
      payload
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get proposal schedule
// @route           GET /proposal/schedule/:id
// @access          OPERATOR_FAKULTAS
const getProposalScheduleById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_schedule")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const proposal = await proposalService.getProposalScheduleById(id);
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// const openAccessProposalReportById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const proposal = await proposalService.openAccessProposalReportById(id);
//         res.send({ status: "OK", data: proposal });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const getProposalReportById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const proposal = await proposalService.getProposalReportById(id);
//         res.send({ status: "OK", data: proposal });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const signProposalReportById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const proposal = await proposalService.signProposalReportById(id);
//         res.send({ status: "OK", data: proposal });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const updateProposalConclusionById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const payload = req.body;
//         if (
//             !(
//                 payload.exam_conclution  &&
//                 payload.changes_conclusion  &&
//                 payload.assessment_conclution &&
//                 payload.is_pass
//             )
//         ) {
//             return res
//             .status(400)
//             .send({ status: "FAILED", data: { error: "some field is missing" } });
//         }
//         const proposal = await proposalService.updateProposalConclusionById(
//             id,
//             payload
//         );
//         res.send({ status: "OK", data: proposal });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const getProposalConclusionById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const proposal = await proposalService.getProposalConclusionById(id);
//         res.send({ status: "OK", data: proposal });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const updateProposalRevisionDocumentById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const payload = req.body;
//         if (
//             !(
//                 payload.file_name_revision  &&
//                 payload.file_size_revision
//             )
//         ) {
//             return res
//             .status(400)
//             .send({ status: "FAILED", data: { error: "some field is missing" } });
//         }
//         const proposal = await proposalService.updateProposalRevisionDocumentById(
//             id,
//             payload
//         );
//         res.send({ status: "OK", data: proposal });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const getProposalRevisionDocumentById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const proposal = await proposalService.getProposalRevisionDocumentById(id);
//         res.send({ status: "OK", data: proposal });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const deleteProposalRevisionDocumentById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         await proposalService.deleteProposalRevisionDocumentById(id);
//         res.status(200).send({ status: "OK" });
//     } catch (error) {
//         res
//         .status(error?.status || 500)
//         .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const approveProposalRevisionDocumentById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const proposal = await proposalService.approveProposalRevisionDocumentById(id);
//         res.send({ status: "OK", data: proposal });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const rejectProposalRevisionDocumentById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const proposal = await proposalService.rejectProposalRevisionDocumentById(id);
//         res.send({ status: "OK", data: proposal });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

module.exports = {
  updateProposalDocumentById,
  getProposalDocumentById,
  deleteProposalDocumentById,
  approveProposalDocumentById,
  rejectProposalDocumentById,
  updateProposalPaymentById,
  getProposalPaymentById,
  deleteProposalPaymentById,
  updateProposalPlagiarismById,
  getProposalPlagiarismById,
  deleteProposalPlagiarismById,

  getAllProposalSchedule,
  updateProposalScheduleById,
  getProposalScheduleById,

  // openAccessProposalReportById,
  // getProposalReportById,
  // signProposalReportById,
  // updateProposalConclusionById,
  // getProposalConclusionById,

  // updateProposalRevisionDocumentById,
  // getProposalRevisionDocumentById,
  // deleteProposalRevisionDocumentById,
  // approveProposalRevisionDocumentById,
  // rejectProposalRevisionDocumentById,
};
