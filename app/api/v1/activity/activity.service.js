const activityRepository = require("./activity.repository");
const { CreateActivitySchema, AttendanceSchema } = require("./activity.schema");

//===============================Dosen Accesss=======================//
const createActivity = async (payload) => {
  await CreateActivitySchema.validate(payload);
  return await activityRepository.createActivity(payload);
};

const takeAttendance = async (payload) => {
  await AttendanceSchema.validate(payload);
  return await activityRepository.takeAttendance(payload);
};

//=============================STUDENT ACCESS========================//

//============================GENERAL ACCESS=========================//
const viewDetailActivity = async (activityId) => {
  try {
    const activity = await activityRepository.findDetailActivity(activityId);
    return activity;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createActivity,
  viewDetailActivity,
  takeAttendance,
};
