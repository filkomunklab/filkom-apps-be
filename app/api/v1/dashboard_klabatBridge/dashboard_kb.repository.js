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
const peta = async () => {
  try {
    const result = await prisma.tracer_Study.groupBy({
      by: ["f5a1"],
      where: {
        f1101: {
          not: "", // Exclude empty strings
        },
      },
      _count: true,
    });

    // Calculate total count
    const totalCount = result.reduce((acc, group) => acc + group._count, 0);

    // Calculate percentage for each group
    const resultWithPercentage = result.map((group) => ({
      category: group.f5a1,
      count: group._count,
      percentage: `${((group._count / totalCount) * 100).toFixed(1)}%`,
    }));

    // const filteredResult = resultWithPercentage.filter(
    //   (item) => item.category !== " "
    // );

    // return filteredResult;
    return resultWithPercentage;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

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

//COMPANY CATEGORIES OF ALUMNI EMPLOYMENT
const countCategoriesOfEmployment = async () => {
  try {
    const result = await prisma.tracer_Study.groupBy({
      by: ["f1101"],
      where: {
        f1101: {
          not: "", // Exclude empty strings
        },
      },
      _count: true,
    });
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//<12 bulan alumni bekerja
const countDataByMonth = async () => {
  try {
    const result = await prisma.tracer_Study.groupBy({
      by: ["f502"],
      where: {
        f1101: {
          not: "", // Exclude empty strings
        },
      },
      _count: true,
    });
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//======alumni surveyed
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
  countDataByMonth,
  countCategoriesOfEmployment,
  peta,
};
