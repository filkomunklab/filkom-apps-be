//Layer untuk handle business logic

const studentRepository = require("./student.repository");

const createStudent = async (payload) => {
    const student = await studentRepository.insertStudent(payload);
    return student;
};

module.exports = {
    createStudent,

}