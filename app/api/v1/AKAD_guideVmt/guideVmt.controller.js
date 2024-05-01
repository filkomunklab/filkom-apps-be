const guideVmtService = require("./guideVmt.service");
const { guideVmtPolicy } = require("./guideVmt.policy");

const postAcademicGuide = async (req, res) => {
  const payload = req.body;
  try {
    const data = await guideVmtService.postAcademicGuide(payload);
    res.send({ status: "OK", data: data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const changeAcademicGuide = async (req, res) => {
  const policy = guideVmtPolicy(req.user);
  const payload = req.body;
  const { id } = req.params;
  try {
    if (!policy.can("update", "academic-guide")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const vmt = await guideVmtService.changeAcademicGuide(payload, id);
    res.send({ status: "OK", data: vmt });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAcademicGuide = async (req, res) => {
  try {
    const vmt = await guideVmtService.getAcademicGuide();
    res.send({ status: "OK", data: vmt });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
  console.log("ini error:", error);
};

//================================VISI MISI TUJUAN===============================
const postVmt = async (req, res) => {
  const payload = req.body;
  try {
    const data = await guideVmtService.postVmt(payload);
    res.send({ status: "OK", data: data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getVisiMisiTujuan = async (req, res) => {
  try {
    const vmt = await guideVmtService.getVisiMisiTujuan();
    res.send({ status: "OK", data: vmt });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getVisiMisiTujuanFakultas = async (req, res) => {
  try {
    const vmt = await guideVmtService.getVisiMisiTujuanFakultas();
    res.send({ status: "OK", data: vmt });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getVisiMisiTujuanProdiIF = async (req, res) => {
  try {
    const vmt = await guideVmtService.getVisiMisiTujuanProdiIF();
    res.send({ status: "OK", data: vmt });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getVisiMisiTujuanSI = async (req, res) => {
  try {
    const vmt = await guideVmtService.getVisiMisiTujuanSI();
    res.send({ status: "OK", data: vmt });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getVisiMisiTujuanTI = async (req, res) => {
  try {
    const vmt = await guideVmtService.getVisiMisiTujuanTI();
    res.send({ status: "OK", data: vmt });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const patchvisiMisiTujuan = async (req, res) => {
  const policy = guideVmtPolicy(req.user);
  const payload = req.body;
  const { id } = req.params;
  try {
    if (!policy.can("update", "visi-misi-tujuan")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const vmt = guideVmtService.patchvisiMisiTujuan(payload, id);
    res.send({ status: "OK", data: vmt });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
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
