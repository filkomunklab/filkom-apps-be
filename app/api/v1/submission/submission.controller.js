//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const submissionService = require("./submission.service");

const getAllSubmission = async (req, res) => {
    const submission = await submissionService.getAllSubmission();
    res.send({ status: "OK", data: submission });
};

const deleteSubmissionById = async (req, res) => {
    try {
        const id = req.params.id;
        await submissionService.deleteSubmissionById(id);
        res.status(200).send({ status: "OK" });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteAllSubmission = async (req, res) => {
    try {
        await submissionService.deleteAllSubmission();
        res.status(200).send({ status: "OK" });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

// const getSubmissionStatusById = async (req, res) => {
//     const submission = await submissionService.getSubmissionStatusById();
//     res.send({ status: "OK", data: submission });
// };

const createSubmission = async (req, res) => {
    const payload = req.body;
    const submission = await submissionService.createSubmission(payload);
    res.status(201).send({ status: "OK", data: submission });
};

const getSubmissionById = async (req, res) => {
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

const updateSubmissionById = async (req, res) => {
    try {
        const id = req.params.id;
        const payload = req.body;

        if (
            !(
                payload.file_name  &&
                payload.file_size  &&
                payload.is_consultation  &&
                payload.proposed_advisor  &&
                payload.proposed_co_advisor1  &&
                payload.proposed_co_advisor2
            )
        ) {
            return res
            .status(400)
            .send({ status: "FAILED", data: { error: "some field is missing" } });
        }
        const submission = await submissionService.updateSubmissionById(
            id,
            payload
        );
        res.send({ status: "OK", data: submission });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateAdvisorAndOrCoAdvisorById = async (req, res) => {
    try {
        const id = req.params.id;
        const payload = req.body;

        if (
            !(
                payload.proposed_advisor  &&
                payload.proposed_co_advisor1  &&
                payload.proposed_co_advisor2
            )
        ) {
            return res
            .status(400)
            .send({ status: "FAILED", data: { error: "some field is missing" } });
        }
        const submission = await submissionService.updateAdvisorAndOrCoAdvisorById(
            id,
            payload
        );
        res.send({ status: "OK", data: submission });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const approveSubmissionById = async (req, res) => {
    try {
        const id = req.params.id;
        const submission = await submissionService.approveSubmissionById(
            id
        );
        res.send({ status: "OK", data: submission });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const rejectSubmissionById = async (req, res) => {
    try {
        const id = req.params.id;
        const submission = await submissionService.rejectSubmissionById(
            id
        );
        res.send({ status: "OK", data: submission });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    getAllSubmission,
    deleteSubmissionById,
    deleteAllSubmission,
    // getSubmissionStatusById,
    createSubmission,
    getSubmissionById,
    updateSubmissionById,
    updateAdvisorAndOrCoAdvisorById,
    approveSubmissionById,
    rejectSubmissionById,
};