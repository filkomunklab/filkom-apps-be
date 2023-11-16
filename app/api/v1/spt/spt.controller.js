//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const sptService = require("./spt.service");

const getListSPT = async (req, res) => {
  try {
    const search_query = req.query.search_query || "";

    const calonTamatan = await sptService.getListSPT(search_query);
    console.log("ini calon tamatan: ", calonTamatan);
    res.send({
      status: "OK",
      data: calonTamatan,
    });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getSPTById = async (req, res) => {
  try {
    const id = req.params.id;
    const spt = await sptService.getSPTById(id);
    res.send({ status: "OK", data: spt });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getSPTByNIM = async (req, res) => {
  try {
    const nim = req.params.nim; // Assuming you extract NIM from the request parameters
    console.log("nim di controler: ", nim);
    const spts = await sptService.getSPTByNIM(nim);
    res.send({ status: "OK", data: spts });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const submitSPT = async (req, res) => {
  try {
    const dataSPT = req.body;
    const spt = await sptService.createSPT(dataSPT);
    console.log('success')
    res.status(201).send({ status: "Form SPT has been submitted", data: spt });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const patchStatusByFak = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.query.status;
    const updatedSPT = await sptService.approvalByFak(id, status);

    res.send({ status: "OK", data: updatedSPT });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const listApprovedSPTbyFak = async (req, res) => {
  try {
    const approvedSPT = await sptService.sptApprovedbyFak();
    res.send({ status: "OK", data: approvedSPT });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const patchStatusByReg = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.query.status;
    const updatedSPT = await sptService.approvalByReg(id, status);

    res.send({ status: "OK", data: updatedSPT });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const listApprovedSPTbyReg = async (req, res) => {
  try {
    const approvedSPT = await sptService.sptApprovedbyReg();
    res.send({ status: "OK", data: approvedSPT });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const filterSPTBy = async (req, res) => {
  const filter = {
    graduate_plan: req.query.graduate_plan,
    approval_fac: req.query.approval_fac,
    approval_reg: req.query.approval_reg,
  };

  try {
    const filteredSPT = await sptService.filterSPT(filter);
    res.send({ status: "OK", data: filteredSPT });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//cek FORM SPT - ADA TIDAK
const checkAvSPT = async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const status = await sptService.checkFormSPT(studentId);
    res.json({ status });
  } catch (error) {
    console.error("Error checking SPT status:", error.message);
    res.status(404).json({ error: error.message });
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
  filterSPTBy,
  checkAvSPT,
};
