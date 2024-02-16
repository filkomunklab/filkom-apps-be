const dashboardRepository = require("./dashboard_kb.repository");

const getAllStatistic = async () => {
  try {
    const totalAlumni = await dashboardRepository.totalAlumni();
    const totalAlumniIF = await dashboardRepository.totalAlumniIF();
    const totalAlumniSI = await dashboardRepository.totalAlumniSI();
    const distribusiAlumni = await dashboardRepository.distribusiAlumni();
    const totalTS = await dashboardRepository.countTS();
    const dataByMonth = await dashboardRepository.countDataByMonth();
    const countCategories =
      await dashboardRepository.countCategoriesOfEmployment();
    const countDataForPeta = await dashboardRepository.peta();

    return {
      totalAlumni,
      totalAlumniIF,
      totalAlumniSI,
      distribusiAlumni,
      totalTS,
      dataByMonth,
      countCategories,
      countDataForPeta,
    };
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllStatistic,
};
