const dashboardService = require("./dashboard_ba.service");
//======================Dosen Pembimbing Statistic===================//

//Total Active & InActive Student Guidance
const getTotalStudentGuidance = async (req, res) => {
  try {
    const statistic = await dashboardService.viewStudentGuidanceTotal();
    res.status(200).send({ status: "OK", data: statistic });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//Total Active Student Guidance
const getTotalActiveStudentGuidance = async (req, res) => {
  try {
    const statistic = await dashboardService.viewActiveStudentGuidanceTotal();
    res.status(200).send({ status: "OK", data: statistic });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//Total InActive Student Guidance
const getTotalInActiveStudentGuidance = async (req, res) => {
  try {
    const statistic = await dashboardService.viewInActiveStudentGuidanceTotal();
    res.status(200).send({ status: "OK", data: statistic });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//========================Kaprodi Statistic==========================//

//Total All major Student
const getAllMajorStudent = async (req, res) => {
  try {
    const statistic = await dashboardService.viewAllMajorStudent();
    res.status(200).send({ status: "OK", data: statistic });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//Total All active Student major
const getAllTotalActiveMajorStudent = async (req, res) => {
  try {
    const statistic = await dashboardService.viewTotalOfActiveMajorStudent();
    res.status(200).send({ status: "OK", data: statistic });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//all Inactive Student Major
const getAllTotalInActiveMajorStudent = async (req, res) => {
  try {
    const statistic = await dashboardService.viewTotalOfInActiveMajorStudent();
    res.status(200).send({ status: "OK", data: statistic });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//=================================General==============================//

//Total Of All Active & InActive major student (arrival year)
const getAllTotalMajorStudent = async (req, res) => {
  try {
    const statistic = await dashboardService.viewTotalOfMajorStudent();
    res.status(200).send({ status: "OK", data: statistic });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//Total of all category Certificate Student (Approved)
const getAllCertificateCategory = async (req, res) => {
  try {
    const statistic = await dashboardService.viewTotalCategoryCertificate();
    res.status(200).send({ status: "OK", data: statistic });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//==========================Dekan Statistic==========================//
const getTotalAllFacultyStudent = async (req, res) => {
  try {
    const statistic = await dashboardService.viewTotalAllFacultyStudent();
    res.status(200).send({ status: "OK", data: statistic });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getTotalAllActiveFacultyStudent = async (req, res) => {
  try {
    const statistic = await dashboardService.viewTotalAllActiveFacultyStudent();
    res.status(200).send({ status: "OK", data: statistic });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getTotalAllInActiveFacultyStudent = async (req, res) => {
  try {
    const statistic =
      await dashboardService.viewTotalAllInActiveFacultyStudent();
    res.status(200).send({ status: "OK", data: statistic });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  //DOSPEM
  getTotalStudentGuidance,
  getTotalActiveStudentGuidance,
  getTotalInActiveStudentGuidance,
  //MAJOR
  getAllMajorStudent,
  getAllTotalMajorStudent,
  getAllTotalActiveMajorStudent,
  getAllTotalInActiveMajorStudent,
  //General
  getAllCertificateCategory,
  //DEKAN
  getTotalAllFacultyStudent,
  getTotalAllActiveFacultyStudent,
  getTotalAllInActiveFacultyStudent,
};
