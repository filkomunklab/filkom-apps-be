const transactionService = require("./transactionGrades.service");

const postTransactionWithGrades = async (req, res) => {
  try {
    const payload = req.body;
    const { nim } = req.params;
    const transaction = await transactionService.createStudentGradesSubmmission(
      payload,
      nim
    );
    res.status(201).send({ status: "OK", data: transaction });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  postTransactionWithGrades,
};
