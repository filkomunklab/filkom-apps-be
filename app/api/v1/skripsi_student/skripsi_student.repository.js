//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get skripsi student by classroom id
// @used            Classroom,
const findSkripsiStudentByClassroomId = async (classroom_id) => {
  const skripsi_student = await prisma.skripsi_Student.findMany({
    where: {
      classroom_id,
    },
    include: {
      student: true,
    },
  });
  return skripsi_student;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get skripsi_student by student_id & classroom_id
// @used            Classroom,
const findSkripsiStudentByStudentId = async (student_id, classroom_id) => {
  const skripsi_student = await prisma.skripsi_Student.findMany({
    where: {
      student_id,
      classroom_id,
    },
  });
  return skripsi_student;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     create skripsi_student by student_id & classroom_id
// @used            Classroom,
const insertSkripsiStudentByStudentIdAndClassroomId = async (
  student_id,
  classroom_id
) => {
  const skripsi_student = await prisma.skripsi_Student.create({
    data: {
      student_id,
      classroom_id,
    },
    include: {
      student: true,
    },
  });
  return skripsi_student;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get skripsi_student by classroom_id
// @used            Classroom,
const findSkripsiStudentByProposalId = async (classroom_id) => {
  const skripsi_student = await prisma.skripsi_Student.findFirst({
    where: {
      classroom_id,
    },
  });
  return skripsi_student;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get skripsi_student by id
// @used            Classroom,
const findSkripsiStudentById = async (id) => {
  const skripsi_student = await prisma.skripsi_Student.findFirst({
    where: {
      id,
    },
  });
  return skripsi_student;
};

//===================================================================
// @description     Delete student by id
// @route           DELETE /classroom/delete-student/:id"
// @access          DOSEN_MK
// @used            Classroom
const deleteSkripsiStudentById = async (id) => {
  await prisma.skripsi_Student.delete({
    where: {
      id,
    },
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get skripsi_student by student_id & classroom_id
// @used            Submission,
const findStudentSkripsiByStudentIdAndClassroomId = async (
  student_id,
  classroom_id
) => {
  const skripsi_student = await prisma.skripsi_Student.findFirst({
    where: {
      student_id,
      classroom_id,
    },
  });
  return skripsi_student;
};

module.exports = {
  findSkripsiStudentByClassroomId,
  findSkripsiStudentByStudentId,
  findSkripsiStudentByProposalId,
  insertSkripsiStudentByStudentIdAndClassroomId,
  findSkripsiStudentById,
  deleteSkripsiStudentById,
  findStudentSkripsiByStudentIdAndClassroomId,
};
