const prisma = require("../../../database");

//=====================DOSPEM DASHBOARD======================//

//Total All Student Guidance Acitve & InActive
const findAllStudentGuidanceTotal = async () => {
  try {
    return await prisma.employee.findMany({
      select: {
        firstName: true,
        lastName: true,
        nik: true,
        GuidanceClass: {
          include: {
            GuidanceClassMember: {
              include: {
                student: true,
              },
              where: {
                student: {
                  status: { in: ["ACTIVE", "INACTIVE"] },
                },
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Total Active Student Guidance
const findAllActiveStudentGuidanceTotal = async () => {
  try {
    return await prisma.employee.findMany({
      select: {
        firstName: true,
        lastName: true,
        nik: true,
        GuidanceClass: {
          include: {
            GuidanceClassMember: {
              include: {
                student: true,
              },
              where: {
                student: {
                  status: { in: ["ACTIVE"] },
                },
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Total InActive Student Guidance
const findAllInActiveStudentGuidanceTotal = async () => {
  try {
    return await prisma.employee.findMany({
      select: {
        firstName: true,
        lastName: true,
        nik: true,
        GuidanceClass: {
          include: {
            GuidanceClassMember: {
              include: {
                student: true,
              },
              where: {
                student: {
                  status: { in: ["INACTIVE"] },
                },
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//=====================KAPRODI DASHBOARD====================//

//Total All major Student Active & InActive
const findAllMajorStudent = async () => {
  try {
    return await prisma.student.groupBy({
      where: {
        status: {
          not: "GRADUATE",
        },
      },
      by: ["major"],
      _count: {
        major: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

//Total All Active Major Student
const findTotalActiveMajorStudent = async () => {
  try {
    return await prisma.student.groupBy({
      where: {
        status: "ACTIVE",
      },
      by: ["major"],
      _count: {
        major: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

//Total Inactive major Student
const findTotalInActiveMajorStudent = async () => {
  try {
    return await prisma.student.groupBy({
      where: {
        status: "INACTIVE",
      },
      by: ["major"],
      _count: {
        major: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

//====================General DashBoard====================//

//Total All major student, Diagram data (Active & InActive Only)
const findTotalOfMajorStudent = async () => {
  try {
    return await prisma.student.groupBy({
      where: {
        status: {
          not: "GRADUATE",
        },
      },
      by: ["arrivalYear", "major"],
      _count: {
        major: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

//total of all category certificate
const findTotalAllCategoryCertificate = async () => {
  try {
    return await prisma.aKAD_Certificate.groupBy({
      where: {
        approval_status: "APPROVED",
      },
      by: ["category"],
      _count: {
        category: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

//=====================DEKAN DASHBOARD=====================//
//total Faculty Student Active & InActive
const totalAllStudentFaculty = async () => {
  try {
    return await prisma.student.groupBy({
      where: {
        status: {
          not: "GRADUATE",
        },
      },
      by: ["faculty"],
      _count: {
        faculty: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

//total Only active Faculty Student
const totalAllActiveStudentFaculty = async () => {
  try {
    return await prisma.student.groupBy({
      where: {
        status: "ACTIVE",
      },
      by: ["faculty"],
      _count: {
        faculty: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

//Total Only InActive Student
const totalAllInActiveStudentFaculty = async () => {
  try {
    return await prisma.student.groupBy({
      where: {
        status: "INACTIVE",
      },
      by: ["faculty"],
      _count: {
        faculty: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  //Dospem
  findAllStudentGuidanceTotal,
  findAllActiveStudentGuidanceTotal,
  findAllInActiveStudentGuidanceTotal,
  //Kaprodi
  findAllMajorStudent,
  findTotalActiveMajorStudent,
  findTotalInActiveMajorStudent,
  //General
  findTotalOfMajorStudent,
  findTotalAllCategoryCertificate,
  //Dekan
  totalAllStudentFaculty,
  totalAllActiveStudentFaculty,
  totalAllInActiveStudentFaculty,
};
