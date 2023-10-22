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
    // include: {
    //   transaction: {
    //     include: {
    //       Student: {
    //         select: {
    //           firstName: true,
    //           lastName: true,
    //         },
    //       },
    //       Employee: {
    //         select: {
    //           firstName: true,
    //           lastName: true,
    //         },
    //       },
    //     },
    //   },
    // },
  });
  return certificate;
};

//find Certificate by category
// const findCertificateBycCategory = async (category, studentId) => {
//   const certificate = await prisma.certificate.findUnique({
//     where: {
//       category,
//       studentId,
//     },
//   });
//   return category;
// };

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

module.exports = {
  findCertificate,
  insertCertificate,
  findOneCertificate,
  // findCertificateBycCategory,
};
