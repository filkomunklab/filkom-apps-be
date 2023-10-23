//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const academicService = require("./academic_calendar.service");
const { policyFor } = require("../policy");

//===================================================================
// @description     Create academic calendar
// @route           POST /academic-calendar
// @access          DOSEN_MK
const createAcademicCalendar = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("create", "Academic_Calendar")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const payload = req.body;
    if (!(payload.semester && payload.year)) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "Some field is missing" } });
    }
    const academic = await academicService.createAcademicCalendar(payload);
    res.status(201).send({ status: "OK", data: academic });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get academic calendar
// @route           GET /academic-calendar/:id
// @access          DOSEN_MK
const getAcademicCalendarById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "Academic_Calendar")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const academic = await academicService.getAcademicCalendarById(id);
    res.status(200).send({ status: "OK", data: academic });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get all academic calendar
// @route           GET /academic-calendar
// @access          DOSEN_MK
const getAllAcademicCalendar = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "Academic_Calendar")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const academic = await academicService.getAllAcademicCalendar();
    res.status(200).send({ status: "OK", data: academic });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  createAcademicCalendar,
  getAcademicCalendarById,
  getAllAcademicCalendar,
};
