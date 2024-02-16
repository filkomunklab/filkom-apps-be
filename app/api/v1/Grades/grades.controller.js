const gradesService = require("./grades.service");
const { policyFor } = require("../policy");

const getDetailSemesterGrades = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "grades_detail_only")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const { transactionId } = req.params;
  try {
    const grades = await gradesService.viewDetailSemesterGrades(transactionId);
    res.status(200).send({ status: "OK", data: grades });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getDetailSemesterGrades,
};
