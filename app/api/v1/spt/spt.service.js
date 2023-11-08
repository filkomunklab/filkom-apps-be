const { query } = require("express");
const sptRepository = require("./spt.repository");

const getListSPT = async (search_query) => {
  try {
    const calonTamatan = await sptRepository.findCalonTamatanList(search_query);
    return calonTamatan;
  } catch (error) {
    console.log(error.message);
  }
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
  const storageRef = ref(
    storage,
    `certificate/${dataSPT.nim}/${dataSPT.certificateFile.filename}`
  );
  const metadata = { contentType: "application/pdf" };
  try {
    const binaryString = atob(dataSPT.certificateFile.buffer);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    await uploadBytes(storageRef, byteArray, metadata);
    const path = await getDownloadURL(storageRef);
    await sptRepository.insertSPT(dataSPT, path);
  } catch (error) {
    throw error;
  }
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

const filterSPT = async (filter) => {
  return await sptRepository.filterSPT(filter);
};

//checkFormSPT

const checkFormSPT = async (studentId) => {
  try {
    return await sptRepository.checkFormSPT(studentId);
  } catch (error) {
    throw error; // Re-throw the error
  }
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
  filterSPT,
  checkFormSPT,
};
