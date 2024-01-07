const activityService = require("./activity.service");

//==========================DOSEN ACCESS=============================//
const createActivity = async (req, res) => {
  const payload = req.body;
  try {
    const activity = await activityService.createActivity(payload);
    res.status(201).send({ status: "OK", data: activity });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: error.message } });
    }
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const takeAttendance = async (req, res) => {
  const body = req.body;
  const { activityId } = req.params;
  const payload = {
    activityId,
    ...body,
  };
  try {
    const activity = await activityService.takeAttendance(payload);
    res.status(200).send({ status: "OK", data: activity });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: error.message } });
    }
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getStudentList = async (req, res) => {
  const payload = req.query;
  try {
    const studentList = await activityService.getStudentList(payload);
    res.status(200).send({ status: "OK", data: studentList });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: error.message } });
    }
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getHistoryForAdvisor = async (req, res) => {
  const payload = req.params;
  try {
    const history = await activityService.getHistoryForAdvisor(payload);
    res.status(200).send({ status: "OK", data: history });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getRecentActivity = async (req, res) => {
  const payload = req.params;
  try {
    const recentActivity = await activityService.getRecentActivity(payload);
    res.status(200).send({ status: "OK", data: recentActivity });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//==========================Student Access===========================//
const getHistoryForStudent = async (req, res) => {
  const payload = req.params;
  try {
    const history = await activityService.getHistoryForStudent(payload);
    res.status(200).send({ status: "OK", data: history });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//==============================GENERAL ACCESS=======================//
const detailActivity = async (req, res) => {
  const { activityId } = req.params;
  try {
    const activity = await activityService.viewDetailActivity(activityId);
    res.status(201).send({ status: "OK", data: activity });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getHistoryForStudent,
  getHistoryForAdvisor,
  getRecentActivity,
  getStudentList,
  createActivity,
  detailActivity,
  takeAttendance,
};
