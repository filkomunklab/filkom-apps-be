const prisma = require("../../../database");

const insertDataforGrades = async (payload, nim) => {
  try {
    const { semester, employeeNik } = payload;
    const transaction = await prisma.transaction_Grades.create({
      data: {
        semester,
        employeeNik,
        student_Nim: nim,
      },
    });
    return transaction;
  } catch (error) {
    throw error;
  }
};

const findListGradeSubmmisionByNik = async (nik) => {
  try {
    const transaction = await prisma.transaction_Grades.findMany({
      where: {
        employeeNik: nik,
      },
      // select: {
      //   // submitedDate,
      //   // status,
      //   // semester,
      // },
      orderBy: {
        submitedDate: "desc",
      },
      include: {
        Student: {
          select: {
            nim: true,
            firstName: true,
            lastName: true,
            major: true,
            arrival_Year: true,
          },
        },
        Employee: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return transaction;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  insertDataforGrades,
  findListGradeSubmmisionByNik,
};
