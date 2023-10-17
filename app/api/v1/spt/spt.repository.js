const prisma = require("../../../database");

const findSPT = async () => {
    return await prisma.formSPT.findMany()
}

const findSPTById = async (id) => {
    return await prisma.formSPT.findUnique({
        where: { id },
    });
};

const insertSPT = async (dataSPT) => {
    const spt = await prisma.formSPT.create({
      data: {
        nik: dataSPT.nik,
        date_of_birth: dataSPT.date_of_birth,
        gender: dataSPT.gender,
        birth_mother: dataSPT.birth_mother,
        remaining_credits: dataSPT.remaining_credits,
        remaining_classes: dataSPT.remaining_classes,
        graduate_plan: dataSPT.graduate_plan,
        student: { connect: { nim: dataSPT.studentId } }, // Menghubungkan SPT ke mahasiswa berdasarkan nim
    },
    });
    return spt;
};

module.exports = {
    findSPT,
    findSPTById,
    insertSPT,
}
