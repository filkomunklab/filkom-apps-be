const dashboardService = require("./dashboard_ba.service");
const { policyFor } = require("../policy");
//======================Dosen Pembimbing Statistic===================//

//Total Active & InActive Student Guidance
const getTotalStudentGuidance = async (req, res) => {
  // const policy = policyFor(req.user);
  // if (!policy.can("read", "total_student")) {
  //   return res.status(401).send({
  //     status: "FAILED",
  //     data: { error: "You don't have permission to perform this action" },
  //   });
  // }

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
    const policy = policyFor(req.user);
    if (!policy.can("read", "total_major_student")) {
      return res.status(401).send({
        status: "FAILED",
        data: { error: "You don't have permission to perform this action" },
      });
    }

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
  const policy = policyFor(req.user);
  if (!policy.can("read", "total_active_major")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

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
    const policy = policyFor(req.user);
    if (!policy.can("read", "total_inactive_major")) {
      return res.status(401).send({
        status: "FAILED",
        data: { error: "You don't have permission to perform this action" },
      });
    }

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
    const policy = policyFor(req.user);
    if (!policy.can("read", "statistic_student")) {
      return res.status(401).send({
        status: "FAILED",
        data: { error: "You don't have permission to perform this action" },
      });
    }

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
    const policy = policyFor(req.user);
    if (!policy.can("read", "statistic_certificate")) {
      return res.status(401).send({
        status: "FAILED",
        data: { error: "You don't have permission to perform this action" },
      });
    }

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
    const policy = policyFor(req.user);
    if (!policy.can("read", "total_faculty_student")) {
      return res.status(401).send({
        status: "FAILED",
        data: { error: "You don't have permission to perform this action" },
      });
    }

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
    const policy = policyFor(req.user);
    if (!policy.can("read", "total_active_faculty")) {
      return res.status(401).send({
        status: "FAILED",
        data: { error: "You don't have permission to perform this action" },
      });
    }

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
    const policy = policyFor(req.user);
    if (!policy.can("read", "total_inactive_faculty")) {
      return res.status(401).send({
        status: "FAILED",
        data: { error: "You don't have permission to perform this action" },
      });
    }

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
