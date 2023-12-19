const prisma = require("../../../database");

const getAllUnassignedStudent = async () => {
  return await prisma.student.findMany({
    where: {
      GuidanceClassMember: null,
    },
    select: {
      nim: true,
      firstName: true,
      lastName: true,
    },
  });
};

const createGuidanceClass = async (payload, teacherId) => {
  const { studentList } = payload;
  return await prisma.guidanceClass.create({
    data: {
      teacherId,
      GuidanceClassMember: {
        createMany: {
          data: studentList,
        },
      },
    },
  });
};

const addStudentToGuidanceClass = async (payload, guidanceClassId) => {
  const { studentList } = payload;
  const normalized = studentList.map((student) => {
    return {
      ...student,
      guidanceClassId: guidanceClassId,
    };
  });
  console.log(normalized);
  return await prisma.guidanceClassMember.createMany({
    data: normalized,
  });
};

const deleteStudentFromGuidanceClass = async (payload) => {
  const { studentList } = payload;
  return await prisma.guidanceClassMember.deleteMany({
    where: {
      studentNim: {
        in: studentList,
      },
    },
  });
};

module.exports = {
  createGuidanceClass,
  addStudentToGuidanceClass,
  deleteStudentFromGuidanceClass,
  getAllUnassignedStudent,
};
