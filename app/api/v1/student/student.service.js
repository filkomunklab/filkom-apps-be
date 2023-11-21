//Layer untuk handle business logic

const studentRepository = require("./student.repository");
const bcrypt = require("bcrypt");

const createStudent = async (payload) => {
  const student = await studentRepository.insertStudent(payload);
  return student;
};

const findStudentByNim = async (nim) => {
  const student = await studentRepository.findStudentByNim(nim);
  return student;
};

const viewBiodataStudent = async (nim) => {
  try {
    const student = await studentRepository.findBiodataStudent(nim);
    return student;
  } catch (error) {
    return error;
  }
};

const viewStudentbyEmployeeNik = async (nik) => {
  try {
    const student = await studentRepository.findStudentByEmployeeNik(nik);
    return student;
  } catch (error) {
    return error;
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
  viewBiodataStudent,
  viewStudentbyEmployeeNik,
  getAllStudent,
  updateStudentPassword,
};
