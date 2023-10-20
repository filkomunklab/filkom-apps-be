//Layer untuk handle business logic

const submissionRepository = require("./submission.repository");
const groupRepository = require("../group/group.repository");
const groupStudentRepository = require("../group_student/group_student.repository");
const studentRepository = require("../student/student.repository");
const employeeRepository = require("../employee/employee.repository");
const proposalRepository = require("../proposal/proposal.repository");
const proposalStudentRepository = require("../proposal_student/proposal_student.repository");
const skripsiRepository = require("../skripsi/skripsi.repository");
const skripsiStudentRepository = require("../skripsi_student/skripsi_student.repository");
const classroomRepository = require("../classroom/classroom.repository");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get dosen by id
// @used            createSubmission, updateSubmissionById,
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

//===================================================================
// @description     Create submission
// @route           POST /submission
// @access          MAHASISWA
const createSubmission = async (userId, payload) => {
  const {
    partner1,
    partner2,
    partner3,
    proposed_advisor_id,
    proposed_co_advisor1_id,
    proposed_co_advisor2_id,
  } = payload;

  // check user/student in classroom
  const proposalStudent =
    await proposalStudentRepository.findStudentProposalByStudentIdAndClassroomId(
      userId,
      payload.classroom_id
    );
  const skripsiStudent =
    await skripsiStudentRepository.findStudentSkripsiByStudentIdAndClassroomId(
      userId,
      payload.classroom_id
    );

  if (!proposalStudent && !skripsiStudent) {
    throw {
      status: 400,
      message: `You are not enrolled in classroom`,
    };
  }

  // Memeriksa apakah partner1, partner2, dan partner3 adalah sama satu sama lain (tidak bole null)
  if (
    (partner1 && partner1 === partner2) ||
    (partner2 && partner2 === partner3) ||
    (partner1 && partner1 === partner3)
  ) {
    throw {
      status: 400,
      message: `There are the same partners`,
    };
  }

  // mengecek student
  if (partner1) {
    // check partner in the same classroom
    const proposalStudent =
      await proposalStudentRepository.findStudentProposalByStudentIdAndClassroomId(
        partner1,
        payload.classroom_id
      );
    const skripsiStudent =
      await skripsiStudentRepository.findStudentSkripsiByStudentIdAndClassroomId(
        partner1,
        payload.classroom_id
      );
    if (!proposalStudent && !skripsiStudent) {
      throw {
        status: 400,
        message: `Partner1 is not registered in the class`,
      };
    }
  }
  if (partner2) {
    // check partner in the same classroom
    const proposalStudent =
      await proposalStudentRepository.findStudentProposalByStudentIdAndClassroomId(
        partner2,
        payload.classroom_id
      );
    const skripsiStudent =
      await skripsiStudentRepository.findStudentSkripsiByStudentIdAndClassroomId(
        partner2,
        payload.classroom_id
      );
    if (!proposalStudent && !skripsiStudent) {
      throw {
        status: 400,
        message: `Partner2 is not registered in the class`,
      };
    }
  }
  if (partner3) {
    // check partner in the same classroom
    const proposalStudent =
      await proposalStudentRepository.findStudentProposalByStudentIdAndClassroomId(
        partner3,
        payload.classroom_id
      );
    const skripsiStudent =
      await skripsiStudentRepository.findStudentSkripsiByStudentIdAndClassroomId(
        partner3,
        payload.classroom_id
      );
    if (!proposalStudent && !skripsiStudent) {
      throw {
        status: 400,
        message: `Partner3 is not registered in the class`,
      };
    }
  }

  // mengecek dosen
  if (proposed_advisor_id) {
    await getDosenById(proposed_advisor_id);
  }
  if (proposed_co_advisor1_id) {
    await getDosenById(proposed_co_advisor1_id);
  }
  if (proposed_co_advisor2_id) {
    await getDosenById(proposed_co_advisor2_id);
  }

  // create submission
  const submission = await submissionRepository.insertSubmission(payload);

  // create group
  const group = await groupRepository.insertGroup(payload, submission.id);
  const { id: group_id } = group;

  // mengelompokkan mahasiswa
  await Promise.all([
    groupStudentRepository.insertGroupStudent({ group_id, student_id: userId }),
    partner1 &&
      groupStudentRepository.insertGroupStudent({
        group_id,
        student_id: partner1,
      }),
    partner2 &&
      groupStudentRepository.insertGroupStudent({
        group_id,
        student_id: partner2,
      }),
    partner3 &&
      groupStudentRepository.insertGroupStudent({
        group_id,
        student_id: partner3,
      }),
  ]);

  const Data = {
    id: group.submission_id,
    title: group.title,
    file_name: submission.file_name,
    upload_date: submission.upload_date,
    file_size: submission.file_size,
    is_consultation: submission.is_consultation,
    proposed_advisor_id: submission.proposed_advisor_id,
    proposed_co_advisor1_id: submission.proposed_co_advisor1_id,
    proposed_co_advisor2_id: submission.proposed_co_advisor2_id,
    classroom_id: submission.classroom_id,
  };
  return Data;
};

