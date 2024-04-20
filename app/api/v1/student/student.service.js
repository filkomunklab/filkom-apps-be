//Layer untuk handle business logic

const studentRepository = require("./student.repository");
const curriculumRepository = require("../curriculum/curriculum.repository");
const userRoleRepository = require("../user_management/user_namagement.repository");
const bcrypt = require("bcrypt");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../../../config/firebase");
const { createHttpStatusError, extractXlsx } = require("../../../utils");
const prisma = require("../../../database");

const createStudent = async (payload) => {
  const student = await studentRepository.insertStudent(payload);
  return student;
};

const createManyStudent = async (data) => {
  try {
    let curriculumId;

    // ambil array object curriculum
    let curriculum = await curriculumRepository.selectAllCurriculum();

    // data ini berisi array object mahasiswa
    data = data.map((itemData) => {
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(itemData.password, salt);

      // mengganti data mahasiswa untuk curriculumMajor dan curriculumYear menjadi curriculumId
      curriculum.forEach((itemCurriculum) => {
        if (
          itemCurriculum.major.toLocaleLowerCase() ===
            itemData.curriculumMajor.toLocaleLowerCase() &&
          itemCurriculum.year === itemData.curriculumYear
        ) {
          curriculumId = itemCurriculum.id;
        }
      });
      if (curriculumId) {
        let tmp = curriculumId;
        curriculumId = "";
        const { curriculumMajor, curriculumYear, ...itemWithoutMajorAndYear } =
          itemData;
        return {
          ...itemWithoutMajorAndYear,
          curriculumId: tmp,
          password,
        };
      } else {
        // jika pada satu mahasiswa tidak ada curriculum yang ditemukan
        throw createHttpStatusError(
          "curriculum data is missing! Please double check whether the student's curriculum data matches the curriculum data in the application.",
          400
        );
      }
    });

    const result = await prisma.$transaction(
      async (prisma) => {
        // data sudah benar langsung masukan ke tabel mahasiswa
        const students = await studentRepository.insertManyStudent(
          data,
          prisma
        );

        const userRole = students.map((item) => {
          return {
            userId: item.id,
            role: "MAHASISWA",
          };
        });

        await userRoleRepository.CreateManyRole(prisma, userRole);
        return students;
      },
      { timeout: 30, maxWait: 25 }
    );

    return result;
  } catch (error) {
    throw error;
  }
};

const findStudentByNim = async (nim) => {
  const student = await studentRepository.findStudentByNim(nim);
  return student;
};

const viewStudentbyEmployeeNik = async (nik) => {
  try {
    const student = await studentRepository.findStudentByEmployeeNik(nik);
    return student;
  } catch (error) {
    throw error;
  }
};

const getAllStudent = async () => {
  try {
    const students = await studentRepository.getAllStudent();
    return students;
  } catch (error) {
    throw error;
  }
};

const updateStudentPassword = async (nim, payload) => {
  try {
    if (payload.newPassword !== payload.confirmPassword) {
      throw {
        status: 400,
        message: "Password not match",
      };
    }
    const hashedPassword = await bcrypt.hash(payload.newPassword, 10);
    const data = {
      password: hashedPassword,
    };
    await studentRepository.updateByNim(nim, data);
  } catch (error) {
    throw error;
  }
};

const viewStudentByMajor = async (major) => {
  try {
    const student = await studentRepository.findStudentByMajor(major);
    return student;
  } catch (error) {
    throw error;
  }
};

const viewStudentByArrivalYear = async (arrival_Year) => {
  try {
    const student = await studentRepository.findStudentByArrivalYear(
      arrival_Year
    );
    return student;
  } catch (error) {
    throw error;
  }
};

const viewAllStudent = async () => {
  try {
    let student = await studentRepository.findAllStudent();

    // Gunakan Promise.all untuk menunggu semua promise selesai
    student = await Promise.all(
      student.map(async (item) => {
        try {
          // Dapatkan role untuk setiap employee
          let role = await userRoleRepository.FindUserRoleByUserId(item.id);
          return { ...item, role };
        } catch (error) {
          throw error;
        }
      })
    );
    return student;
  } catch (error) {
    throw error;
  }
};

const getStudentHasNoSupervisorAndActive = async () => {
  try {
    const student =
      await studentRepository.selectStudentHasNoSupervisorAndActive();

    return student;
  } catch (error) {
    throw error.message;
  }
};

