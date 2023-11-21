const prisma = require("../../../database");

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
};
