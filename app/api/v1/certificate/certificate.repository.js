const prisma = require("../../../database");

//================================Dosen Pembimbing=====================//
//History Certificate DosPem POV
const findCertificate = async (payload) => {
  const { guidanceClassId } = payload;
  try {
    const certificate = await prisma.aKAD_Certificate.findMany({
      where: {
        AND: [
          {
            student: {
              GuidanceClassMember: {
                guidanceClassId,
              },
            },
          },
          {
            OR: [
              {
                approvalStatus: "APPROVED",
              },
              {
                approvalStatus: "REJECTED",
              },
            ],
          },
        ],
      },
      orderBy: {
        approvalDate: "desc",
      },
      select: {
        id: true,
        title: true,
        approvalDate: true,
        approvalStatus: true,
        student: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return certificate;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Waiting list Certificate by filter category (dosepem)
const findCertificateByCategory = async (category, payload) => {
  const { guidanceClassId } = payload;
  try {
    const certificate = await prisma.aKAD_Certificate.findMany({
      where: {
        AND: [
          {
            approval_status: "WAITING",
            category,
            student: {
              GuidanceClassMember: {
                guidanceClassId,
              },
            },
          },
        ],
      },
      orderBy: {
        submitDate: "desc",
      },
      select: {
        id: true,
        title: true,
        category: true,
        approval_status: true,
        submitDate: true,
        student: {
          select: {
            firstName: true,
            lastName: true,
            GuidanceClassMember: {
              select: {
                gudianceClass: {
                  select: {
                    teacher: {
                      select: {
                        firstName: true,
                        lastName: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return certificate;
  } catch (error) {
    return error;
  }
};

//waiting list certificate (dospem)
const findAdvisorCertificateWaitingList = async (payload) => {
  const { guidanceClassId } = payload;
  try {
    const certificate = await prisma.aKAD_Certificate.findMany({
      where: {
        student: {
          GuidanceClassMember: {
            guidanceClassId,
          },
        },
        approvalStatus: "WAITING",
      },
      orderBy: {
        submitDate: "desc",
      },
      select: {
        id: true,
        title: true,
        category: true,
        approvalStatus: true,
        submitDate: true,
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            GuidanceClassMember: {
              select: {
                gudianceClass: {
                  select: {
                    teacher: {
                      select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return certificate;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//WAITING LIST BY MAJOR
const findWaitingListbyMajor = async (major, payload) => {
  const { guidanceClassId } = payload;
  try {
    const certificate = await prisma.aKAD_Certificate.findMany({
      where: {
        approval_status: "WAITING",
        AND: [
          {
            student: {
              GuidanceClassMember: {
                guidanceClassId,
              },
            },
          },
          {
            student: {
              major,
            },
          },
        ],
      },
      orderBy: {
        submitDate: "desc",
      },
      select: {
        id: true,
        title: true,
        category: true,
        approval_status: true,
        submitDate: true,
        student: {
          select: {
            firstName: true,
            lastName: true,
            GuidanceClassMember: {
              select: {
                gudianceClass: {
                  select: {
                    teacher: {
                      select: {
                        firstName: true,
                        lastName: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return certificate;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Waiting list by arrival year
const filterWaitingListByArrYear = async (arrivalYear, payload) => {
  const { guidanceClassId } = payload;
  try {
    const certificate = await prisma.aKAD_Certificate.findMany({
      where: {
        approval_status: "WAITING",
        AND: [
          {
            student: {
              GuidanceClassMember: {
                guidanceClassId,
              },
            },
          },
          {
            student: {
              arrivalYear,
            },
          },
        ],
      },
      orderBy: {
        submitDate: "desc",
      },
      select: {
        id: true,
        title: true,
        category: true,
        approval_status: true,
        submitDate: true,
        student: {
          select: {
            firstName: true,
            lastName: true,
            GuidanceClassMember: {
              select: {
                gudianceClass: {
                  select: {
                    teacher: {
                      select: {
                        firstName: true,
                        lastName: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return certificate;
  } catch (error) {
    throw error;
  }
};

//approval Certificate by dospem
const approvalCertificateStudent = async (certificateId, payload) => {
  const { approvalStatus, comments } = payload;
  try {
    const certificate = await prisma.aKAD_Certificate.update({
      where: {
        id: certificateId,
      },
      data: {
        approvalStatus,
        approvalDate: new Date(),
        comments,
      },
    });
    return certificate;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// View all certificate student
const viewAllStudentCertificate = async (studentId) => {
  try {
    const certificate = await prisma.aKAD_Certificate.findMany({
      where: {
        studentId,
      },
      include: {
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return certificate;
  } catch (error) {
    throw error;
  }
};

//===============================General Access==========================//

//find detail certificate
const findOneCertificate = async (certificateId) => {
  try {
    const certificate = await prisma.aKAD_Certificate.findUnique({
      where: {
        id: certificateId,
      },
      include: {
        student: {
          select: {
            firstName: true,
            lastName: true,
            GuidanceClassMember: {
              select: {
                gudianceClass: {
                  select: {
                    teacher: {
                      select: {
                        firstName: true,
                        lastName: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return certificate;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//===============================Student Access=========================//
//history submited certificate (student)
const findStudentCertificateHistory = async (studentId) => {
  try {
    const certificate = await prisma.aKAD_Certificate.findMany({
      where: {
        studentId,
        approvalStatus: {
          not: "WAITING",
        },
      },
      orderBy: {
        approvalDate: "desc",
      },
      select: {
        id: true,
        title: true,
        category: true,
        level: true,
        approvalDate: true,
        student: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return certificate;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//current Certificate Student (student)
const findCurrentCertificateStudent = async (id) => {
  try {
    const certificate = await prisma.aKAD_Certificate.findMany({
      where: {
        studentId: id,
        approvalStatus: "WAITING",
      },
      orderBy: {
        submitDate: "desc",
      },
      select: {
        id: true,
        title: true,
        category: true,
        level: true,
        submitDate: true,
        student: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return certificate;
  } catch (error) {
    return error;
  }
};

//add certification (student)
const insertCertificate = async (payload, studentId, path) => {
  const { title, category, level, description } = payload;
  const { filename } = payload.certificateFile;
  try {
    const certificate = await prisma.aKAD_Certificate.create({
      data: {
        title,
        category,
        level,
        description,
        filename,
        studentId,
        path,
      },
    });
    return certificate;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  findCertificate,
  insertCertificate,
  findOneCertificate,
  findCertificateByCategory,
  findStudentCertificateHistory,
  findAdvisorCertificateWaitingList,
  findCurrentCertificateStudent,
  approvalCertificateStudent,
  findWaitingListbyMajor,
  filterWaitingListByArrYear,
  viewAllStudentCertificate,
};
