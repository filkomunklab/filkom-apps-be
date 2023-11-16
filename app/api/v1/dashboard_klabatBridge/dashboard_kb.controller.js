const dashboardService = require("./dashboard_kb.service");

const getAllStatistic = async (req, res) => {
  try {
    const alumniStatistic = await dashboardService.getAllStatistic();
    // console.log(alumniStatistic);
    res.send({ status: "OK", data: alumniStatistic });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllStatistic,
};
