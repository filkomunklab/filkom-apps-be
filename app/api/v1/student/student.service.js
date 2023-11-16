//Layer untuk handle business logic

const studentRepository = require("./student.repository");

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

module.exports = {
  createStudent,
  findStudentByNim,
  viewBiodataStudent,
  viewStudentbyEmployeeNik,
};
