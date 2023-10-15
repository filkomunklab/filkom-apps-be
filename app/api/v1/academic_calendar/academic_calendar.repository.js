//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// Fungsi untuk mencari data akademik yang sudah ada
const findExistingAcademic = async (payload) => {
    const {
        semester,
        year,
    } = payload;
    const academic = await prisma.academic_Calendar.findFirst({
        where: {
            semester,
            year,
        },
    });
    return academic;
}

// create academic
const insertAcademic = async (payload) => {
    const {
        semester,
        year,
    } = payload;
    const academic = await prisma.academic_Calendar.create({
      data: {
        semester,
        year,
      },
    });
  
    return academic;
};

// get 1 academic
const findAcademicById = async (id) => {
    const academic = await prisma.academic_Calendar.findUnique({
        where: {
            id,
        },
    });
    return academic;
};

// get all academic
const findAllAcademic = async () => {
    const academic = await prisma.academic_Calendar.findMany();
    return academic;
};

module.exports = {
    findExistingAcademic,
    insertAcademic,
    findAcademicById,
    findAllAcademic,

}