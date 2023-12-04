const prisma = require("../../../database");

//======================== Employee access ========================//
const addActivityForStudent = async (payload, nim) => {
  const { title, description, date, time, employeeId } = payload;
  try {
    const activity = await prisma.activity.create({
      data: {
        title,
        description,
        date,
        time,
        transaction: {
          create: {
            studentId: nim,
            employeeId,
          },
        },
      },
    });
    return activity;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const openAccessStudentInputGrades = async (nik) => {
  try {
    const activity = await prisma.activity.update({
      where: {
        transaction: {
          include: {
            employeeId: nik,
          },
        },
      },
      data: {
        grades_access: true,
      },
    });
    return activity;
  } catch (error) {
    throw error;
  }
};

//======================== Student Access ========================//
const studentInsertGradeSubmission = async (payload, nim) => {
  const { grades, retrival_to, paralel, subjectId } = payload;
  try {
    const studentGrades = await prisma.grades.createMany({
      data: {
        grades,
        paralel,
        retrival_to,
        subject: {
          subjectId,
        },
        include: {
          student: {
            create: {
              studentId: nim,
            },
          },
        },
      },
    });

    return studentGrades;
  } catch (error) {
    throw error;
  }
};

//======================== General Access ========================//
const findDetailActivity = async (activityId) => {
  try {
    const activity = await prisma.activity.findUnique({
      where: {
        id: activityId,
      },
    });
    return activity;
  } catch (error) {
    return error;
  }
};

module.exports = {
  addActivityForStudent,
  findDetailActivity,
  openAccessStudentInputGrades,
  studentInsertGradeSubmission,
};
