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

const findStudentByEmployeeNik = async (nik) => {
  try {
    const student = await prisma.student.findMany({
      where: {
        employeeId: nik,
      },
    });
    return student;
  } catch (error) {
    return error;
  }
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
    // employeeId,
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
      // employeeId,
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

const findBiodataStudent = async (nim, payload) => {
  const {
    bloodType,
    studentEmail,
    phoneNo,
    AreaOfConcentration,
    highSchoolGrad,
    currentAddress,
    guardianEducation,
    guardianStatus,
    guardianEmail,
    guardianPhoneNo,
  } = payload;
  const student = await prisma.student.update({
    where: {
      nim,
    },
    data: {
      bloodType,
      studentEmail,
      phoneNo,
      AreaOfConcentration,
      highSchoolGrad,
      currentAddress,
      guardianEducation,
      guardianStatus,
      guardianEmail,
      guardianPhoneNo,
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

const getAllStudent = async () => {
  const students = await prisma.student.findMany({
    orderBy: {
      firstName: "asc",
    },
  });
  return students;
};

const updateByNim = async (nim, payload) => {
  await prisma.student.update({
    where: {
      nim,
    },
    data: payload,
  });
};

module.exports = {
  findStudentById,
  findStudentByNim,
  insertStudent,
  updateStudent,
  findStudentByToken,
  findBiodataStudent,
  findStudentByEmployeeNik,
  getAllStudent,
  updateByNim,
};
