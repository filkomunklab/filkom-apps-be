//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get all proposal student by classroom id
// @used            Classroom,
const findProposalStudentByClassroomId = async (classroom_id) => {
  const proposal_student = await prisma.proposal_Student.findMany({
    where: {
      classroom_id,
    },
    include: {
      student: true,
    },
  });
  return proposal_student;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get proposal_student by student_id & classroom_id
// @used            Classroom,
const findProposalStudentByStudentId = async (student_id, classroom_id) => {
  const proposal_student = await prisma.proposal_Student.findFirst({
    where: {
      student_id,
      classroom_id,
    },
  });
  return proposal_student;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     create proposal_student by student_id & classroom_id
// @used            Classroom,
const insertProposalStudentByStudentIdAndClassroomId = async (
  student_id,
  classroom_id
) => {
  const proposal_student = await prisma.proposal_Student.create({
    data: {
      student_id,
      classroom_id,
    },
    include: {
      student: true,
    },
  });
  return proposal_student;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get proposal_student by classroom_id
// @used            Classroom,
const findProposalStudentByProposalId = async (classroom_id) => {
  const proposal_student = await prisma.proposal_Student.findFirst({
    where: {
      classroom_id,
    },
  });
  return proposal_student;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get proposal_student by id
// @used            Classroom,
const findProposalStudentById = async (id) => {
  const proposal_student = await prisma.proposal_Student.findFirst({
    where: {
      id,
    },
  });
  return proposal_student;
};

//===================================================================
// @description     Delete student by id
// @route           DELETE /classroom/delete-student/:id"
// @access          DOSEN_MK
// @used            Classroom
const deleteProposalStudentById = async (id) => {
  await prisma.proposal_Student.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  findProposalStudentByClassroomId,
  findProposalStudentByStudentId,
  findProposalStudentByProposalId,
  insertProposalStudentByStudentIdAndClassroomId,
  findProposalStudentById,
  deleteProposalStudentById,
};
