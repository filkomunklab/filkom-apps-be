//Layer untuk handle business logic

const submissionRepository = require("./submission.repository");
const groupRepository = require("../group/group.repository");
const groupStudentRepository = require("../group_student/group_student.repository");
const studentRepository = require("../student/student.repository");
const thesisStudentRepository = require("../thesis_student/thesis_student.repository");
const employeeRepository = require("../employee/employee.repository");

// const getAllSubmission = async () => {
//   const submission = await submissionRepository.findAllSubmission();
//   return submission;
// };

// const deleteSubmissionById = async (id) => {
//   await getSubmissionById(id);
//   await submissionRepository.deleteSubmission(id);
// };

// const deleteAllSubmission = async () => {
//   await submissionRepository.deleteAllSubmission();
// };

const getThesisStudentById = async (student_id) => {
  const thesis_student = await thesisStudentRepository.findThesisStudentByStudentId(student_id);
  if (!thesis_student) {
    throw {
      status: 400,
      message: `Student Not found`,
    };
  }
  return thesis_student;
};

const getDosenById = async (id) => {
  const dosen = await employeeRepository.findEmployeeById(id);
  if (!dosen) {
    throw {
      status: 400,
      message: `Dosen not found`,
    };
  }
  return dosen;
};

const createSubmission = async (userId, payload) => {
  const { partner1, partner2, partner3,
          proposed_advisor, proposed_co_advisor1, proposed_co_advisor2 } = payload;
  // mengecek student
  if (partner1) {
    await getThesisStudentById(partner1);
  }
  if (partner2) {
    await getThesisStudentById(partner2);
  }
  if (partner3) {
    await getThesisStudentById(partner3);
  }

  // mengecek dosen
  if (proposed_advisor) {
    await getDosenById(proposed_advisor);
  }
  if (proposed_co_advisor1) {
    await getDosenById(proposed_co_advisor1);
  }
  if (proposed_co_advisor2) {
    await getDosenById(proposed_co_advisor2);
  }

  // mengambil proposal_classroom dari user
  const proposalClassroom = await thesisStudentRepository.findThesisStudentByStudentId(userId);
  const { proposal_class_id: classroom_id } = proposalClassroom;

  // create submission
  const submission = await submissionRepository.insertSubmission(classroom_id, payload);
  const { id: submission_id } = submission;

  // create group
  const group = await groupRepository.insertGroup(payload, submission_id);
  const { id: group_id } = group;

  // Memeriksa apakah partner1, partner2, dan partner3 adalah sama satu sama lain (tidak bole null)
  if ((partner1 && partner1 === partner2) || (partner2 && partner2 === partner3) || (partner1 && partner1 === partner3)) {
    throw {
      status: 400,
      message: `Terdapat partner yang sama`,
    };
  }

  // mengelompokkan mahasiswa
  await Promise.all([
                groupStudentRepository.insertGroupStudent({ group_id, student_id: userId }),
    partner1 && groupStudentRepository.insertGroupStudent({ group_id, student_id: partner1 }),
    partner2 && groupStudentRepository.insertGroupStudent({ group_id, student_id: partner2 }),
    partner3 && groupStudentRepository.insertGroupStudent({ group_id, student_id: partner3 }),
  ]);

  const groupData = {
    id: group.submission_id,
    title: group.title,
    file_name: submission.file_name,
    upload_date: submission.upload_date,
    file_size: submission.file_size,
    is_consultation: submission.is_consultation,
    proposed_advisor: submission.proposed_advisor,
    proposed_co_advisor1: submission.proposed_co_advisor1,
    proposed_co_advisor2: submission.proposed_co_advisor2,
    classroom_id: submission.classroom_id,
  }
  return groupData;
};

const getGroupStudentByGroupId = async (group_id) => {
  const groupStudent = await groupStudentRepository.findGroupStudentByGroupId(group_id);
  if (!groupStudent) {
    throw {
      status: 400,
      message: `Group student not found`,
    };
  }
  return groupStudent;
};

const getStudentById = async (student_id) => {
  const student = await studentRepository.findStudentById(student_id);
  if (!student) {
    throw {
      status: 400,
      message: `Student Not found`,
    };
  }
  return student;
};

const getGroupById = async (submission_id) => {
  const group = await groupRepository.findGroupById(submission_id);
  if (!group) {
    throw {
      status: 400,
      message: `Group Not found`,
    };
  }
  return group;
};

const getSubmissionById = async (id) => {
  const submission = await submissionRepository.findSubmissionById(id);
  if (!submission) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  const { id: submission_id} = submission;
  // cari group dari submission
  const group = await getGroupById(submission_id);
  const { id: group_id} = group;
  // cari group student dari group
  const groupStudent = await getGroupStudentByGroupId(group_id);
  const students = await Promise.all(
    groupStudent.map(async (student_id) => {
      // cari student dari group_student
      const student = await getStudentById(student_id);
      if (student) {
        // Menggabungkan firstName dan lastName menjadi fullName
        const fullName = `${student.firstName} ${student.lastName || ''}`;
        console.log(`Student ID: ${student_id}, FullName: ${fullName}, Nim: ${student.nim}, Major: ${student.major}`);
        return {
          fullName: fullName,
          nim: student.nim,
          major: student.major,
        };
      }
    })
  );
  const groupData = {
    id: group.submission_id,
    title: group.title,
    students,
    file_name: submission.file_name,
    upload_date: submission.upload_date,
    file_size: submission.file_size,
    is_consultation: submission.is_consultation,
    proposed_advisor: submission.proposed_advisor,
    proposed_co_advisor1: submission.proposed_co_advisor1,
    proposed_co_advisor2: submission.proposed_co_advisor2,
    is_approve: submission.is_approve,
    classroom_id: submission.classroom_id,
  }
  return groupData;
};

// const updateSubmissionById = async (id, payload) => {
//   await getSubmissionById(id);

//   const submission = await submissionRepository.updateSubmission(id, payload);
//   return submission;
// };

// const updateAdvisorAndOrCoAdvisorById = async (id, payload) => {
//   await getSubmissionById(id);

//   const submission = await submissionRepository.updateAdvisorAndOrCoAdvisor(id, payload);
//   return submission;
// };

// const approveSubmissionById = async (id) => {
//   await getSubmissionById(id);

//   const submission = await submissionRepository.approveSubmission(id);
//   return submission;
// };

// const rejectSubmissionById = async (id) => {
//   await getSubmissionById(id);

//   const submission = await submissionRepository.rejectSubmission(id);
//   return submission;
// };

// const updateGroupTitleById = async (id, payload) => {
//   await getSubmissionById(id);

//   const submission = await submissionRepository.updateGroupTitle(id, payload);
//   return submission;
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
}