const prisma = require("../../../database");

const getAllUnassignedStudent = async (payload) => {
  const { major } = payload;
  return await prisma.student.findMany({
    where: {
      GuidanceClassMember: null,
      major: major ? major : undefined,
    },
    select: {
      nim: true,
      firstName: true,
      lastName: true,
      MajorGlobal: {
        select: {
          name: true,
        },
      },
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
