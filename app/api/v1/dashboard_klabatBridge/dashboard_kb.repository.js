const prisma = require("../../../database");

//=======================DASHBOARD COUNT========================
const totalAlumni = async () => {
  return await prisma.student.count({
    where: {
      status: "GRADUATE",
    },
  });
};

const totalAlumniIF = async () => {
  return await prisma.student.count({
    where: {
      status: "GRADUATE",
      major: "IF",
    },
  });
};

const totalAlumniSI = async () => {
  return await prisma.student.count({
    where: {
      status: "GRADUATE",
      major: "SI",
    },
  });
};

//=============DASHBOARD PETA===================

//=================DASHBOARD DISTRIBUSI MAHASISWA=================
const distribusiAlumni = async () => {
  const alumniData = await prisma.student.groupBy({
    by: ["major", "graduate_year"],
    where: {
      status: "GRADUATE",
    },
    _count: true,
  });

  // Mengelompokkan data sesuai graduate_year
  const groupedData = {};
  alumniData.forEach((data) => {
    const { graduate_year, major, _count } = data;
    if (!groupedData[graduate_year]) {
      groupedData[graduate_year] = {};
    }
    if (!groupedData[graduate_year][major]) {
      groupedData[graduate_year][major] = _count;
    } else {
      groupedData[graduate_year][major] += _count;
    }
  });

  // Mengubah objek hasil ke dalam format yang diinginkan
  const formattedData = Object.keys(groupedData).map((graduateYear) => ({
    graduateYear,
    major: Object.keys(groupedData[graduateYear]).map((major) => ({
      name: major,
      count: groupedData[graduateYear][major],
    })),
  }));

  return formattedData;
};

const countTS = async () => {
  const totalTS = await prisma.student.findMany({
    where: {
      status: "GRADUATE",
    },
    select: {
      major: true,
      Tracer_Study: true,
    },
  });

  const data2 = totalTS.filter((item) => {
    return item.Tracer_Study.length > 0;
  });

  const groupedData = data2.reduce((result, item) => {
    const major = item.major || "Unknown";
    if (!result[major]) {
      result[major] = [];
    }
    result[major].push(item);
    return result;
  }, {});

  const counts = Object.keys(groupedData).map((major) => ({
    major,
    count: groupedData[major].length,
  }));

  // console.log(data2, groupedData, counts);
  return counts;
};

module.exports = {
  totalAlumni,
  totalAlumniIF,
  totalAlumniSI,
  distribusiAlumni,
  countTS,
};
