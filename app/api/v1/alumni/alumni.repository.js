const { student } = require("../../../database");
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

  const data2 = alumniList.filter((item) => {
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

  console.log(data2, groupedData, counts);

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

// ================================================================================== JERICO
const countTotalRowsAlumniHasTracerStudyBySearch = async (search_query) => {
  try {
    const totalRows = await prisma.tracer_Study.groupBy({
      where: {
        student: {
          AND: [
            { status: "GRADUATE" },
            {
              OR: [
                {
                  firstName: {
                    contains: search_query,
                    mode: "insensitive",
                  },
                },
                {
                  lastName: {
                    contains: search_query,
                    mode: "insensitive",
                  },
                },
                {
                  nim: {
                    contains: search_query,
                    mode: "insensitive",
                  },
                },
              ],
            },
          ],
        },
      },
      by: ["studentId"],
      _count: {
        studentId: true,
      },
    });

    return totalRows.length;
  } catch (error) {
    console.log(error.message);
  }
};

const countTotalRowsAlumniHasTracerStudyBySearchWithFilterByGraduateYear =
  async (search_query, filterValue) => {
    try {
      const totalRows = await prisma.tracer_Study.groupBy({
        where: {
          student: {
            AND: [
              { status: "GRADUATE" },
              {
                OR: [
                  {
                    firstName: {
                      contains: search_query,
                      mode: "insensitive",
                    },
                  },
                  {
                    lastName: {
                      contains: search_query,
                      mode: "insensitive",
                    },
                  },
                  {
                    nim: {
                      contains: search_query,
                      mode: "insensitive",
                    },
                  },
                ],
              },
              {
                graduate_year: filterValue,
              },
            ],
          },
        },
        by: ["studentId"],
        _count: {
          studentId: true,
        },
      });
      return totalRows.length;
    } catch (error) {
      console.log(error.message);
    }
  };

const countTotalRowsAlumniHasTracerStudyBySearchWithFilterByMajor = async (
  search_query,
  filterValue
) => {
  try {
    const totalRows = await prisma.tracer_Study.groupBy({
      where: {
        student: {
          AND: [
            { status: "GRADUATE" },
            {
              OR: [
                {
                  firstName: {
                    contains: search_query,
                    mode: "insensitive",
                  },
                },
                {
                  lastName: {
                    contains: search_query,
                    mode: "insensitive",
                  },
                },
                {
                  nim: {
                    contains: search_query,
                    mode: "insensitive",
                  },
                },
              ],
            },
            {
              major: filterValue,
            },
          ],
        },
      },
      by: ["studentId"],
      _count: {
        studentId: true,
      },
    });

    return totalRows.length;
  } catch (error) {
    console.log(error.message);
  }
};

const findAlumniHasTracerStudyListPagination = async (
  search_query,
  page,
  limit,
  offset
) => {
  try {
    const result = await prisma.tracer_Study.findMany({
      where: {
        student: {
          AND: [
            { status: "GRADUATE" },
            {
              OR: [
                {
                  firstName: {
                    contains: search_query,
                    mode: "insensitive",
                  },
                },
                {
                  lastName: {
                    contains: search_query,
                    mode: "insensitive",
                  },
                },
                {
                  nim: {
                    contains: search_query,
                    mode: "insensitive",
                  },
                },
              ],
            },
          ],
        },
      },
      select: {
        student: {
          select: {
            firstName: true,
            lastName: true,
            nim: true,
            major: true,
            faculty: true,
            graduate_year: true,
          },
        },
      },
      skip: offset,
      take: limit,
      orderBy: [
        {
          student: {
            createdAt: "desc",
          },
        },
      ],
      distinct: ["studentId"],
    });

    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const findAlumniHasTracerStudyListPaginationFilterByGraduateYear = async (
  search_query,
  page,
  limit,
  offset,
  filterValue
) => {
  try {
    const result = await prisma.tracer_Study.findMany({
      where: {
        student: {
          AND: [
            { status: "GRADUATE" },
            {
              OR: [
                {
                  firstName: {
                    contains: search_query,
                    mode: "insensitive",
                  },
                },
                {
                  lastName: {
                    contains: search_query,
                    mode: "insensitive",
                  },
                },
                {
                  nim: {
                    contains: search_query,
                    mode: "insensitive",
                  },
                },
              ],
            },
            {
              graduate_year: filterValue,
            },
          ],
        },
      },
      select: {
        student: {
          select: {
            firstName: true,
            lastName: true,
            nim: true,
            major: true,
            faculty: true,
            graduate_year: true,
          },
        },
      },
      skip: offset,
      take: limit,
      orderBy: [
        {
          student: {
            createdAt: "desc",
          },
        },
      ],
      distinct: ["studentId"],
    });

    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const findAlumniHasTracerStudyListPaginationFilterByMajor = async (
  search_query,
  page,
  limit,
  offset,
  filterValue
) => {
  try {
    const result = await prisma.tracer_Study.findMany({
      where: {
        student: {
          AND: [
            { status: "GRADUATE" },
            {
              OR: [
                {
                  firstName: {
                    contains: search_query,
                    mode: "insensitive",
                  },
                },
                {
                  lastName: {
                    contains: search_query,
                    mode: "insensitive",
                  },
                },
                {
                  nim: {
                    contains: search_query,
                    mode: "insensitive",
                  },
                },
              ],
            },
            {
              major: filterValue,
            },
          ],
        },
      },
      select: {
        student: {
          select: {
            firstName: true,
            lastName: true,
            nim: true,
            major: true,
            faculty: true,
            graduate_year: true,
          },
        },
      },
      skip: offset,
      take: limit,
      orderBy: [
        {
          student: {
            createdAt: "desc",
          },
        },
      ],
      distinct: ["studentId"],
    });

    return result;
  } catch (error) {
    console.log(error.message);
  }
};

// ================ get all alumni
const countTotalRowsAlumniBySearch = async (search_query) => {
  try {
    const totalRows = await prisma.student.count({
      where: {
        AND: [
          {
            status: "GRADUATE",
          },
          {
            OR: [
              {
                firstName: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
              {
                nim: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      },
    });

    return totalRows;
  } catch (error) {
    console.log(error.message);
  }
};

const countTotalRowsAlumniBySearchWithFilterByGraduateYear = async (
  search_query,
  filterValue
) => {
  try {
    const totalRows = await prisma.student.count({
      where: {
        AND: [
          {
            status: "GRADUATE",
          },
          {
            OR: [
              {
                firstName: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
              {
                nim: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
            ],
          },
          {
            graduate_year: filterValue,
          },
        ],
      },
    });

    return totalRows;
  } catch (error) {
    console.log(error.message);
  }
};

const countTotalRowsAlumniBySearchWithFilterByMajor = async (
  search_query,
  filterValue
) => {
  try {
    const totalRows = await prisma.student.count({
      where: {
        AND: [
          {
            status: "GRADUATE",
          },
          {
            OR: [
              {
                firstName: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
              {
                nim: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
            ],
          },
          {
            major: filterValue,
          },
        ],
      },
    });

    return totalRows;
  } catch (error) {
    console.log(error.message);
  }
};

const findAlumniListPagination = async (search_query, page, limit, offset) => {
  try {
    const result = await prisma.student.findMany({
      where: {
        AND: [
          { status: "GRADUATE" },
          {
            OR: [
              {
                firstName: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
              {
                nim: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      },
      select: {
        firstName: true,
        lastName: true,
        nim: true,
        major: true,
        faculty: true,
        graduate_year: true,
        personalEmail: true,
      },
      skip: offset,
      take: limit,
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const findAlumniListPaginationFilterByGraduateYear = async (
  search_query,
  page,
  limit,
  offset,
  filterValue
) => {
  try {
    const result = await prisma.student.findMany({
      where: {
        AND: [
          { status: "GRADUATE" },
          {
            OR: [
              {
                firstName: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
              {
                nim: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
            ],
          },
          {
            graduate_year: filterValue,
          },
        ],
      },
      select: {
        firstName: true,
        lastName: true,
        nim: true,
        major: true,
        faculty: true,
        graduate_year: true,
        personalEmail: true,
      },
      skip: offset,
      take: limit,
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const findAlumniListPaginationFilterByMajor = async (
  search_query,
  page,
  limit,
  offset,
  filterValue
) => {
  try {
    const result = await prisma.student.findMany({
      where: {
        AND: [
          { status: "GRADUATE" },
          {
            OR: [
              {
                firstName: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
              {
                nim: {
                  contains: search_query,
                  mode: "insensitive",
                },
              },
            ],
          },
          {
            major: filterValue,
          },
        ],
      },
      select: {
        firstName: true,
        lastName: true,
        nim: true,
        major: true,
        faculty: true,
        graduate_year: true,
        personalEmail: true,
      },
      skip: offset,
      take: limit,
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return result;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAlumniList,
  filterAlumni,
  alumniTS,
  phoneNumbers,

  countTotalRowsAlumniHasTracerStudyBySearch,
  countTotalRowsAlumniHasTracerStudyBySearchWithFilterByGraduateYear,
  countTotalRowsAlumniHasTracerStudyBySearchWithFilterByMajor,

  findAlumniHasTracerStudyListPagination,
  findAlumniHasTracerStudyListPaginationFilterByGraduateYear,
  findAlumniHasTracerStudyListPaginationFilterByMajor,

  countTotalRowsAlumniBySearch,
  countTotalRowsAlumniBySearchWithFilterByGraduateYear,
  countTotalRowsAlumniBySearchWithFilterByMajor,

  findAlumniListPagination,
  findAlumniListPaginationFilterByGraduateYear,
  findAlumniListPaginationFilterByMajor,
};
