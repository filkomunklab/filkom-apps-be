const prisma = require("../../../database");

const getAllClass = async () => {
  return await prisma.guidanceClass.findMany({
    include: {
      teacher: {
        select: {
          firstName: true,
          lastName: true,
          major: true,
          nidn: true,
          nik: true,
          id: true,
        },
      },
      _count: {
        select: {
          GuidanceClassMember: true,
        },
      },
    },
  });
};

const getGuidanceClassDetail = async (payload) => {
  const { id } = payload;
  return await prisma.guidanceClass.findUnique({
    where: {
      id,
    },
    include: {
      teacher: {
        select: {
          firstName: true,
          lastName: true,
          phoneNum: true,
          Address: true,
          major: true,
          nidn: true,
        },
      },
      GuidanceClassMember: {
        where: {
          student: {
            status: {
              not: "GRADUATE",
            },
          },
        },
        include: {
          student: {
            select: {
              arrivalYear: true,
              firstName: true,
              lastName: true,
              status: true,
              major: true,
              nim: true,
              id: true,
              _count: {
                select: {
                  Certificate: true,
                  studentGrade: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

const getAllUnassignedStudent = async (payload) => {
  const { major } = payload;
  return await prisma.student.findMany({
    where: {
      GuidanceClassMember: null,
      major: major ? major : undefined,
    },
    select: {
      nim: true,
      major: true,
      status: true,
      lastName: true,
      firstName: true,
      arrivalYear: true,
      MajorGlobal: {
        select: {
          name: true,
        },
      },
    },
  });
};

const getAllUnassignetTeacher = async () => {
  return prisma.employee.findMany({
    where: {
      GuidanceClass: {
        is: null,
      },
    },
    select: {
      id: true,
      nik: true,
      nidn: true,
      email: true,
      major: true,
      Address: true,
      phoneNum: true,
      lastName: true,
      firstName: true,
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
  getAllUnassignetTeacher,
  getAllClass,
  getGuidanceClassDetail,
};
