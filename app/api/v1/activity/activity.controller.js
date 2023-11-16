const activityService = require("./activity.service");

const crateActivity = async (req, res) => {
  try {
    const payload = req.body;
    const activity = await activityService.crateActivityForStudent(payload);
    res.status(201).send({ status: "OK", data: activity });
  } catch (error) {
    return error;
  }
};

module.exports = {
  crateActivity,
};
