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

const gradesSubmission = async (req, res) => {
  const payload = req.body;
  const { nim } = req.params;
  try {
    const activity = await activityService.viewDetailActivity(payload, nim);
    res.status(201).send({ status: "OK", data: activity });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  crateActivity,
  detailActivity,
};
