const { now } = require("moment");
const prisma = require("../../../database");

//================================Dosen Pembimbing=====================//
//show list Approved/Rejected certificate
const findCertificate = async (nik) => {
  try {
    const certificate = await prisma.transaction_Certificate.findMany({
      where: {
        AND: [
          {
            employeeNik: nik,
          },
          {
            Certificate: {
              OR: [
                {
                  approval_status: "APPROVED",
                },
                {
                  approval_status: "REJECTED",
                },
              ],
            },
          },
        ],
      },
      include: {
        Certificate: {
          select: {
            title: true,
            approvalDate: true,
          },
        },
        Student: {
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

// find Certificate by category (dosepem)
const findCertificateByCategory = async (category, nik) => {
  console.log("object");
  try {
    const certificate = await prisma.certificate.findMany({
      where: {
        category,
        transaction: {
          some: { employeeNik: nik },
        },
      },
      orderBy: {
        submitDate: "desc",
      },
      include: {
        transaction: {
          select: {
            Student: {
              select: {
                firstName: true,
                lastName: true,
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
const findAdvisorCertificateWaitingList = async (nik) => {
  try {
    const certificate = await prisma.transaction_Certificate.findMany({
      where: {
        AND: [
          {
            employeeNik: nik,
          },
          {
            Certificate: {
              approval_status: "WAITING",
            },
          },
        ],
      },
      include: {
        Certificate: {
          select: {
            title: true,
            category: true,
            approval_status: true,
            submitDate: true,
          },
        },
        Student: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        Employee: {
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

//approval Certificate
const approvalCertificateStudent = async (certificateId, payload) => {
  const { approval_status, comments } = payload;
  try {
    const certificate = await prisma.certificate.update({
      where: {
        id: certificateId,
      },
      data: {
        approval_status,
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

//===============================General Access==========================//

//find detail certificate
const findOneCertificate = async (certificateId) => {
  try {
    const certificate = await prisma.certificate.findUnique({
      where: {
        id: certificateId,
      },
      include: {
        transaction: {
          include: {
            Student: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
            Employee: {
              select: {
                firstName: true,
                lastName: true,
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
const findStudentCertificateHistory = async (nim) => {
  try {
    const certificate = await prisma.transaction_Certificate.findMany({
      where: {
        AND: [
          {
            studentNim: nim,
          },
          {
            Certificate: {
              OR: [
                {
                  approval_status: "APPROVED",
                },
                {
                  approval_status: "REJECTED",
                },
              ],
            },
          },
        ],
      },
      include: {
        Certificate: {
          select: {
            title: true,
            approvalDate: true,
          },
        },
        Student: {
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

//current Certificate Student (student)
const findCurrentCertificateStudent = async (nim) => {
  try {
    const certificate = await prisma.transaction_Certificate.findMany({
      where: {
        AND: [
          {
            studentNim: nim,
          },
          {
            Certificate: {
              approval_status: "WAITING",
            },
          },
        ],
      },
      include: {
        Certificate: {
          select: {
            title: true,
            submitDate: true,
          },
        },
        Student: {
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
const insertCertificate = async (payload, nim, path) => {
  const { title, category, description, employeeNik } = payload;
  const { filename } = payload.certificateFile;
  try {
    const certificate = await prisma.certificate.create({
      data: {
        title,
        category,
        description,
        filename,
        path,
        transaction: {
          create: {
            studentNim: nim,
            employeeNik,
          },
        },
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
};
