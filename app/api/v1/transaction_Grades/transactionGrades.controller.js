const transactionService = require("./transactionGrades.service");
const { policyFor } = require("../policy");

//===========================Kaprodi Access==========================//
//WAITING LIST GRADE SUBMISSION (sort by major)
const getWaitingListStudentGradeSubmission = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "grades_waiting_list")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

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
  const policy = policyFor(req.user);
  if (!policy.can("read", "grades_waiting_semester")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

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

//Kaprodi History Approval Grades
const getHistoryApprovalGrades = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "grades_history_approval")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

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

//Kaprodi APPROVAL GRADES
const putApprovalGrades = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "grades_approval")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

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
  const policy = policyFor(req.user);
  if (!policy.can("read", "approved_semester_grades")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

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
  const policy = policyFor(req.user);
  if (!policy.can("create", "upload_grades")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

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
  const policy = policyFor(req.user);
  if (!policy.can("read", "grades_student_current")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

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
  const policy = policyFor(req.user);
  if (!policy.can("read", "grades_student_history")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

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
//Detail Submission
const getStudentGradeSubmissionDetail = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "grades_submission_detail")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

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
