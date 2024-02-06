const prisma = require("../../../database");

/*=============================== GRADES ACCESS =============================*/

// create access for input graes
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

//find list grades access for dekan
const findlistGradesAccess = async () => {
  try {
    const openAccess = await prisma.grades_access.findMany({
      include: {
        Employee: {
          select: {
            id: true,
            nik: true,
            firstName: true,
            lastName: true,
            major: true,
          },
        },
      },
    });
    return openAccess;
  } catch (error) {
    throw error;
  }
};

//find list grades access for kaprodi
const findlistGradesAccessByMajor = async (major) => {
  try {
    const openAccess = await prisma.grades_access.findMany({
      where: {
        major,
      },
    });
    return openAccess;
  } catch (error) {
    throw error;
  }
};

// close manual access for grades input
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

//cek access
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

//automate close access
const automateCloesGradesAccess = () => {
  prisma.grades_access.updateMany({
    where: {
      isOpen: true,
      due_date: {
        lte: new Date(),
      },
    },
    data: {
      isOpen: false,
    },
  });
};

module.exports = {
  addOpenGradesAccess,
  setCloseGradesAccess,
  findlistGradesAccess,
  findToCheckOpenGradesAccess,
  findlistGradesAccessByMajor,
  automateCloesGradesAccess,
};
