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

//find Certificate by category
const findCertificateBycCategory = async (category, studentId) => {
  const certificate = await prisma.certificate.findUnique({
    where: {
      category,
      studentId,
    },
  });
  return category;
};

//add certification
const insertCertificate = async (payload, nim) => {
  const { title, category, description, employeeId } = payload;
  const certificate = await prisma.certificate.create({
    data: {
      title,
      category,
      description,
      transaction: {
        create: {
          studentId: nim,
          employeeId,
        },
      },
    },
  });
  return certificate;
};

const viewCertificate = async () => {};

module.exports = {
  findCertificate,
  insertCertificate,
  findCertificateBycCategory,
  viewCertificate,
};
