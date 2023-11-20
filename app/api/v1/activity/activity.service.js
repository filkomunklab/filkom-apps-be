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

module.exports = {
  crateActivityForStudent,
};
