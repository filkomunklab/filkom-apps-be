const prisma = require("../../../database");

//==========================Dospem Access============================//
//CREATE ACTIVITY FOR STUDENT
const createActivity = async (payload) => {
  const { members, ...res } = payload;
  console.log(...members);
  return await prisma.activity.create({
    data: {
      ...res,
      activityAbsent: {
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
    });
    return activity;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createActivity,
  findDetailActivity,
  takeAttendance,
};
