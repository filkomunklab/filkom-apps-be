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

const biodataStudent = async (req, res) => {
  const payload = req.body;
  const { nim } = req.params;
  try {
    const student = await studentService.viewBiodataStudent(nim, payload);
    console.log(student);
    res.status(201).send({ status: "OK", data: student });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const viewByEmployeeNik = async (req, res) => {
  const { nik } = req.params;
  try {
    console.log(nik);
    const student = await studentService.viewStudentbyEmployeeNik(nik);
    res.status(201).send({ status: "OK", data: student });
  } catch (error) {
    return error;
  }
};

const getAllStudentForManagement = async (req, res) => {
  try {
    const students = await studentService.getAllStudent();
    const data = students.map((student) => {
      return {
        fullName: `${student.firstName} ${student.lastName}`,
        nim: student.nim,
        studentEmail: student.studentEmail,
        faculty: student.faculty,
        major: student.major,
      };
    });
    res.status(200).send({ status: "OK", data: data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateStudentPassword = async (req, res) => {
  try {
    const { nim } = req.params;
    const payload = req.body;
    await studentService.updateStudentPassword(nim, payload);
    res.status(200).send({ status: "OK", data: "Password updated" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  createStudent,
  getStudentByNim,
  biodataStudent,
  viewByEmployeeNik,
  getAllStudentForManagement,
  updateStudentPassword,
  // getStudentById,
  // updateStudentById,
  // deleteStudentById,
};
