const prisma = require("../../../database");

/*=============================== GRADES ACCESS =============================*/
const addOpenGradesAccess = async (payload) => {
  const { semester, semester_period, major, due_date, employeeNik } = payload;
  try {
    const openAccess = await prisma.grades_access.create({
      data: {
        semester,
        semester_period,
        major,
        due_date,
        employeeNik,
      },
    });
    return openAccess;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findlistGradesAccess = async () => {
  try {
    const openAccess = await prisma.grades_access.findMany();
    return openAccess;
  } catch (error) {
    throw error;
  }
};

const setCloseGradesAccess = async (id) => {
  try {
    const openAccess = await prisma.grades_access.update({
      where: { id },
      data: {
        isOpen: false,
      },
    });
    return openAccess;
  } catch (error) {
    throw error;
  }
};

const findToCheckOpenGradesAccess = async (major) => {
  try {
    const openAccess = await prisma.grades_access.findFirst({
      where: {
        major,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return openAccess;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addOpenGradesAccess,
  setCloseGradesAccess,
  findlistGradesAccess,
  findToCheckOpenGradesAccess,
};
