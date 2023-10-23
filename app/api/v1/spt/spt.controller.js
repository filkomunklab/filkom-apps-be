//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const sptService = require("./spt.service");

const getListSPT = async (req, res) => {
  try {
    const listSPT = await sptService.getListSPT();
    res.send({ status: "OK", data: listSPT });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getSPTById = async (req, res) => {
  try {
    const id = req.params.id;
    const spt = await sptService.getSPTById(id);
    res.send({ status: "OK", data: spt });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getSPTByNIM = async (req, res) => {
  try {
    const nim = req.params.nim; // Assuming you extract NIM from the request parameters
    console.log("nim di controler: ", nim);
    const spts = await sptService.getSPTByNIM(nim);
    res.send({ status: "OK", data: spts });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const submitSPT = async (req, res) => {
  try {
    const dataSPT = req.body;
    const spt = await sptService.createSPT(dataSPT);
    res.status(201).send({ status: "Form SPT has been submitted", data: spt });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const patchStatusByFak = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.query.status;
    const updatedSPT = await sptService.approvalByFak(id, status);

    res.send({ status: "OK", data: updatedSPT });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const listApprovedSPTbyFak = async (req, res) => {
  try {
    const approvedSPT = await sptService.sptApprovedbyFak();
    res.send({ status: "OK", data: approvedSPT });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const patchStatusByReg = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.query.status;
    const updatedSPT = await sptService.approvalByReg(id, status);

    res.send({ status: "OK", data: updatedSPT });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const listApprovedSPTbyReg = async (req, res) => {
  try {
    const approvedSPT = await sptService.sptApprovedbyReg();
    res.send({ status: "OK", data: approvedSPT });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const sortSPTby = async (req, res) => {
  const filter = {
    graduate_plan: req.query.graduate_plan,
    approval_fac: req.query.approval_fac,
    approval_reg: req.query.approval_reg,
  };

  try {
    const sortedSPT = await sptService.sortSPT(filter);
    res.send({ status: "OK", data: sortedSPT });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getListSPT,
  getSPTById,
  getSPTByNIM,
  submitSPT,
  patchStatusByFak,
  listApprovedSPTbyFak,
  patchStatusByReg,
  listApprovedSPTbyReg,
  sortSPTby,
};
