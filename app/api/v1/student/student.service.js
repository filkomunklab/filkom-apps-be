//Layer untuk handle business logic

const studentRepository = require("./student.repository");
const curriculumRepository = require("../curriculum/curriculum.repository");
const bcrypt = require("bcrypt");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../../../config/firebase");
const { createHttpStatusError } = require("../../../utils");

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

    // data sudah benar langsung masukan ke tabel mahasiswa
    const student = await studentRepository.insertManyStudent(data);
    return student;
  } catch (error) {
    throw error;
  }
};

const findStudentByNim = async (nim) => {
  const student = await studentRepository.findStudentByNim(nim);
  return student;
};

const updateBiodataStudent = async (nim, payload) => {
  const storageRef = ref(
    storage,
    `student/${nim}/${payload.studentImage.filename}`
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
    return await studentRepository.findToUpdateBiodataStudent(
      nim,
      payload,
      path
    );
  } catch (error) {
    throw error;
  }
};

const viewToCheckBiodata = async (nim) => {
  try {
    const student = await studentRepository.findToCheckBiodata(nim);
    return student;
  } catch (error) {
    throw error;
  }
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
    const student = await studentRepository.findAllStudent();
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
  viewToCheckBiodata,
};
