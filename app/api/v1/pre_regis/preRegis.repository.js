const prisma = require("../../../database");
const moment = require("moment-timezone");

const getAllPreRegis = async (payload) => {
  const { major } = payload;
  return await prisma.preRegistration.findMany({
    where: {
      major,
    },
    include: {
      Employee: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

const findSubjectForPreRegis = async (payload) => {
  const { id } = payload;
  try {
    const preRegis = await prisma.curriculum.findUnique({
      where: {
        id: id ?? undefined,
      },
      include: {
        Subjects: true,
      },
    });
    return preRegis;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const checkPreRegistAccess = async (payload) => {
  const { major, studentId } = payload;
  return await prisma.preRegistration.findFirst({
    where: {
      major,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      PreRegistrationData: {
        where: {
          studentId,
        },
      },
    },
  });
};

const createPreRegist = async (paylaod) => {
  return await prisma.preRegistration.create({
    data: paylaod,
  });
};

const submitPreRegist = async (payload) => {
  const { listOfSubject, ...rest } = payload;
  return await prisma.preRegistrationData.create({
    data: {
      ...rest,
      ListOfRequest: {
        createMany: {
          data: listOfSubject,
        },
      },
    },
  });
};

const submitApproval = async (payload) => {
  const { id, ...data } = payload;
  return await prisma.preRegistrationData.update({
    where: {
      id,
    },
    data,
  });
};

const getPreRegistListForTeacher = async (payload) => {
  const { guidanceClassId } = payload;
  return await prisma.preRegistrationData.findMany({
    where: {
      status: "WAITING",
      Student: {
        GuidanceClassMember: {
          guidanceClassId,
        },
      },
    },
    select: {
      ListOfRequest: {
        select: {
          subject: {
            select: {
              credits: true,
            },
          },
        },
      },
      id: true,
      status: true,
      Student: {
        select: {
          nim: true,
          firstName: true,
          lastName: true,
          major: true,
          arrivalYear: true,
          status: true,
        },
      },
    },
  });
};

const getPreRegistDetails = async (payload) => {
  const { id } = payload;
  return await prisma.preRegistrationData.findUnique({
    where: {
      id,
    },
    include: {
      ListOfRequest: {
        include: {
          subject: true,
        },
      },
      Employee: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      Student: {
        select: {
          firstName: true,
          lastName: true,
          curriculum: {
            include: {
              Subjects: true,
            },
          },
        },
      },
    },
  });
};

const automateClosePreRegist = () => {
  prisma.preRegistration.updateMany({
    where: {
      isOpen: true,
      dueDate: {
        lte: moment(),
      },
    },
    data: {
      isOpen: false,
    },
  });
  console.log("testing schaduler from repo");
};

const manualClosePreRegist = async (id) => {
  return await prisma.preRegistration.update({
    where: { id },
    data: {
      isOpen: false,
    },
  });
};

const getHistoryForStudent = async (payload) => {
  const { studentId } = payload;
  return await prisma.preRegistrationData.findMany({
    where: {
      studentId,
      status: {
        not: "WAITING",
      },
    },
    select: {
      id: true,
      submitDate: true,
      Student: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      PreRegistration: {
        select: {
          semester: true,
          semesterPeriod: true,
        },
      },
    },
  });
};

const getHistoryForAdvisor = async (payload) => {
  const { guidanceClassId } = payload;
  return await prisma.preRegistrationData.findMany({
    where: {
      Student: {
        GuidanceClassMember: {
          guidanceClassId,
        },
      },
    },
    select: {
      id: true,
      submitDate: true,
      Student: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      PreRegistration: {
        select: {
          semester: true,
          semesterPeriod: true,
        },
      },
    },
  });
};

const getCurrentPreRegist = async (payload) => {
  const { id } = payload;
  return await prisma.preRegistrationData.findMany({
    where: {
      OR: [
        {
          Student: {
            GuidanceClassMember: {
              guidanceClassId: id,
            },
          },
        },
        { studentId: id },
      ],
      status: "WAITING",
    },
  });
};

const getCurrentForStudent = async (payload) => {
  const { studentId } = payload;
  return await prisma.preRegistrationData.findMany({
    where: {
      studentId,
      status: {
        equals: "WAITING",
      },
    },
    select: {
      id: true,
      submitDate: true,
      Student: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      PreRegistration: {
        select: {
          semester: true,
          semesterPeriod: true,
        },
      },
    },
  });
};

const getAllSubmitedPreRegist = async (payload) => {
  const { id } = payload;
  return await prisma.preRegistration.findUnique({
    where: {
      id,
    },
    include: {
      PreRegistrationData: {
        select: {
          status: true,
          Student: {
            select: {
              firstName: true,
              lastName: true,
              nim: true,
              arrivalYear: true,
            },
          },
        },
      },
    },
  });
};

const getAllSubject = async (payload) => {
  const { id } = payload;
  return await prisma.$queryRaw`
  SELECT lr."subjectId", s.code, s.name, s.type, count(*) "totalRequest"
  FROM "ListOfRequest" lr 
  JOIN "Subject" s ON lr."subjectId" = s."id" 
  JOIN "PreRegistrationData" prd ON lr."preRegistrationDataId" = prd."id"
  WHERE prd."preRegistrationId" = ${id} 
  GROUP BY lr."subjectId", s.code, s.name, s.type`;
};

module.exports = {
  getPreRegistListForTeacher,
  getAllSubmitedPreRegist,
  automateClosePreRegist,
  manualClosePreRegist,
  findSubjectForPreRegis,
  getCurrentForStudent,
  checkPreRegistAccess,
  getHistoryForStudent,
  getHistoryForAdvisor,
  getPreRegistDetails,
  getCurrentPreRegist,
  createPreRegist,
  submitPreRegist,
  submitApproval,
  getAllPreRegis,
  getAllSubject,
};
