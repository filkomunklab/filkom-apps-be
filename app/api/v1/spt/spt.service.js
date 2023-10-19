const sptRepository = require("./spt.repository");

const getListSPT = async () => {
  return await sptRepository.listSPT();
}

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

const createSPT = async (dataSPT) => {
    return await sptRepository.insertSPT(dataSPT);
}

const approvalByFak = async (id, status) => {
  return sptRepository.patchapprovalByFak(id, status);
};

const sptApprovedbyFak= async () => {
  return sptRepository.listApprovalSPTbyFak();
  };

module.exports = {
    createSPT,
    getListSPT,
    getSPTById,
    approvalByFak,
    sptApprovedbyFak
}
