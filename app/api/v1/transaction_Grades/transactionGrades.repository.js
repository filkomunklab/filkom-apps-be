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

module.exports = {
  insertDataforGrades,
};
