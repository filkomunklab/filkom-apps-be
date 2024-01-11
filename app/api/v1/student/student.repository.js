//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// @description     Get student by id
// @used            Submission, Proposal
const findStudentById = async (prisma, id) => {
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
const insertManyStudent = async (data, prisma) => {
  try {
    const students = await Promise.all(
      data.map((studentData) => {
        return prisma.student.create({
          data: studentData,
        });
      })
    );

    console.log("ini isi insert student repo: ", students);
    return students;
  } catch (error) {
    throw error.message;
  }
};

const updateStudent = async (id, payload) => {
  const student = await prisma.student.update({
    where: {
      id,
    },
    data: payload,
  });
  return student;
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
    dateOfBirth,
    phoneNo,
    AreaOfConcentration,
    highSchoolGrad,
    currentAddress,
    currentResidenceStatus,
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
        dateOfBirth,
        phoneNo,
        AreaOfConcentration,
        highSchoolGrad,
        currentAddress,
        currentResidenceStatus,
        guardianEducation,
        guardianStatus,
        guardianEmail,
        guardianPhoneNo,
        filename,
        path,
        biodataCheck: true,
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

const findToCheckBiodata = async (nim) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        nim,
      },
      select: {
        biodataCheck: true,
        id: true,
        nim: true,
        firstName: true,
        lastName: true,
      },
    });
    return student;
  } catch (error) {
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
    const student = await prisma.student.findMany({
      include: {
        curriculum: true,
      },
    });
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

const deleteStudent = async (prisma, id) => {
  try {
    await prisma.student.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw error;
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
  deleteStudent,
  findToCheckBiodata,
};
