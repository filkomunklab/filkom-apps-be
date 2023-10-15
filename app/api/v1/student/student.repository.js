//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// create submission
const insertStudent = async (payload) => {
    const {
        nim,
        password,
        firstName,
        faculty,
        major,
    } = payload;
    const student = await prisma.student.create({
      data: {
        nim,
        password,
        firstName,
        faculty,
        major,
      },
    });
  
    return student;
};

const updateStudent = async (id, payload) => {
  const { 
    nim, 
    password, 
    firstName, 
    lastName, 
    token } 
  = payload;
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
  insertStudent,
  updateStudent,
  findStudentByToken,
}