const { query } = require("express");
const sptRepository = require("./spt.repository");

const getListSPT = async () => {
  return await sptRepository.listSPT();
};

const getSPTById = async (id) => {
  const spt = await sptRepository.findSPTById(id);
  if (!spt) {
    throw {
      status: 404,
      message: `Not found`,
    };
  }
  return spt;
};

const getSPTByNIM = async (nim) => {
  const spts = await sptRepository.findSPTByNIM(nim);
  if (!spts || spts.length === 0) {
    throw {
      status: 404,
      message: `No SPTs found for NIM: ${nim}`,
    };
  }
  return spts;
};

const createSPT = async (dataSPT) => {
  return await sptRepository.insertSPT(dataSPT);
};

const approvalByFak = async (id, status) => {
  return sptRepository.patchapprovalByFak(id, status);
};

const sptApprovedbyFak = async () => {
  return sptRepository.listApprovalSPTbyFak();
};

const approvalByReg = async (id, status) => {
  return sptRepository.patchapprovalByReg(id, status);
};

const sptApprovedbyReg = async () => {
  return sptRepository.listApprovalSPTbyReg();
};

const sortSPT = async (filter) => {
  return await sptRepository.sortSPT(filter);
};

module.exports = {
  createSPT,
  getListSPT,
  getSPTById,
  getSPTByNIM,
  approvalByFak,
  sptApprovedbyFak,
  approvalByReg,
  sptApprovedbyReg,
  sortSPT,
};
