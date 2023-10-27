const tsRepository = require("./ts.repository");

const tracerStudy = async () => {
  return await tsRepository.tracerstudy();
};

const createTS = async (dataSPT) => {
  return await tsRepository.createTS(dataSPT);
};

module.exports = {
  createTS,
  tracerStudy,
};
