//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const classroomService = require("./classroom.service");
const { policyFor } = require("../policy");

//===================================================================
// @description     Create classroom
// @route           POST /classroom
// @access          DOSEN_MK
const createClassroom = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("create", "Classroom")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const payload = req.body;
    if (!(payload.academic_id && payload.name)) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "Some field is missing" } });
    }
    const classroom = await classroomService.createClassroom(userId, payload);
    res.status(201).send({ status: "OK", data: classroom });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get list classroom
// @route           GET /classroom/list
// @access          DOSEN_MK
const getListClassroom = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "Classroom")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const classroom = await classroomService.getListClassroom(userId);
    res.status(200).send({ status: "OK", data: classroom });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get classroom by id
// @route           GET /classroom/:id
// @access          DOSEN_MK
const getClassroomById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "Classroom")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const classroom = await classroomService.getClassroomById(id);
    res.status(200).send({ status: "OK", data: classroom });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get all classroom
// @route           GET /classroom
// @access          DOSEN_MK
const getAllClassroom = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "Classroom")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const classroom = await classroomService.getAllClassroom(userId);
    res.status(200).send({ status: "OK", data: classroom });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Input student into classroom
// @route           POST /classroom/insert-student
// @access          DOSEN_MK
const inputStudent = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("manage", "thesis_student")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const payload = req.body;
    if (!(payload.classroom_id && payload.students)) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "Some field is missing" } });
    }
    const thesis_student = await classroomService.inputStudents(payload);
    res.status(201).send({ status: "OK", data: thesis_student });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Delete classroom by id
// @route           DELETE /classroom/:id
// @access          DOSEN_MK
const deleteClassroomById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("delete", "Classroom")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    await classroomService.deleteClassroomById(id);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Delete student by id
// @route           DELETE /classroom/delete-student/:id"
// @access          DOSEN_MK
const deleteStudentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("delete", "Classroom")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    await classroomService.deleteStudentById(id);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  createClassroom,
  getListClassroom,
  getClassroomById,
  getAllClassroom,
  inputStudent,
  deleteClassroomById,
  deleteStudentById,
};
