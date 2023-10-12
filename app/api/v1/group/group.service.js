//Layer untuk handle business logic

const groupRepository = require("./group.repository");

const getSubmissionListById = async (student_id) => {
    const student_group = await groupRepository.findSubmissionListById(student_id);
    if (!student_group) {
      throw {
        status: 400,
        message: `Not found`,
      };
    }
    return student_group;
};

// const getGroupStudentById = async (id) => {
//     const student_group = await groupRepository.findGroupStudentById(id);
//     if (!student_group) {
//       throw {
//         status: 400,
//         message: `Not found`,
//       };
//     }
//     return student_group;
// };

// const updateMetadataById = async (id, payload) => {
//     await getGroupById(id);
  
//     const group = await groupRepository.updateMetadata(id, payload);
//     return group;
// };

// const getMetadataById = async (id) => {
//     const group = await groupRepository.findMetadataById(id);
//     if (!group) {
//       throw {
//         status: 400,
//         message: `Not found`,
//       };
//     }
//     return group;
// };

module.exports = {
    getSubmissionListById,
    // getGroupStudentById,
    // updateMetadataById,
    // getMetadataById,
}