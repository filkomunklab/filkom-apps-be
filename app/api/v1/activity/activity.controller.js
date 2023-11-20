const activityService = require("./activity.service");

const crateActivity = async (req, res) => {
  const payload = req.body;
  const { nim } = req.params;
  try {
    const activity = await activityService.crateActivityForStudent(
      payload,
      nim
    );
    res.status(201).send({ status: "OK", data: activity });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  crateActivity,
};
