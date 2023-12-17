const gradesService = require("./grades.service");

const getDetailSemesterGrades = async (req, res) => {
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
