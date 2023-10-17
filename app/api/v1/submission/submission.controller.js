//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const submissionService = require("./submission.service");
const { policyFor } = require("../policy");

// const getAllSubmission = async (req, res) => {
//     const submission = await submissionService.getAllSubmission();
//     res.send({ status: "OK", data: submission });
// };

// const deleteSubmissionById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         await submissionService.deleteSubmissionById(id);
//         res.status(200).send({ status: "OK" });
//     } catch (error) {
//         res
//         .status(error?.status || 500)
//         .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const deleteAllSubmission = async (req, res) => {
//     try {
//         await submissionService.deleteAllSubmission();
//         res.status(200).send({ status: "OK" });
//     } catch (error) {
//         res
//         .status(error?.status || 500)
//         .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

const createSubmission = async (req, res) => {
    try {
        const policy = policyFor(req.user);
        if (policy.can("create", "Submission")) {
            const userId = req.user.user.id;
            const payload = req.body;
            if (
                !(
                    payload.title &&
                    payload.file_name  &&
                    payload.file_size &&
                    payload.is_consultation &&
                    payload.proposed_advisor
                )
            ) {
                return res
                .status(400)
                .send({ status: "FAILED", data: { error: "Some field is missing" } });
            }
            const submission = await submissionService.createSubmission(userId, payload);
            res.status(201).send({ status: "OK", data: submission });
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

const getSubmissionById = async (req, res) => {
    try {
        const policy = policyFor(req.user);
        if (policy.can("read", "Submission")) {
            const id = req.params.id;
            const submission = await submissionService.getSubmissionById(id);
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

// const updateSubmissionById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const payload = req.body;

//         if (
//             !(
//                 payload.file_name  &&
//                 payload.file_size  &&
//                 payload.is_consultation  &&
//                 payload.proposed_advisor  &&
//                 payload.proposed_co_advisor1  &&
//                 payload.proposed_co_advisor2
//             )
//         ) {
//             return res
//             .status(400)
//             .send({ status: "FAILED", data: { error: "some field is missing" } });
//         }
//         const submission = await submissionService.updateSubmissionById(
//             id,
//             payload
//         );
//         res.send({ status: "OK", data: submission });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const updateAdvisorAndOrCoAdvisorById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const payload = req.body;

//         if (
//             !(
//                 payload.proposed_advisor  &&
//                 payload.proposed_co_advisor1  &&
//                 payload.proposed_co_advisor2
//             )
//         ) {
//             return res
//             .status(400)
//             .send({ status: "FAILED", data: { error: "some field is missing" } });
//         }
//         const submission = await submissionService.updateAdvisorAndOrCoAdvisorById(
//             id,
//             payload
//         );
//         res.send({ status: "OK", data: submission });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const approveSubmissionById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const submission = await submissionService.approveSubmissionById(
//             id
//         );
//         res.send({ status: "OK", data: submission });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const rejectSubmissionById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const submission = await submissionService.rejectSubmissionById(
//             id
//         );
//         res.send({ status: "OK", data: submission });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const updateGroupTitleById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const payload = req.body;

//         if (
//             !( payload.title )
//         ) {
//             return res
//             .status(400)
//             .send({ status: "FAILED", data: { error: "some field is missing" } });
//         }
//         const submission = await submissionService.updateGroupTitleById(
//             id,
//             payload
//         );
//         res.send({ status: "OK", data: submission });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

module.exports = {
    // getAllSubmission,
    // deleteSubmissionById,
    // deleteAllSubmission,
    createSubmission,
    getSubmissionById,
    // updateSubmissionById,
    // updateAdvisorAndOrCoAdvisorById,
    // approveSubmissionById,
    // rejectSubmissionById,
    // updateGroupTitleById,
};