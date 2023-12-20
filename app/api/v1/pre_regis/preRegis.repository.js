const prisma = require("../../../database");

const findSubjectForPreRegis = async (major, year) => {
  try {
    const preRegis = await prisma.curriculum.findFirst({
      where: {
        AND: {
          major,
          year,
        },
      },
      include: {
        Subjects: {
          select: {
            code: true,
            name: true,
            credits: true,
            type: true,
            prerequisite: true,
          },
        },
      },
    });
    return preRegis;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const checkPreRegistAccess = async (payload) => {
  const { major } = payload;
  return await prisma.preRegistration.findFirst({
    where: {
      major,
    },
    orderBy: {
      updatedAt: "desc",
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

module.exports = {
  findSubjectForPreRegis,
  checkPreRegistAccess,
  createPreRegist,
  submitPreRegist,
  submitApproval,
};
