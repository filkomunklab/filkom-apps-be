const prisma = require("../../../database");

const addActivityForStudent = async (payload, nik) => {
  const { title, description, date, time } = payload;
  const activity = await prisma.student.create({
    data: {
      title,
      description,
      date,
      time,
    },
  });
  return activity;
};

module.exports = {
  addActivityForStudent,
};
