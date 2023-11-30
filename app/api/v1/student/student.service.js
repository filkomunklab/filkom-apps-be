//Layer untuk handle business logic

const studentRepository = require("./student.repository");
const bcrypt = require("bcrypt");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../../../config/firebase");

const createStudent = async (payload) => {
  const student = await studentRepository.insertStudent(payload);
  return student;
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

module.exports = {
  createStudent,
  findStudentByNim,
  updateBiodataStudent,
  viewStudentbyEmployeeNik,
  getAllStudent,
  updateStudentPassword,
};
