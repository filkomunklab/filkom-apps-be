const preRegisRepository = require("./preRegis.repository");

const viewPreRegisMenu = async (major, year) => {
  try {
    const preRegis = await preRegisRepository.findSubjectForPreRegis(
      major,
      year
    );
    return preRegis;
  } catch (error) {
    return error;
  }
};

module.exports = {
  viewPreRegisMenu,
};
