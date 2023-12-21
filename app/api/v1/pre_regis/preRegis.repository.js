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

module.exports = {
  findSubjectForPreRegis,
};