const updateOrPatchStudentById = async (id, payload) => {
  const studentFinding = await studentRepository.findStudentById(prisma, id);
  if (studentFinding) {
    if (payload.password) {
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(payload.password, salt);
      payload = { ...payload, password };
    }

    const student = await studentRepository.updateStudent(id, payload);
    return student;
  } else {
    createHttpStatusError("Student id is not found", 400);
  }
};

const deleteStudentById = async (id) => {
  try {
    await prisma.$transaction(
      async (prisma) => {
        const student = await studentRepository.findStudentById(prisma, id);
        await studentRepository.deleteStudent(prisma, id);
        await userRoleRepository.deleteUserRoles(prisma, student.id);
        return;
      },
      { timeout: 30, maxWait: 25 }
    );
  } catch (error) {
    throw error;
  }
};

//===============================Bimbingan Akademik==================
const updateBiodataStudent = async (studentId, payload) => {
  const storageRef = ref(
    storage,
    `student/${studentId}/${payload.studentImage.filename}`
  );
  const metadata = { contentType: "image/jpeg" };
  try {
    const binaryString = atob(payload.studentImage.buffer);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    await uploadBytes(storageRef, byteArray, metadata);
    const path = await getDownloadURL(storageRef);

    if (payload.password) {
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(payload.password, salt);
      payload = { ...payload, password };
    }

    return await studentRepository.findToUpdateBiodataStudent(
      studentId,
      payload,
      path
    );
  } catch (error) {
    throw error;
  }
};

const viewToCheckBiodata = async (studentId) => {
  try {
    const student = await studentRepository.findToCheckBiodata(studentId);
    return student;
  } catch (error) {
    throw error;
  }
};

const viewBiodataStudent = async (studentId) => {
  try {
    return await studentRepository.findBiodataStudent(studentId);
  } catch (error) {
    throw error;
  }
};

const changePasswordByStudent = async (id, payload) => {
  try {
    const student = await studentRepository.findStudentById(prisma, id);

    if (!student) {
      throw createHttpStatusError("Your Account is not found!!");
    }

    const checkPassword = bcrypt.compareSync(
      payload.oldPassword,
      student.password
    );

    if (checkPassword) {
      if (payload.newPassword === payload.confirmationNewPassword) {
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(payload.newPassword, salt);

        const updatePasswordStudent = await studentRepository.updateStudent(
          id,
          { password }
        );

        console.log("ini update password student: ", updatePasswordStudent);
        return updatePasswordStudent;
      } else {
        throw createHttpStatusError(
          "New Password and Confirmation Do Not Match"
        );
      }
    } else {
      throw createHttpStatusError("Incorrect Old Password", 400);
    }
  } catch (error) {
    throw error;
  }
};

const insertByXlsx = async (file) => {
  const data = extractXlsx(file);
  const normalize = data.map((data) => ({
    nim: data.nim?.toString(),
    firstName: data.firstName,
    lastName: data.lastName,
    phoneNo: data.phoneNo?.toString(),
    gender: data.gender,
    major: data.major,
    religion: data.religion,
    currentResidenceStatus: data.currentResidenceStatus,
    studentEmail: data.studentEmail,
    address: data.address,
    curriculumId: data.curriculumId,
    guardianName: data.guardianName,
    familyRelation: data.familyRelation,
    reg_num: data.reg_num,
    arrivalYear: data.arrivalYear?.toString(),
  }));

  await prisma.$transaction(
    async (prisma) => {
      await prisma.student.createMany({
        data: normalize,
        skipDuplicates: true,
      });

      const students = await prisma.student.findMany({
        where: {
          nim: {
            in: normalize.map((item) => item.nim),
          },
        },
        select: {
          id: true,
        },
      });

      const rolePaylod = students.map((item) => {
        return {
          userId: item.id,
          role: "MAHASISWA",
        };
      });

      await prisma.userRole.createMany({
        data: rolePaylod,
        skipDuplicates: true,
      });
    },
    { timeout: 30, maxWait: 20 }
  );
};

module.exports = {
  createStudent,
  findStudentByNim,
  updateBiodataStudent,
  viewStudentbyEmployeeNik,
  getAllStudent,
  updateStudentPassword,
  viewStudentByMajor,
  viewStudentByArrivalYear,
  viewAllStudent,
  getStudentHasNoSupervisorAndActive,
  createManyStudent,
  updateOrPatchStudentById,
  deleteStudentById,
  viewToCheckBiodata,
  viewBiodataStudent,
  changePasswordByStudent,
  insertByXlsx,
};
