const prisma = require("../../../database");

//==========================Dospem Access============================//
//CREATE ACTIVITY FOR STUDENT
const createActivity = async (payload) => {
  const { members, ...res } = payload;
  return await prisma.activity.create({
    data: {
      ...res,
      ActivityMember: {
        createMany: {
          data: [...members],
        },
      },
    },
  });
};

const takeAttendance = async (payload) => {
  const { activityId, members } = payload;
  return await prisma.$transaction(async (prisma) => {
    await prisma.activityAbsence.updateMany({
      where: {
        studentNim: {
          in: members,
        },
        activityId: activityId,
      },
      data: {
        presence: true,
      },
    });

    await prisma.activityAbsence.updateMany({
      where: {
        studentNim: {
          notIn: members,
        },
        activityId: activityId,
      },
      data: {
        presence: false,
      },
    });
  });
};

// const addActivityForChoossenStudent = async (payload, nik) => {
//   //
// };

//=============================Student Access=========================//
// const findActivityFromDospem = async (nik) => {
//   const activity = await prisma.activity.findMany({});
// };

//==============================General Access========================//
const findDetailActivity = async (activityId) => {
  try {
    const activity = await prisma.activity.findUnique({
      where: {
        id: activityId,
      },
      include: {
        activityAbsent: true,
      },
    });
    return activity;
  } catch (error) {
    return error;
  }
};

const getStudentList = async (payload) => {
  const { guidanceClassId, major, faculty } = payload;
  return await prisma.student.findMany({
    where: {
      OR: [
        {
          GuidanceClassMember: {
            guidanceClassId,
          },
        },
        {
          major,
        },
        {
          faculty,
        },
      ],
    },
    select: {
      firstName: true,
      lastName: true,
      nim: true,
      major: true,
      status: true,
    },
  });
};

const getHistoryForStudent = async (payload) => {
  const { studentNim } = payload;
  return await prisma.activity.findMany({
    where: {
      dueDate: {
        lte: new Date(),
      },
      ActivityMember: {
        some: {
          studentNim,
        },
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      dueDate: true,
    },
  });
};

const getHistoryForAdvisor = async (payload) => {
  const { employeeNik } = payload;
  return await prisma.activity.findMany({
    where: {
      employeeNik,
      dueDate: {
        lte: new Date(),
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      dueDate: true,
    },
  });
};

const getCurrentActivity = async (payload) => {
  const { employeeNik } = payload;
  return await prisma.activity.findMany({
    where: {
      employeeNik,
      dueDate: {
        gte: new Date(),
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      dueDate: true,
    },
  });
};

const getCurrentConsultation = async (payload) => {
  const { employeeNik } = payload;
  return await prisma.academic_Consultation.findMany({
    where: {
      receiver_nik: employeeNik,
      status: {
        not: "Complete",
      },
    },
    select: {
      id: true,
      description: true,
      createdAt: true,
      receiver: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

module.exports = {
  getCurrentConsultation,
  getHistoryForStudent,
  getHistoryForAdvisor,
  getCurrentActivity,
  findDetailActivity,
  getStudentList,
  createActivity,
  takeAttendance,
};
