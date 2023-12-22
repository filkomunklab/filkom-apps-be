const prisma = require("../../../database");

//=====================DOSPEM DASHBOARD======================//

//Total All Student Guidance Acitve & InActive
// const findAllStudentGuidance = async () => {
//   const findTotalStudentGuidance = async () =>{
//     try {
//       return await prisma.guidanceClassMember.groupBy({
//         take:{}
//       })
//     } catch (error) {

//     }
//   }
// }

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
    return await prisma.certificate.groupBy({
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
//total Faculty Student Only Active
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