//===================================================================
// @description     Get submission
// @route           GET /submission/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN
const getSubmissionById = async (id) => {
  const submission = await submissionRepository.findSubmissionById(id);
  if (!submission) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }

  // get group by submission_id
  const group = await groupRepository.findGroupBySubmissionId(submission.id);
  if (!group) {
    throw {
      status: 400,
      message: `Group Not found`,
    };
  }

  // get all student in group_student by group_id
  const groupStudent = await groupStudentRepository.findGroupStudentByGroupId(
    group.id
  );
  if (!groupStudent) {
    throw {
      status: 400,
      message: `Group student not found`,
    };
  }

  const students = await Promise.all(
    groupStudent.map(async (student_id) => {
      // get student in table student by student_id
      const student = await studentRepository.findStudentById(student_id);
      if (student) {
        // Menggabungkan firstName dan lastName menjadi fullName
        const fullName = `${student.firstName} ${student.lastName || ""}`;
        console.log(
          `Student ID: ${student_id}, FullName: ${fullName}, Nim: ${student.nim}, Major: ${student.major}`
        );
        return {
          fullName: fullName,
          nim: student.nim,
          major: student.major,
        };
      } else {
        throw {
          status: 400,
          message: `Student Not found`,
        };
      }
    })
  );
  const Data = {
    id: group.submission_id,
    title: group.title,
    students,
    file_name: submission.file_name,
    upload_date: submission.upload_date,
    file_size: submission.file_size,
    is_consultation: submission.is_consultation,
    proposed_advisor_id: submission.proposed_advisor_id,
    proposed_co_advisor1_id: submission.proposed_co_advisor1_id,
    proposed_co_advisor2_id: submission.proposed_co_advisor2_id,
    is_approve: submission.is_approve,
    classroom_id: submission.classroom_id,
  };
  return Data;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get submission by id
// @used            updateSubmissionById, updateAdvisorAndCoAdvisorById,
//                  approveSubmissionById, rejectSubmissionById,
//                  updateSubmissionTitleById,
const checkSubmissionById = async (id) => {
  const submission = await submissionRepository.findSubmissionById(id);
  if (!submission) {
    throw {
      status: 400,
      message: `Submission not found`,
    };
  }
  return submission;
};

//===================================================================
// @description     Update submission
// @route           PUT /submission/:id
// @access          MAHASISWA
const updateSubmissionById = async (id, userId, payload) => {
  // check existing submission
  const submission = await checkSubmissionById(id);

  if (submission.is_approve === "Approve") {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }

  // check user/student in classroom
  const proposalStudent =
    await proposalStudentRepository.findStudentProposalByStudentIdAndClassroomId(
      userId,
      submission.classroom_id
    );
  const skripsiStudent =
    await skripsiStudentRepository.findStudentSkripsiByStudentIdAndClassroomId(
      userId,
      submission.classroom_id
    );

  if (!proposalStudent && !skripsiStudent) {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }

  const {
    proposed_advisor_id,
    proposed_co_advisor1_id,
    proposed_co_advisor2_id,
  } = payload;

  // check dosen in employee
  if (proposed_advisor_id) {
    await getDosenById(proposed_advisor_id);
  }
  if (proposed_co_advisor1_id) {
    await getDosenById(proposed_co_advisor1_id);
  }
  if (proposed_co_advisor2_id) {
    await getDosenById(proposed_co_advisor2_id);
  }

  // update submission
  const updatedSubmission = await submissionRepository.updateSubmission(
    id,
    payload
  );
  // update title in group by submission_id
  const group = await groupRepository.updateGroupTitleBySubmissionId(
    id,
    payload
  );

  const Data = {
    id: group.submission_id,
    title: group.title,
    file_name: updatedSubmission.file_name,
    upload_date: updatedSubmission.upload_date,
    file_size: updatedSubmission.file_size,
    is_consultation: updatedSubmission.is_consultation,
    proposed_advisor_id: updatedSubmission.proposed_advisor_id,
    proposed_co_advisor1_id: updatedSubmission.proposed_co_advisor1_id,
    proposed_co_advisor2_id: updatedSubmission.proposed_co_advisor2_id,
  };
  return Data;
};

