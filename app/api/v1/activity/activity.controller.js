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

//==========================Student Access===========================//

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
  createActivity,
  detailActivity,
  takeAttendance,
};
