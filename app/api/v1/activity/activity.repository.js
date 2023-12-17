const prisma = require("../../../database");

const addActivityForAllStudent = async (payload, nim) => {
  const { title, description, date, time } = payload;
  try {
    const activity = await prisma.activity.create({
      data: {
        title,
        description,
        date,
        time,
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
