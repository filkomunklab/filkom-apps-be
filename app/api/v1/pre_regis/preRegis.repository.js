const prisma = require("../../../database");

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
  // console.log(guidanceClassId);
  return await prisma.preRegistrationData.findMany({
    where: {
      status: "WAITING",
      Student: {
        GuidanceClassMember: {
          guidanceClassId,
        },
      },
    },
    include: {
      Student: true,
    },
  });
};

const getPreRegistListForStudent = async (payload) => {
  const { status, studentId } = payload;
  return await prisma.preRegistrationData.findMany({
    where: {
      status: status ?? undefined,
      studentId,
    },
    include: {
      Student: true,
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

module.exports = {
  getPreRegistListForTeacher,
  getPreRegistListForStudent,
  findSubjectForPreRegis,
  checkPreRegistAccess,
  getPreRegistDetails,
  createPreRegist,
  submitPreRegist,
  submitApproval,
  getAllPreRegis,
};
