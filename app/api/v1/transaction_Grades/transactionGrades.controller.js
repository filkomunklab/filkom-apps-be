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

const getListStudentGradeSubmission = async (req, res) => {
  const { nik } = req.params;
  try {
    const transaction =
      await transactionService.viewListStudentGradeSubmmission(nik);
    res.status(200).send({ status: "OK", data: transaction });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getStudentGradeSubmissionDetail = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const transaction =
      await transactionService.viewStudentGradeSubmissionDetail(transactionId);
    res.status(200).send({ status: "OK", data: transaction });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const putComment = async (req, res) => {
  const { transactionId } = req.params;
  const payload = req.body;
  try {
    const transaction = await transactionService.giveComment(
      transactionId,
      payload
    );
    res.status(201).send({ status: "OK", data: transaction });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const patchStatusGradeSubmission = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.query.status;
    const transaction = await transactionService.approveStudentGrades(
      id,
      status
    );

    res.status(201).send({ status: "OK", data: transaction });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getListSemesterGrades = async (req, res) => {
  const { nim } = req.params;
  try {
    const transaction = await transactionService.viewListSemesterGrades(nim);
    res.status(200).send({ status: "OK", data: transaction });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  postTransactionWithGrades,
  getListStudentGradeSubmission,
  getStudentGradeSubmissionDetail,
  putComment,
  patchStatusGradeSubmission,
  getListSemesterGrades,
};
