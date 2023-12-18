const prisma = require("../../../database");

//============================Kaprodi Access==========================//
//Waiting List
const findWaitingListGradeSubmission = async (major) => {
  try {
    const transaction = await prisma.transaction_Grades.findMany({
      where: {
        AND: [
          {
            Student: {
              major,
            },
          },
          {
            status: "WAITING",
          },
        ],
      },
      orderBy: {
        submitedDate: "desc",
      },
      select: {
        status: true,
        semester: true,
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

//List History Approval Submission Grades
const findListHistoryApprovalGrades = async (major) => {
  try {
    const transaction = await prisma.transaction_Grades.findMany({
      where: {
        AND: [
          {
            Student: {
              major,
            },
          },
          {
            OR: [
              {
                status: "APPROVED",
              },
              {
                status: "REJECTED",
              },
            ],
          },
        ],
      },
      select: {
        semester: true,
        approveDate: true,
        Student: {
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

//Approval grades
const approvalStudentGrades = async (transactionId, payload) => {
  const { status, comments } = payload;
  try {
    const transaction = await prisma.transaction_Grades.update({
      where: {
        id: transactionId,
      },
      data: {
        status,
        approveDate: new Date(),
        comments,
      },
    });
    return transaction;
  } catch (error) {
    throw error;
  }
};

//===========================Student Access==========================//
//INPUT GRADES
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

//Current Grades Submission
const findCurrentGradeSubmission = async (nim) => {
  try {
    const transaction = await prisma.transaction_Grades.findMany({
      where: {
        AND: [
          {
            student_Nim: nim,
          },
          {
            status: "WAITING",
          },
        ],
      },
      select: {
        semester: true,
        submitedDate: true,
        Student: {
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

//HISTORY GRADE SUBMISSION
const findListStudentHistoryGradeSubmission = async (nim) => {
  try {
    const transaction = await prisma.transaction_Grades.findMany({
      where: {
        AND: [
          {
            student_Nim: nim,
          },
          {
            OR: [
              {
                status: "APPROVED",
              },
              {
                status: "REJECTED",
              },
            ],
          },
        ],
      },
      select: {
        semester: true,
        approveDate: true,
        Student: {
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

//LIST SEMESTER
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

//===========================General Access==========================//
//generalAccess
const findStudentGradeSubmissionById = async (transactionId) => {
  try {
    const transaction = await prisma.transaction_Grades.findUnique({
      where: {
        id: transactionId,
      },
      select: {
        Student: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        Employee: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        semester: true,
        status: true,
        submitedDate: true,
        approveDate: true,
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

module.exports = {
  insertDataforGrades,
  findWaitingListGradeSubmission,
  findStudentGradeSubmissionById,
  findListSemesterGrades,
  approvalStudentGrades,
  findListHistoryApprovalGrades,
  findCurrentGradeSubmission,
  findListStudentHistoryGradeSubmission,
};
