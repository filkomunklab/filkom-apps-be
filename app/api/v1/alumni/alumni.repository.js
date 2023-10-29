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
      graduate_year: true,
      personalEmail: true,
      phoneNo: true,
    },
  });
  return alumniList;
};

//get alumni + status isi SPT
const alumniTS = async () => {
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
      graduate_year: true,
      Tracer_Study: true,
    },
  });
  const data = alumniList.map((item) => ({
    ...item,
    status: item.Tracer_Study.length < 1 ? "Belum Mengisi" : "Sudah Mengisi",
  }));

  return data;
};

//filter by
const filterAlumni = async (filter) => {
  const where = { status: "GRADUATE" };

  if (filter.major) {
    where.major = filter.major;
  } else if (filter.graduate_year) {
    where.graduate_year = filter.graduate_year;
  }

  return await prisma.student.findMany({
    where,
    select: {
      firstName: true,
      lastName: true,
      nim: true,
      major: true,
      faculty: true,
      graduate_year: true,
      Tracer_Study: true,
    },
  });
};

const phoneNumbers = async () => {
  const phoneNo = await prisma.student.findMany({
    select: {
      firstName: true,
      lastName: true,
      phoneNo: true,
    },
  });
  return phoneNo.map((student) => student.phoneNo);
};

module.exports = {
  getAlumniList,
  filterAlumni,
  alumniTS,
  phoneNumbers,
};
