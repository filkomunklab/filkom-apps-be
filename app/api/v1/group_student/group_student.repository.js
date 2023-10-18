//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// @description     Get group_student by group_id
// @used            Submission
const findGroupStudentByGroupId = async (group_id) => {
    const groupStudent = await prisma.group_Student.findMany({
      where: {
        group_id,
      },
    });
  // Mengambil daftar student_id dari groupStudent
    const studentIds = groupStudent.map(student => student.student_id);
    return studentIds;
};

// @description     Get group_student by student_id & group_id
// @used            Proposal
const findGroupStudentByStudentIdAndGroupId = async (student_id, group_id) => {
  const groupStudent = await prisma.group_Student.findFirst({
    where: {
      student_id,
      group_id,
    },
  });
  return groupStudent;
};

// @description     Create group_student (mengelompokkan student)
// @used            Submission
const insertGroupStudent = async (data) => {
  const { group_id, student_id } = data;
  const group_student = await prisma.group_Student.create({
    data: {
      group_id,
      student_id,
    },
  });
  return group_student;
};

module.exports = {
    findGroupStudentByGroupId,
    findGroupStudentByStudentIdAndGroupId,
    insertGroupStudent
}