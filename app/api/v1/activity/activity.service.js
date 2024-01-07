const activityRepository = require("./activity.repository");
const {
  CreateActivitySchema,
  AttendanceSchema,
  GetStudentListSchema,
} = require("./activity.schema");

//===============================Dosen Accesss=======================//
const createActivity = async (payload) => {
  const valid = await CreateActivitySchema.validate(payload);
  return await activityRepository.createActivity(valid);
};

const takeAttendance = async (payload) => {
  await AttendanceSchema.validate(payload);
  return await activityRepository.takeAttendance(payload);
};

const getStudentList = async (payload) => {
  await GetStudentListSchema.validate(payload);
  return await activityRepository.getStudentList(payload);
};

const getRecentActivity = async (payload) => {
  const activities = await activityRepository.getCurrentActivity(payload);
  const consultations = await activityRepository.getCurrentConsultation(
    payload
  );

  const recentActivity = activities.concat(consultations);
  console.log(recentActivity);
  return "helo";
};

//=============================STUDENT ACCESS========================//
const getHistoryForStudent = (payload) => {
  return activityRepository.getHistoryForStudent(payload);
};

const getHistoryForAdvisor = (payload) => {
  return activityRepository.getHistoryForAdvisor(payload);
};

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
  getHistoryForStudent,
  getHistoryForAdvisor,
  viewDetailActivity,
  getRecentActivity,
  createActivity,
  getStudentList,
  takeAttendance,
};
