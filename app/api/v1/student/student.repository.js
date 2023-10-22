//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// get student in group
const findStudentById = async (id) => {
  const student = await prisma.student.findUnique({
    where: {
      id,
    },
  });
  return student;
};

// Menemukan student berdasarkan NIM
const findStudentByNim = async (nim) => {
  const student = await prisma.student.findUnique({
    where: {
      nim,
    },
  });
  console.log("student: ", student.id);
  return student;
};

// create submission
const insertStudent = async (payload) => {
  const { nim, password, firstName, faculty, major, gender } = payload;
  const student = await prisma.student.create({
    data: {
      nim,
      password,
      firstName,
      faculty,
      major,
      gender,
    },
  });

  return student;
};

const updateStudent = async (id, payload) => {
  const { nim, password, firstName, lastName, token } = payload;
  const employee = await prisma.student.update({
    where: {
      id,
    },
    data: {
      nim,
      password,
      firstName,
      lastName,
      token,
    },
  });
  return employee;
};

const findStudentByToken = async (token) => {
  const student = await prisma.student.findUnique({
    where: {
      token,
    },
  });
  return student;
};

module.exports = {
  findStudentById,
  findStudentByNim,

  insertStudent,
  updateStudent,
  findStudentByToken,
};
