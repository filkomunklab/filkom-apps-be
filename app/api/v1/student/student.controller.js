//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const studentService = require("./student.service");

const createStudent = async (req, res) => {
  const payload = req.body;
  const student = await studentService.createStudent(payload);
  res.status(201).send({ status: "OK", data: student });
};

const getStudentByNim = async (req, res) => {
  const { nim } = req.params;
  try {
    const student = await studentService.findStudentByNim(nim);
    res.status(200).send({ status: "OK", data: student });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  createStudent,
  getStudentByNim,
  // getAllStudent,
  // getStudentById,
  // updateStudentById,
  // deleteStudentById,
};
