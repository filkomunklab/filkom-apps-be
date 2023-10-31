const dashboardRepository = require("./dashboard_kb.repository");

const totalAlumni = async () => {
  return await dashboardRepository.totalAlumni();
};

const totalAlumniIF = async () => {
  return await dashboardRepository.totalAlumniIF();
};

const totalAlumniSI = async () => {
  return await dashboardRepository.totalAlumniSI();
};

const distribusiAlumni = async () => {
  return await dashboardRepository.distribusiAlumni();
};

const totalTS = async () => {
  return await dashboardRepository.countTS();
};

const getAllStatistic = async () => {
  try {
    const totalAlumni = await dashboardRepository.totalAlumni();
    const totalAlumniIF = await dashboardRepository.totalAlumniIF();
    const totalAlumniSI = await dashboardRepository.totalAlumniSI();
    const distribusiAlumni = await dashboardRepository.distribusiAlumni();
    const totalTS = await dashboardRepository.countTS();

    return {
      totalAlumni,
      totalAlumniIF,
      totalAlumniSI,
      distribusiAlumni,
      totalTS,
    };
  } catch (error) {
    return error;
  }
};

module.exports = {
  totalAlumni,
  totalAlumniIF,
  totalAlumniSI,
  distribusiAlumni,
  totalTS,
  getAllStatistic,
};
