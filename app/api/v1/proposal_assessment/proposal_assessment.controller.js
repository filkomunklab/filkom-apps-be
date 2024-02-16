//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const proposalAssessmentService = require("./proposal_assessment.service");
const { policyFor } = require("../policy");

// //===================================================================
// // @description     Create proposal assessment
// // @route           POST /proposal-assessment
// // @access          DOSEN
// const createProposalAssessment = async (req, res) => {
//   const policy = policyFor(req.user);
//   if (!policy.can("create", "Proposal_Assessment")) {
//     return res.status(401).send({
//       status: "FAILED",
//       data: { error: "You don't have permission to perform this action" },
//     });
//   }
//   try {
//     const userId = req.user.user.id;
//     const payload = req.body;
//     if (!payload.proposal_id && payload.student_id && payload.value) {
//       return res
//         .status(400)
//         .send({ status: "FAILED", data: { error: "Some field is missing" } });
//     }
//     const proposalAssessment =
//       await proposalAssessmentService.createProposalAssessment(userId, payload);
//     res.status(201).send({ status: "OK", data: proposalAssessment });
//   } catch (error) {
//     res
//       .status(error?.status || 500)
//       .send({ status: "FAILED", data: { error: error?.message || error } });
//   }
// };

module.exports = {
  // createProposalAssessment,
};
