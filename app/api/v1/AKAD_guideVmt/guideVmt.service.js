const guideVmtRepository = require("./guideVmt.repository");

const postAcademicGuide = async (payload) => {
  return await guideVmtRepository.postAcademicGuide(payload);
};

const changeAcademicGuide = async (payload, id) => {
  return await guideVmtRepository.changeAcademicGuide(payload, id);
};

const getAcademicGuide = async () => {
  return await guideVmtRepository.getAcademicGuide();
};

//=============================VISI MISI TUJUAN ===============================
const postVmt = async (payload) => {
  return await guideVmtRepository.postVmt(payload);
};

const getVisiMisiTujuan = async () => {
  return await guideVmtRepository.getVisiMisiTujuan();
};

const getVisiMisiTujuanFakultas = async () => {
  return await guideVmtRepository.getVisiMisiTujuanFakultas();
};

const getVisiMisiTujuanProdiIF = async () => {
  return await guideVmtRepository.getVisiMisiTujuanProdiIF();
};

const getVisiMisiTujuanSI = async () => {
  return await guideVmtRepository.getVisiMisiTujuanSI();
};

const getVisiMisiTujuanTI = async () => {
  return await guideVmtRepository.getVisiMisiTujuanTI();
};

const patchvisiMisiTujuan = async (payload, id) => {
  return await guideVmtRepository.changeVmt(payload, id);
};

module.exports = {
  //Academic Guide
  postAcademicGuide,
  changeAcademicGuide,
  getAcademicGuide,
  //Visi Misi Tujuan
  postVmt,
  getVisiMisiTujuan,
  getVisiMisiTujuanFakultas,
  getVisiMisiTujuanProdiIF,
  getVisiMisiTujuanSI,
  getVisiMisiTujuanTI,
  patchvisiMisiTujuan,
};
