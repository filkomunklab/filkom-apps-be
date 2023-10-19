//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// get student in group
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

// +++ create kelompok mahasiswa
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
    insertGroupStudent
}