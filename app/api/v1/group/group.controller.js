//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const groupService = require("./group.service");

const getSubmissionListById = async (req, res) => {
    try {
        // get user id
        // const student_id = userid;
        const student_id = "f3fa4d77-0c7b-49a0-b84d-7a9be9b3faf0";
        const group_student = await groupService.getSubmissionListById(student_id);
        res.send({ status: "OK", data: group_student });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

// const getGroupStudentById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const group_student = await groupService.getGroupStudentById(id);
//         res.send({ status: "OK", data: group_student });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const updateMetadataById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const payload = req.body;

//         if (
//             !(
//                 payload.keywords  &&
//                 payload.abstrak  &&
//                 payload.reference
//             )
//         ) {
//             return res
//             .status(400)
//             .send({ status: "FAILED", data: { error: "some field is missing" } });
//         }
//         const group = await groupService.updateMetadataById(
//             id,
//             payload
//         );
//         res.send({ status: "OK", data: group });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const getMetadataById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const group = await groupService.getMetadataById(id);
//         res.send({ status: "OK", data: group });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

module.exports = {
    getSubmissionListById,
    // getGroupStudentById,
    // updateMetadataById,
    // getMetadataById,
}