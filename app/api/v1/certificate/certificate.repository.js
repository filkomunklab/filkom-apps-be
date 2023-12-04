const prisma = require("../../../database");

//show all submited certificate
const findCertificate = async (nik) => {
  const certificate = await prisma.certificate.findMany({
    where: {
      transaction: {
        some: {
          employeeId: nik,
        },
      },
    },
    orderBy: {
      submitDate: "desc",
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
};

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

// find Certificate by category
const findCertificateByCategory = async (category, nik) => {
  console.log("object");
  try {
    const certificate = await prisma.certificate.findMany({
      where: {
        category,
        transaction: {
          some: { employeeId: nik },
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

//add certification
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

//history submited certificate
const findStudentCertificateHistory = async (nim) => {
  try {
    const certificate = await prisma.transaction_Certificate.findMany({
      where: {
        studentId: nim,
      },
      include: {
        Certificate: {
          select: {
            title: true,
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

//list certificate submited history
const findAdvisorCertificateHistory = async (nik) => {
  try {
    const certificate = await prisma.transaction_Certificate.findMany({
      where: {
        employeeId: nik,
      },
      include: {
        Certificate: {
          select: {
            title: true,
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

const approvalStudentCertificate = async (id, status) => {
  try {
    return await prisma.certificate.update({
      where: { id },
      data: {
        approval_status: status,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findCertificate,
  insertCertificate,
  findOneCertificate,
  findCertificateByCategory,
  findStudentCertificateHistory,
  findAdvisorCertificateHistory,
  approvalStudentCertificate,
};
