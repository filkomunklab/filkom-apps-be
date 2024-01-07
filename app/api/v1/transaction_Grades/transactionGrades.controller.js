const transactionService = require("./transactionGrades.service");

//===========================Kaprodi Access==========================//
//WAITING LIST GRADE SUBMISSION (sort by major)
const getWaitingListStudentGradeSubmission = async (req, res) => {
  console.log("masuk sni");
  const { major } = req.params;
  try {
    const transaction =
      await transactionService.WaitingListStudentGradeSubmmission(major);
    res.status(200).send({ status: "OK", data: transaction });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//WAITING LIST GRADE SUBMISSION (sort by semester)
const getWaitingListBySemester = async (req, res) => {
  const payload = req.params;
  const { semester } = req.body;
  try {
    const transaction = await transactionService.filterBySemester(
      payload,
      semester
    );
    res.status(200).send({ status: "OK", data: transaction });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//History Approval Grades
const getHistoryApprovalGrades = async (req, res) => {
  const { major } = req.params;
  try {
    const transaction =
      await transactionService.historyListStudentGradesSubmission(major);
    res.status(200).send({ status: "OK", data: transaction });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//APPROVAL GRADES
const putApprovalGrades = async (req, res) => {
  const { transactionId } = req.params;
  const payload = req.body;
  try {
    const transaction = await transactionService.ApprovalGrades(
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

//===========================Student Access=========================//
//APPROVED GRADES LIST
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

//GRADES SUBMISSION
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

//Waiting Grades Approval
const getCurrentGradeSubmission = async (req, res) => {
  const { nim } = req.params;
  try {
    const transaction = await transactionService.viewCurrentGradeSubmission(
      nim
    );
    res.status(200).send({ status: "OK", data: transaction });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//Approval Grades History
const getStudentHistoryGradeSubmission = async (req, res) => {
  const { nim } = req.params;
  try {
    const transaction =
      await transactionService.viewStudentHistorytGradeSubmission(nim);
    res.status(200).send({ status: "OK", data: transaction });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===========================General Access=========================//
//General Access
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

module.exports = {
  postTransactionWithGrades,
  getWaitingListStudentGradeSubmission,
  getStudentGradeSubmissionDetail,
  getListSemesterGrades,
  putApprovalGrades,
  getHistoryApprovalGrades,
  getCurrentGradeSubmission,
  getStudentHistoryGradeSubmission,
  getWaitingListBySemester,
};
