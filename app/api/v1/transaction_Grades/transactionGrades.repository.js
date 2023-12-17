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

const findStudentGradeSubmissionById = async (transactionId) => {
  try {
    const transaction = await prisma.transaction_Grades.findUnique({
      where: {
        id: transactionId,
      },
      include: {
        Grades: {
          select: {
            grades: true,
            retrival_to: true,
            paralel: true,
            subjectName: true,
          },
        },
      },
    });
    return transaction;
  } catch (error) {}
};

const addComments = async (transactionId, payload) => {
  const { comments } = payload;
  try {
    console.log("ini comments: ", payload.comments);
    const transaction = await prisma.transaction_Grades.update({
      where: {
        id: transactionId,
      },
      data: {
        comments,
      },
    });
    return transaction;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const approvalGrades = async (id, status) => {
  try {
    return await prisma.transaction_Grades.update({
      where: { id },
      data: {
        status: status,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findListSemesterGrades = async (nim) => {
  try {
    const transaction = await prisma.transaction_Grades.findMany({
      where: {
        AND: [
          {
            student_Nim: nim,
          },
          {
            status: "APPROVED",
          },
        ],
      },
      select: {
        semester: true,
      },
    });
    return transaction;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  insertDataforGrades,
  findListGradeSubmmisionByNik,
  findStudentGradeSubmissionById,
  addComments,
  approvalGrades,
  findListSemesterGrades,
};
