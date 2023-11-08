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

module.exports = {
  createStudent,
  findStudentByNim,
};
