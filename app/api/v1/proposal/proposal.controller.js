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
  if (!policy.can("read", "document_proposal")) {
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
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN
const getProposalDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "document_proposal")) {
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
  if (!policy.can("read", "document_proposal")) {
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

// const updateProposalPaymentById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const payload = req.body;
//         if (
//             !(
//                 payload.file_name_payment  &&
//                 payload.file_size_payment
//             )
//         ) {
//             return res
//             .status(400)
//             .send({ status: "FAILED", data: { error: "some field is missing" } });
//         }
//         const proposal = await proposalService.updateProposalPaymentById(
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

// const getProposalPaymentById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const proposal = await proposalService.getProposalPaymentById(id);
//         res.send({ status: "OK", data: proposal });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const deleteProposalPaymentById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         await proposalService.deleteProposalPaymentById(id);
//         res.status(200).send({ status: "OK" });
//     } catch (error) {
//         res
//         .status(error?.status || 500)
//         .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const updateProposalPlagiarismById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const payload = req.body;
//         if (
//             !(
//                 payload.file_name_plagiarismcheck  &&
//                 payload.file_size_plagiarismcheck
//             )
//         ) {
//             return res
//             .status(400)
//             .send({ status: "FAILED", data: { error: "some field is missing" } });
//         }
//         const proposal = await proposalService.updateProposalPlagiarismById(
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

// const getProposalPlagiarismById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const proposal = await proposalService.getProposalPlagiarismById(id);
//         res.send({ status: "OK", data: proposal });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const deleteProposalPlagiarismById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         await proposalService.deleteProposalPlagiarismById(id);
//         res.status(200).send({ status: "OK" });
//     } catch (error) {
//         res
//         .status(error?.status || 500)
//         .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const getProposalSchedule = async (req, res) => {
//     try {
//         const proposal = await proposalService.getProposalSchedule();
//         res.send({ status: "OK", data: proposal });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const updateProposalScheduleById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const payload = req.body;
//         if (
//             !(
//                 payload.panelist_chairman  &&
//                 payload.panelist_member &&
//                 payload.start_defence &&
//                 payload.end_defence &&
//                 payload.defence_room &&
//                 payload.defence_date
//             )
//         ) {
//             return res
//             .status(400)
//             .send({ status: "FAILED", data: { error: "some field is missing" } });
//         }
//         const proposal = await proposalService.updateProposalScheduleById(
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

// const getProposalScheduleById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const proposal = await proposalService.getProposalScheduleById(id);
//         res.send({ status: "OK", data: proposal });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

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
  // updateProposalPaymentById,
  // getProposalPaymentById,
  // deleteProposalPaymentById,
  // updateProposalPlagiarismById,
  // getProposalPlagiarismById,
  // deleteProposalPlagiarismById,

  // getProposalSchedule,
  // updateProposalScheduleById,
  // getProposalScheduleById,

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
