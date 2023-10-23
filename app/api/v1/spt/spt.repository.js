const { status } = require("@prisma/client");
const prisma = require("../../../database");
const moment = require('moment');

//menampilkan list SPT, diurutkan dari created_at paling akhir
const listSPT = async () => {
    return await prisma.formSPT.findMany({
      orderBy: {
          graduate_plan: 'desc' // 'asc' untuk urutan menaik, 'desc' untuk urutan menurun
      },
      include: {
        student: true,
      },
  });
}

const findSPTById = async (id) => {
    return await prisma.formSPT.findUnique({
        where: { id },
        include: {
            student: true,
        }
    });
};

const insertSPT = async (dataSPT) => {
    //mengambil tanggal saat ini
    const currentDate = moment().format("DD/MM/YYYY");

    //menambahkan logika perhitungan tahun ajaran
    const semester = parseInt(currentDate.split("/")[1], 10) > 6 ? "Semester I" : "Semester II";
    const tahunLulus = moment(currentDate, "DD/MM/YYYY").format("YYYY");
    const tahunAjaran =
    semester === "Semester I"
    ? `${tahunLulus}/${parseInt(tahunLulus, 10) + 1}`
    : `${parseInt(tahunLulus, 10)}/${parseInt(tahunLulus, 10) + 1}`;

  const semesterLulus = semester === "Semester I" ? "Semester II" : "Semester I";

    // Mengisi kolom 'graduate_plan' dengan hasil perhitungan
    dataSPT.graduate_plan = `${semesterLulus} ${tahunAjaran}`;

    const spt = await prisma.formSPT.create({
      data: {
        nik: dataSPT.nik,
        date_of_birth: dataSPT.date_of_birth,
        gender: dataSPT.gender,
        birth_mother: dataSPT.birth_mother,
        graduate_plan: dataSPT.graduate_plan,
        minor: dataSPT.minor,
        remaining_credits: dataSPT.remaining_credits,
        remaining_classes: dataSPT.remaining_classes,
        approvalFak: dataSPT.approvalFak,
        approvalReg: dataSPT.approvalReg,
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
            approvalFak: status,
        },
        include: {
            student: true,
          },
        });
    } catch (error) {
        throw error;
    }
};

const listApprovalSPTbyFak = async () => {
return await prisma.formSPT.findMany({
    where: {
        approvalFak: 'APPROVED',
    },
    include: {
        student: true,
      },
});
};

const patchapprovalByReg = async (id, status) => {
    try {
        return await prisma.formSPT.update({
        where: { id },
        data: {
            approvalReg: status,
        },
        include: {
            student: true,
          },
        });
    } catch (error) {
        throw error;
    }
};

const listApprovalSPTbyReg = async () => {
    return await prisma.formSPT.findMany({
        where: {
            approvalReg: 'APPROVED',
        },
        include: {
            student: true,
          },
    });
};

//menampilkan data berdasarkan
const sortSPT = async (filter) => {
    const where = {};
    if (filter.graduate_plan){
        where.graduate_plan = filter.graduate_plan;
    }
    if (filter.approvalFak){
        where.approvalFak = filter.approvalFak;
    }
    if (filter.approvalReg){
        where.approvalReg = filter.approvalReg;
    }

    return await prisma.formSPT.findMany({
        where,
        include: {
            student: true,
        }
    })
}


module.exports = {
    insertSPT,
    listSPT,
    findSPTById,
    patchapprovalByFak,
    listApprovalSPTbyFak,
    patchapprovalByReg,
    listApprovalSPTbyReg,
    sortSPT,
}
