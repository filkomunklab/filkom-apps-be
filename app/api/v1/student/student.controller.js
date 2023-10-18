//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const studentService = require("./student.service");

const createStudent = async (req, res) => {
    const payload = req.body;
    const student = await studentService.createStudent(payload);
    res.status(201).send({ status: "OK", data: student });
};

module.exports = {
    createStudent,
    // getAllStudent,
    // getStudentById,
    // updateStudentById,
    // deleteStudentById,
}