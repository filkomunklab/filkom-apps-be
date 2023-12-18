const prisma = require("../../../database");

//==========================Dospem Access============================//
//CREATE ACTIVITY FOR STUDENT
const addActivityForAllStudent = async (payload, nim) => {
  const { title, description, date, time, openAbsen, employeeNik } = payload;
  try {
    const activity = await prisma.activity.create({
      data: {
        title,
        description,
        date,
        time,
        openAbsen,
        transaction: {
          create: {
            studentNim: nim,
            employeeNik,
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
  addActivityForAllStudent,
  findDetailActivity,
};
