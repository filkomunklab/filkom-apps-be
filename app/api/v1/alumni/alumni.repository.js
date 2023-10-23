const prisma = require("../../../database");

//daftar alumni
const getAlumniList = async () => {
  const alumniList = await prisma.student.findMany({
    where: {
      status: "GRADUATE",
    },
    select: {
      firstName: true,
      lastName: true,
      nim: true,
      major: true,
      faculty: true,
      FormSPT: {
        orderBy: {
          created_at: "desc",
        },
        distinct: ["studentId"],
        select: {
          graduate_year: true,
        },
      },
    },
  });
  return alumniList;
};

//sort by

module.exports = {
  getAlumniList,
};
