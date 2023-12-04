const activityRepository = require("./activity.repository");

const crateActivityForStudent = async (payload, nim) => {
  try {
    const activity = await activityRepository.addActivityForStudent(
      payload,
      nim
    );
    return activity;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const viewDetailActivity = async (activityId) => {
  try {
    const activity = await activityRepository.findDetailActivity(activityId);
    return activity;
  } catch (error) {
    return error;
  }
};

const studentGradesSubmission = async (payload, nim) => {
  try {
    const activity = await activityRepository.studentInsertGradeSubmission(
      payload,
      nim
    );
    return activity;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  crateActivityForStudent,
  viewDetailActivity,
  studentGradesSubmission,
};
