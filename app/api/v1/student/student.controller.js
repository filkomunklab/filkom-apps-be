//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const studentService = require("./student.service");
const { subject } = require("@casl/ability");
const { policyFor } = require("../policy");
const { xlsxFileSchema } = require("../../../schemas");

const createStudent = async (req, res) => {
  const payload = req.body;
  const student = await studentService.createStudent(payload);
  res.status(201).send({ status: "OK", data: student });
};

const createManyStudent = async (req, res) => {
  try {
    const data = req.body.data;
    const student = await studentService.createManyStudent(data);
    res.status(200).send({ status: "OK", data: student });
  } catch (error) {
    console.log("error di controler: ", error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
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

const viewByEmployeeNik = async (req, res) => {
  const { nik } = req.params;
  try {
    console.log(nik);
    const student = await studentService.viewStudentbyEmployeeNik(nik);
    res.status(200).send({ status: "OK", data: student });
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

const getStudentbyMajor = async (req, res) => {
  const { major } = req.params;
  try {
    const student = await studentService.viewStudentByMajor(major);
    res.status(200).send({ status: "OK", data: student });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getStudentbyArrivalYear = async (req, res) => {
  const { arrival_Year } = req.params;
  try {
    const student = await studentService.viewStudentByArrivalYear(arrival_Year);
    res.status(200).send({ status: "OK", data: student });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllStudent = async (req, res) => {
  try {
    const student = await studentService.viewAllStudent();
    res.status(200).send({ status: "OK", data: student });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getStudentHasNoSupervisorAndActive = async (req, res) => {
  console.log("halo bang");
  try {
    const student = await studentService.getStudentHasNoSupervisorAndActive();
    res.status(200).send({ status: "OK", data: student });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const patchStudentById = async (req, res) => {
  console.log("halo bang");
  try {
    const id = req.params.id;
    const payload = req.body;
    const student = await studentService.updateOrPatchStudentById(id, payload);
    res.send({ status: "OK", data: student });
  } catch (error) {
    console.log("ini error: ", error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteStudentById = async (req, res) => {
  console.log("masuk sini");
  try {
    const id = req.params.id;
    await studentService.deleteStudentById(id);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    console.log(error);
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error || error.Error },
    });
  }
};

//===========================Bimbingan Akademik====================

const patchBiodataStudent = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "biodata")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const payload = req.body;
  const { studentId } = req.params;
  try {
    const student = await studentService.updateBiodataStudent(
      studentId,
      payload
    );
    res.status(201).send({ status: "OK", data: student });
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getToCheckBiodata = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "check_biodata")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const { studentId } = req.params;
  try {
    const student = await studentService.viewToCheckBiodata(studentId);
    res.status(200).send({ status: "OK", data: student });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getBiodataStudent = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "student_biodata")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  try {
    const { studentId } = req.params;
    const student = await studentService.viewBiodataStudent(studentId);
    res.status(200).send({ status: "OK", data: student });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const changePasswordByStudent = async (req, res) => {
  const policy = policyFor(req.user);
  const Student = { id: req.params.id };
  if (!policy.can("update", subject("StudentPassword", Student))) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const payload = req.body;

    const student = await studentService.changePasswordByStudent(id, payload);
    res.status(200).send({ status: "OK", data: student });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const insertByXlsx = async (req, res) => {
  const file = req.file;
  try {
    await xlsxFileSchema.validate({ file });
    await studentService.insertByXlsx(file);
    res.status(201).send({ status: "OK", data: "Data inserted" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
    console.log(error);
    if (error.name === "PrismaClientValidationError") {
      return res.status(400).send({
        status: "FAILED",
        data: { error: "Check xlsx data to follow the field rules" },
      });
    }
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  createStudent,
  getStudentByNim,
  patchBiodataStudent,
  viewByEmployeeNik,
  getAllStudentForManagement,
  updateStudentPassword,
  getStudentbyMajor,
  getStudentbyArrivalYear,
  getAllStudent,
  // getStudentById,
  // updateStudentById,
  // deleteStudentById,
  getStudentHasNoSupervisorAndActive,
  createManyStudent,
  patchStudentById,
  deleteStudentById,
  getToCheckBiodata,
  getBiodataStudent,
  changePasswordByStudent,
  insertByXlsx,
};
