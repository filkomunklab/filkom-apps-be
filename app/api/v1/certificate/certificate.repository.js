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
        },
      },
    },
  });
  console.log(certificate);
  return certificate;
};

const findOneCertificate = async (certificateId) => {
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
    console.log(certificate);
    return certificate;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//add certification
const insertCertificate = async (payload, nim, path) => {
  const { title, category, description, employeeId } = payload;
  const { filename } = payload.certificateFile;
  console.log(nim);
  console.log(employeeId);
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
            studentId: nim,
            employeeId,
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
};
