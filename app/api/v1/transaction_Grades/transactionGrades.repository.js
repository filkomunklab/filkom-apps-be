const prisma = require("../../../database");

//============================Kaprodi Access==========================//
//Waiting List Grade submmision (sort by major)
const findWaitingListGradeSubmission = async (major) => {
  console.log("haloooo");
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
        id: true,
        status: true,
        semester: true,
        submitedDate: true,
        Student: {
          select: {
            nim: true,
            firstName: true,
            lastName: true,
            major: true,
            arrivalYear: true,
            GuidanceClassMember: {
              select: {
                gudianceClass: {
                  select: {
                    id: true,
                    teacher: {
                      select: {
                        id: true,
                        nik: true,
                        firstName: true,
                        lastName: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return transaction;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Waiting List grade submission (sort by semester)
const findWaitingListGradeSubmissionBySemester = async (payload, semester) => {
  const { major } = payload;
  try {
    const transaction = await prisma.transaction_Grades.findMany({
      where: {
        AND: [
          {
            semester,
          },
          {
            status: "WAITING",
          },
          {
            Student: {
              major,
            },
          },
        ],
      },
      orderBy: {
        submitedDate: "desc",
      },
      select: {
        id: true,
        status: true,
        semester: true,
        submitedDate: true,
        Student: {
          select: {
            nim: true,
            firstName: true,
            lastName: true,
            major: true,
            arrivalYear: true,
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
    console.log(error);
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
        id: true,
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
    const { semester } = payload;
    const transaction = await prisma.transaction_Grades.create({
      data: {
        semester,
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
        id: true,
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
        id: true,
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

//LIST Approved Grades/semester (student acccess)
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
        id: true,
        semester: true,
        status: true,
        student_Nim: true,
      },
    });
    return transaction;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//===========================General Access==========================//
//detail submission
const findStudentGradeSubmissionById = async (transactionId) => {
  try {
    const transaction = await prisma.transaction_Grades.findUnique({
      where: {
        id: transactionId,
      },
      include: {
        Student: {
          select: {
            id: true,
            nim: true,
            firstName: true,
            lastName: true,
            GuidanceClassMember: {
              select: {
                gudianceClass: {
                  select: {
                    id: true,
                    teacher: {
                      select: {
                        id: true,
                        nik: true,
                        firstName: true,
                        lastName: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        Grades: {
          select: {
            grades: true,
            lecturer: true,
            description: true,
            subjectName: true,
          },
        },
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
  findWaitingListGradeSubmission,
  findStudentGradeSubmissionById,
  findListSemesterGrades,
  approvalStudentGrades,
  findListHistoryApprovalGrades,
  findCurrentGradeSubmission,
  findListStudentHistoryGradeSubmission,
  findWaitingListGradeSubmissionBySemester,
};
