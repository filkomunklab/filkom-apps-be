const dashboardService = require("./dashboard_kb.service");
const { policyFor } = require("../policy");

const getAllStatistic = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "dashboard")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
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
