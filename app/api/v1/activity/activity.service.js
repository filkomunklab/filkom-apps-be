const activityRepository = require("./activity.repository");

const crateActivityForStudent = async (payload) => {
  try {
    const activity = await activityRepository.addActivityForStudent(payload);
    return activity;
  } catch (error) {
    return error;
  }
};

module.exports = {
  crateActivityForStudent,
};
