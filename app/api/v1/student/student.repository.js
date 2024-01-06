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
        employeeNik: nik,
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

// create submission
const insertManyStudent = async (data) => {
  try {
    const student = await prisma.student.createMany({
      data,
    });

    return student;
  } catch (error) {
    throw error.message;
  }
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

const findToUpdateBiodataStudent = async (nim, payload, path) => {
  const {
    bloodType,
    studentEmail,
    phoneNo,
    AreaOfConcentration,
    highSchoolGrad,
    currentAddress,
    guardianName,
    guardianReligion,
    familyRelation,
    guardianAddress,
    guardianEducation,
    guardianStatus,
    guardianEmail,
    guardianPhoneNo,
  } = payload;
  const { filename } = payload.studentImage;
  try {
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
        guardianName,
        guardianReligion,
        familyRelation,
        guardianAddress,
        guardianEducation,
        guardianStatus,
        guardianEmail,
        guardianPhoneNo,
        filename,
        path,
      },
      include: {
        GuidanceClassMember: {
          select: {
            gudianceClass: {
              select: {
                id: true,
                teacher: {
                  select: {
                    id: true,
                    nik: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phoneNum: true,
                    Address: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return student;
  } catch (error) {
    console.log(error);
    throw error;
  }
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

const findStudentByMajor = async (major) => {
  try {
    const student = await prisma.student.findMany({
      where: {
        major,
      },
    });
    return student;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findStudentByArrivalYear = async (arrival_Year) => {
  try {
    const student = await prisma.student.findMany({
      where: {
        arrival_Year,
      },
    });
    return student;
  } catch (error) {
    throw error;
  }
};

const findAllStudent = async () => {
  try {
    const student = await prisma.student.findMany();
    return student;
  } catch (error) {
    throw error;
  }
};

const updateEmployeeNikStudentByNim = async (employeeNik, nims) => {
  try {
    const student = await prisma.student.updateMany({
      where: {
        nim: {
          in: nims,
        },
      },
      data: {
        employeeNik,
      },
    });

    return student;
  } catch (error) {
    throw error.message;
  }
};

const selectStudentHasNoSupervisorAndActive = async () => {
  console.log("halo");
  try {
    const student = await prisma.student.findMany({
      where: {
        AND: [
          {
            employeeNik: null,
          },
          {
            status: "ACTIVE",
          },
        ],
      },
    });

    return student;
  } catch (error) {
    throw error.message;
  }
};

module.exports = {
  findStudentById,
  findStudentByNim,
  findStudentByEmployeeNik,
  insertStudent,
  updateStudent,
  findStudentByToken,
  findToUpdateBiodataStudent,
  getAllStudent,
  updateByNim,
  findStudentByMajor,
  findStudentByArrivalYear,
  findAllStudent,
  updateEmployeeNikStudentByNim,
  selectStudentHasNoSupervisorAndActive,
  insertManyStudent,
};
