const prisma = require("../../../database");

const findStudentByToken = async (token) => {
  const student = await prisma.student.findUnique({
    where: {
      token,
    },
  });
  return student;
};

const updateStudent = async (id, payload) => {
  const { nim, password, firstName, lastName, email, phoneNo, token } = payload;
  const student = await prisma.student.update({
    where: {
      id,
    },
    data: {
      nim,
      password,
      firstName,
      lastName,
      email,
      phoneNo,
      token,
    },
  });
  return student;
};

module.exports = {
  findStudentByToken,
  updateStudent,
};
