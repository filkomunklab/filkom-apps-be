const activityRepository = require("./activity.repository");

const crateActivityForAllStudent = async (payload, nim) => {
  try {
    const activity = await activityRepository.addActivityForAllStudent(
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

module.exports = {
  crateActivityForAllStudent,
  viewDetailActivity,
};
