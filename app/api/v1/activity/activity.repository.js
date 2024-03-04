const prisma = require("../../../database");

//==========================Dospem Access============================//
//CREATE ACTIVITY FOR STUDENT
const createActivity = async (payload) => {
  const { members, ...res } = payload;
  return await prisma.aKAD_Activity.create({
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
    await prisma.aKAD_ActivityMember.updateMany({
      where: {
        studentId: {
          in: members,
        },
        activityId: activityId,
      },
      data: {
        presence: true,
      },
    });

    await prisma.aKAD_ActivityMember.updateMany({
      where: {
        studentId: {
          notIn: members,
        },
        activityId: activityId,
      },
      data: {
        presence: false,
      },
    });

    await prisma.aKAD_Activity.update({
      where: {
        id: activityId,
      },
      data: {
        isDone: true,
      },
    });
  });
};

const findDetailActivity = async (payload) => {
  const { activityId } = payload;
  return await prisma.aKAD_Activity.findUnique({
    where: {
      id: activityId,
    },
    include: {
      ActivityMember: {
        include: {
          student: {
            select: {
              firstName: true,
              lastName: true,
              major: true,
            },
          },
        },
      },
    },
  });
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
  const { studentId } = payload;
  return await prisma.aKAD_Activity.findMany({
    where: {
      OR: [
        {
          dueDate: {
            lte: new Date(),
          },
        },
        {
          isDone: true,
        },
      ],
      ActivityMember: {
        some: {
          studentId,
        },
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      dueDate: true,
      createdAt: true,
    },
    orderBy: {
      dueDate: "desc",
    },
  });
};

const getHistoryForAdvisor = async (payload) => {
  const { employeeId } = payload;
  return await prisma.aKAD_Activity.findMany({
    where: {
      OR: [
        {
          dueDate: {
            lte: new Date(),
          },
        },
        {
          isDone: true,
        },
      ],
      employeeId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      dueDate: true,
      createdAt: true,
    },
    orderBy: {
      dueDate: "desc",
    },
  });
};

const getCurrentActivity = async (payload) => {
  const { id } = payload;
  return await prisma.aKAD_Activity.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              dueDate: {
                gt: new Date(),
              },
            },
            {
              isDone: false,
            },
          ],
        },
        {
          OR: [
            {
              employeeId: id,
            },
            {
              ActivityMember: {
                some: {
                  studentId: id,
                },
              },
            },
          ],
        },
      ],
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
    },
  });
};

const getCurrentConsultation = async (payload) => {
  const { id } = payload;
  return await prisma.aKAD_Academic_Consultation.findMany({
    where: {
      OR: [
        {
          receiverId: id,
        },
        {
          studentId: id,
        },
      ],
      status: "OnProcess",
    },
    select: {
      id: true,
      description: true,
      createdAt: true,
      student: {
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
