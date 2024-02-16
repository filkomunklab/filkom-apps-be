const { status } = require("@prisma/client");
const prisma = require("../../../database");
const moment = require("moment");
const { student } = require("../../../database");

const findCalonTamatanList = async (search_query) => {
  try {
    const calonTamatan = await prisma.formSPT.findMany({
      where: {
        OR: [
          {
            full_name: {
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
      orderBy: [
        {
          created_at: "desc",
        },
      ],
      include: {
        student: {
          select: {
            status: true,
          },
        },
      },
    });

    return calonTamatan;
  } catch (error) {
    error.messsage;
  }
};

//menampilkan list SPT, diurutkan dari created_at paling akhir
const listSPT = async () => {
  return await prisma.formSPT.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      student: {
        select: {
          firstName: true,
          lastName: true,
          reg_num: true,
          dateOfBirth: true,
          gender: true,
          nim: true,
          faculty: true,
          major: true,
          phoneNo: true,
          personalEmail: true,
          status: true,
        },
      },
    },
  });
};

const findSPTById = async (id) => {
  return await prisma.formSPT.findUnique({
    where: { id },
  });
};

const findSPTByNIM = async (nim) => {
  const spt = await prisma.formSPT.findMany({
    where: {
      studentId: nim,
    },
    orderBy: {
      created_at: "desc",
    },
    include: {
      student: {
        select: {
          firstName: true,
          lastName: true,
          reg_num: true,
          dateOfBirth: true,
          gender: true,
          nim: true,
          faculty: true,
          major: true,
          phoneNo: true,
          personalEmail: true,
          status: true,
        },
      },
    },
    take: 1,
  });
  return spt[0];
};

const insertSPT = async (dataSPT, path) => {
  // //mengambil tanggal saat ini
  // const currentDate = moment().format("DD/MM/YYYY");
  // // console.log(currentDate);

  // //menambahkan logika perhitungan tahun ajaran
  // const semester =
  //   parseInt(currentDate.split("/")[1], 10) > 6 ? "Semester I" : "Semester II";
  // const tahunLulus = moment(currentDate, "DD/MM/YYYY").format("YYYY");
  // const tahunAjaran =
  //   semester === "Semester I"
  //     ? `${tahunLulus}/${parseInt(tahunLulus, 10) + 1}` //2023/2024
  //     : `${parseInt(tahunLulus, 10)}/${parseInt(tahunLulus, 10) + 1}`;

  // const semesterLulus =
  //   semester === "Semester I" ? "Semester II" : "Semester I";
  // const graduateYear =
  //   semesterLulus === "Semester I"
  //     ? moment(tahunLulus, "YYYY").format("YYYY")
  //     : moment(tahunLulus, "YYYY").add(1, "y").format("YYYY");

  // // Mengisi kolom 'graduate_plan' dengan hasil perhitungan
  // dataSPT.graduate_plan = `${semesterLulus} ${tahunAjaran}`;

  const spt = await prisma.formSPT.create({
    data: {
      // graduate_year: graduateYear,
      full_name: dataSPT.full_name,
      reg_num: dataSPT.reg_num,
      date_of_birth: dataSPT.date_of_birth,
      faculty: dataSPT.faculty,
      gender: dataSPT.gender,
      major: dataSPT.major,
      nim: dataSPT.nim,
      phone_num: dataSPT.phone_num,
      personal_email: dataSPT.personal_email,
      nik: dataSPT.nik,
      birth_mother: dataSPT.birth_mother,
      graduate_plan: dataSPT.graduate_plan,
      minor: dataSPT.minor,
      remaining_credits: dataSPT.remaining_credits,
      remaining_classes: dataSPT.remaining_classes,
      certificateURL: path,
      approval_fac: dataSPT.approval_fac,
      approval_reg: dataSPT.approval_reg,
      student: { connect: { nim: dataSPT.studentId } }, // Menghubungkan SPT ke mahasiswa berdasarkan nim
    },
  });
  return spt;
};

const patchapprovalByFak = async (id, status) => {
  try {
    return await prisma.formSPT.update({
      where: { id },
      data: {
        approval_fac: status,
      },
    });
  } catch (error) {
    throw error;
  }
};

const listApprovalSPTbyFak = async () => {
  return await prisma.formSPT.findMany({
    where: {
      approval_fac: "APPROVED",
    },
    include: {
      student: {
        select: {
          firstName: true,
          lastName: true,
          reg_num: true,
          dateOfBirth: true,
          gender: true,
          nim: true,
          faculty: true,
          major: true,
          phoneNo: true,
          personalEmail: true,
          status: true,
        },
      },
    },
  });
};

const patchapprovalByReg = async (id, status) => {
  try {
    return await prisma.formSPT.update({
      where: { id },
      data: {
        approval_reg: status,
      },
    });
  } catch (error) {
    throw error;
  }
};

const listApprovalSPTbyReg = async () => {
  return await prisma.formSPT.findMany({
    where: {
      approval_reg: "APPROVED",
    },
    include: {
      student: {
        select: {
          firstName: true,
          lastName: true,
          reg_num: true,
          dateOfBirth: true,
          gender: true,
          nim: true,
          faculty: true,
          major: true,
          phoneNo: true,
          personalEmail: true,
          status: true,
        },
      },
    },
  });
};

//menampilkan data berdasarkan
const filterSPT = async (filter) => {
  const where = {};
  if (filter.graduate_plan) {
    where.graduate_plan = filter.graduate_plan;
  }
  if (filter.approval_fac) {
    where.approval_fac = filter.approval_fac;
  }
  if (filter.approval_reg) {
    where.approval_reg = filter.approval_reg;
  }

  return await prisma.formSPT.findMany({
    where,
    include: {
      student: {
        select: {
          firstName: true,
          lastName: true,
          reg_num: true,
          dateOfBirth: true,
          gender: true,
          nim: true,
          faculty: true,
          major: true,
          phoneNo: true,
          personalEmail: true,
          status: true,
        },
      },
    },
  });
};

//cek form SPT: APPROVED, REJECTED, WAITING, DAN DATA NOT FOUND
const checkFormSPT = async (studentId) => {
  const spt = await prisma.student.findUnique({
    where: {
      nim: studentId,
    },
    include: {
      FormSPT: {
        orderBy: {
          created_at: "desc",
        },
        distinct: "studentId",
      },
    },
  });

  //yang jadi cuma waiting, approved dg rejected belum jadi
  // console.log(spt);
  if (!spt) {
    throw new Error("Data not found");
  } else if (
    spt.FormSPT[0].approval_fac === "APPROVED" &&
    spt.FormSPT[0].approval_reg === "APPROVED"
  ) {
    return "APPROVED";
  } else if (
    spt.FormSPT[0].approval_fac === "REJECTED" &&
    spt.FormSPT[0].approval_reg === "REJECTED"
  ) {
    return "REJECTED";
  } else {
    return "WAITING";
  }
};

//CHANGE STATUS STUDENT: ACTIVE, IN-ACTIVE, GRADUATE
// const patchStudentStatus = async (nim, status) => {
//   try {
//     return await prisma.student.update({
//       where: {
//         nim: nim,
//       },
//       data: {
//         status: status,
//       },
//     });

//   } catch (error) {
//     throw error;
//   }
// };
const patchStudentStatus = async (nim, status) => {
  try {
    const currentDate = moment();
    let updateStatus = { status: status, updatedAt: currentDate };

    // Tambahkan logika untuk mengisi graduate_year jika status adalah "GRADUATE"
    if (status === "GRADUATE") {
      updateStatus.graduate_year = new Date().getFullYear().toString();
    } else if (status === "ACTIVE") {
      updateStatus.graduate_year = null;
    }

    return await prisma.student.update({
      where: {
        nim: nim,
      },
      data: updateStatus,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  insertSPT,
  listSPT,
  findSPTById,
  findSPTByNIM,
  patchapprovalByFak,
  listApprovalSPTbyFak,
  patchapprovalByReg,
  listApprovalSPTbyReg,
  filterSPT,
  checkFormSPT,
  findCalonTamatanList,
  patchStudentStatus,
};
