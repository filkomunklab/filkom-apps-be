const prisma = require("../../../database");

const getAllLecturer = async () => {
  return await prisma.aKAD_Lecturer.findMany();
};

module.exports = {
  getAllLecturer,
};