//===================================================================
// @description     Change advisor, co-advisor
// @route           PUT /submission/advisor-and-co-advisor/:id
// @access          DOSEN_MK
const updateAdvisorAndCoAdvisorById = async (id, userId, payload) => {
  // check existing submission
  const submission = await checkSubmissionById(id);
  if (submission.is_approve === "Approve") {
    throw {
      status: 400,
      message: `Can't perform this action`,
    };
  }

  // check user/dosen mk in classroom
  const classroom = await classroomRepository.findClassroomByIdAndDosenMK(
    submission.classroom_id,
    userId
  );
  if (!classroom) {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }

  const {
    proposed_advisor_id,
    proposed_co_advisor1_id,
    proposed_co_advisor2_id,
  } = payload;

  // check dosen in employee
  if (proposed_advisor_id) {
    await getDosenById(proposed_advisor_id);
  }
  if (proposed_co_advisor1_id) {
    await getDosenById(proposed_co_advisor1_id);
  }
  if (proposed_co_advisor2_id) {
    await getDosenById(proposed_co_advisor2_id);
  }

  const updatedSubmission =
    await submissionRepository.updateAdvisorAndCoAdvisor(id, payload);
  const Data = {
    id: updatedSubmission.id,
    proposed_advisor_id: updatedSubmission.proposed_advisor_id,
    proposed_co_advisor1_id: updatedSubmission.proposed_co_advisor1_id,
    proposed_co_advisor2_id: updatedSubmission.proposed_co_advisor2_id,
  };
  return Data;
};

//===================================================================
// @description     Approve submission
// @route           PUT /submission/approve/:id
// @access          DOSEN_MK
const approveSubmissionById = async (id, userId) => {
  // check existing submission
  const submission = await checkSubmissionById(id);
  if (
    submission.is_approve === "Approve" ||
    submission.is_approve === "Rejected"
  ) {
    throw {
      status: 400,
      message: `Can't perform this action`,
    };
  }

  // check user/dosen mk in classroom
  const classroom = await classroomRepository.findClassroomByIdAndDosenMK(
    submission.classroom_id,
    userId
  );
  if (!classroom) {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }

  // approve submission
  const updatedSubmission = await submissionRepository.approveSubmissionById(
    id
  );

  // create empty proposal
  const proposal = await proposalRepository.insertProposal(updatedSubmission);

  // update proposal_id in group
  await groupRepository.updateGroupProposalIdBySubmissionId(id, proposal.id);

  // create empty skripsi
  const skripsi = await skripsiRepository.insertSkripsi(updatedSubmission);

  // update skripsi_id in group
  await groupRepository.updateGroupSkripsiIdBySubmissionId(id, skripsi.id);

  // update progress in group
  await groupRepository.updateGroupProgressBySubmissionId(updatedSubmission.id);

  const Data = {
    id: updatedSubmission.id,
    is_approve: updatedSubmission.is_approve,
  };
  return Data;
};

//===================================================================
// @description     Reject submission
// @route           PUT /submission/reject/:id
// @access          DOSEN_MK
const rejectSubmissionById = async (id, userId) => {
  // check existing submission
  const submission = await checkSubmissionById(id);
  if (
    submission.is_approve === "Approve" ||
    submission.is_approve === "Rejected"
  ) {
    throw {
      status: 400,
      message: `Can't perform this action`,
    };
  }

  // check user/dosen mk in classroom
  const classroom = await classroomRepository.findClassroomByIdAndDosenMK(
    submission.classroom_id,
    userId
  );
  if (!classroom) {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }

  // reject submission
  const updatedSubmission = await submissionRepository.rejectSubmission(id);
  const Data = {
    id: updatedSubmission.id,
    is_approve: updatedSubmission.is_approve,
  };
  return Data;
};

//===================================================================
// @description     Change title in group
// @route           PUT /submission/title/:id
// @access          MAHASISWA
const updateSubmissionTitleById = async (id, userId, payload) => {
  // check existing submission
  const submission = await checkSubmissionById(id);

  // check user/student in classroom
  const proposalStudent =
    await proposalStudentRepository.findStudentProposalByStudentIdAndClassroomId(
      userId,
      submission.classroom_id
    );
  const skripsiStudent =
    await skripsiStudentRepository.findStudentSkripsiByStudentIdAndClassroomId(
      userId,
      submission.classroom_id
    );

  if (!proposalStudent && !skripsiStudent) {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }

  const updatedGroup = await groupRepository.updateGroupTitleBySubmissionId(
    id,
    payload
  );
  const Data = {
    id: submission.id,
    title: updatedGroup.title,
  };
  return Data;
};

module.exports = {
  createSubmission,
  getSubmissionById,
  updateSubmissionById,
  updateAdvisorAndCoAdvisorById,
  approveSubmissionById,
  rejectSubmissionById,
  updateSubmissionTitleById,
};
