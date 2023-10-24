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
      // include: {
      //   transaction: {
      //     include: {
      //       student: {
      //         select: {
      //           firstName: true,
      //           lastName: true,
      //         },
      //       },
      //     },
      //   },
      // },
    });
    console.log(certificate);
    return certificate;
  } catch (error) {
    return error;
  }
};

//add certification
const insertCertificate = async (payload, nim, certificateFile) => {
  const { title, category, description, employeeId } = payload;
  const { path, filename } = certificateFile;
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
    console.log(error);
  }
};

module.exports = {
  findCertificate,
  insertCertificate,
  findOneCertificate,
  findCertificateByCategory,
};
