//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// @description     Get student by id
// @used            Submission, Proposal
const findStudentById = async (id) => {
  const student = await prisma.student.findUnique({
    where: {
      id,
    },
  });
  return student;
};

// @description     Get student by nim
// @used            Classroom
const findStudentByNim = async (nim) => {
  const student = await prisma.student.findUnique({
    where: {
      nim,
    },
  });
  return student;
};

// create submission
const insertStudent = async (payload) => {
  const {
    nim,
    password,
    firstName,
    lastName,
    faculty,
    major,
    gender,
    guardianName,
    guardianEducation,
    guardianReligion,
    guardianStatus,
    familyRelation,
    guardianEmail,
    guardianPhoneNo,
    guardianAddress,
  } = payload;
  const student = await prisma.student.create({
    data: {
      nim,
      password,
      firstName,
      lastName,
      faculty,
      major,
      gender,
      guardianName,
      guardianEducation,
      guardianReligion,
      guardianStatus,
      familyRelation,
      guardianEmail,
      guardianPhoneNo,
      guardianAddress,
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

const findBiodataStudent = async (nim) => {
  const student = await prisma.student.findUnique({
    where: {
      nim,
    },
    include: {
      Employee: {
        select: {
          firstName: true,
          lastName: true,
          phoneNum: true,
          email: true,
          Address: true,
        },
      },
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
  findBiodataStudent,
};
