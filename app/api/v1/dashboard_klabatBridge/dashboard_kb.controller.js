const dashboardService = require("./dashboard_kb.service");

const getTotalAlumni = async (req, res) => {
  try {
    const totalAlumni = await dashboardService.totalAlumni();
    console.log(totalAlumni);
    res.send({ status: "OK", count: totalAlumni });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getTotalAlumniIF = async (req, res) => {
  try {
    const totalAlumniIF = await dashboardService.totalAlumniIF();
    res.send({ status: "OK", count: totalAlumniIF });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getTotalAlumniSI = async (req, res) => {
  try {
    const totalAlumniSI = await dashboardService.totalAlumniSI();
    res.send({ status: "OK", count: totalAlumniSI });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getDistribusiAlumni = async (req, res) => {
  try {
    const distribusiAlumni = await dashboardService.distribusiAlumni();
    console.log(distribusiAlumni);
    res.send({ status: "OK", data: distribusiAlumni });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllStatistic = async (req, res) => {
  try {
    const alumniStatistic = await dashboardService.getAllStatistic();
    console.log(alumniStatistic);
    res.send({ status: "OK", data: alumniStatistic });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getTotalAlumni,
  getTotalAlumniIF,
  getTotalAlumniSI,
  getDistribusiAlumni,
  getAllStatistic,
};
