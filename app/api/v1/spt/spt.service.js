const { query } = require("express");
const sptRepository = require("./spt.repository");

const getListSPT = async (search_query, page, limit, filterBy, filterValue) => {
  try {
    console.log("ini filter by: ", filterValue);
    console.log("ini filter value: ", filterValue);
    const offset = limit * page;

    // filter by none
    if (filterBy === "none") {
      const totalRows = await sptRepository.countTotalRowsCalonTamatanBySearch(search_query);
      const totalPage = Math.ceil(totalRows / limit);
      const calonTamatan = await sptRepository.findCalonTamatanListPagination(search_query, page, limit, offset);
      return { calonTamatan, totalRows, totalPage };
    }
    // filter by status by faculty
    else if (filterBy === "status-by-faculty") {
      const totalRows = await sptRepository.countTotalRowsCalonTamatanBySearchFilterStatusByFaculty(search_query, filterBy, filterValue);
      const totalPage = Math.ceil(totalRows / limit);
      const calonTamatan = await sptRepository.findCalonTamatanListPaginationFilterStatusByFaculty(search_query, page, limit, offset, filterBy, filterValue);
      return { calonTamatan, totalRows, totalPage };
    }
    // filter by status by registar
    else if (filterBy === "status-by-registar") {
      const totalRows = await sptRepository.countTotalRowsCalonTamatanBySearchFilterStatusByRegistar(search_query, filterBy, filterValue);
      const totalPage = Math.ceil(totalRows / limit);
      const calonTamatan = await sptRepository.findCalonTamatanListPaginationFilterStatusByRegistar(search_query, page, limit, offset, filterBy, filterValue);
      return { calonTamatan, totalRows, totalPage };
    }
    // filter by rencana tamat
    else if (filterBy === "rencana-tamat") {
      const totalRows = await sptRepository.countTotalRowsCalonTamatanBySearchFilterGraduatePlan(search_query, filterBy, filterValue);
      const totalPage = Math.ceil(totalRows / limit);
      const calonTamatan = await sptRepository.findCalonTamatanListPaginationFilterGraduatePlan(search_query, page, limit, offset, filterBy, filterValue);
      return { calonTamatan, totalRows, totalPage };
    }
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
