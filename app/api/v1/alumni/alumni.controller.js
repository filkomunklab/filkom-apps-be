const alumniService = require("./alumni.service");

//daftar alumni
const getAlumniList = async (req, res) => {
  try {
    const alumniList = await alumniService.getAlumniList();
    res.send({ status: "OK", data: alumniList });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//daftar alumni --> operator get
const alumniStatusTS = async (req, res) => {
  try {
    const alumniOP = await alumniService.alumniTS();
    res.send({ status: "OK", data: alumniOP });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//fillterBy
const filterAlumniBy = async (req, res) => {
  const filter = {
    major: req.query.major,
    graduate_year: req.query.graduate_year,
    filteredAlumni: req.query.filteredAlumni,
  };

  try {
    const filterAlumni = await alumniService.filterAlumni(filter);
    res.send({ status: "OK", data: filterAlumni });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//send email
const sendBroadcastEmail = async (req, res) => {
  try {
    const broadcastEmail = await alumniService.sendEmail();
    res.send({ status: "OK", message: "broadcast email sent successfully" });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// ======================================================== JERICO
const getAlumniHasTracerStudyByOperator = async (req, res) => {
  try {
    const search_query = req.query.search_query || "";
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const filterBy = req.query.filterBy || "none";
    const filterValue = req.query.filterValue;

    const alumniList = await alumniService.getAlumniHasTracerStudyByOperator(search_query, page, limit, filterBy, filterValue);

    res.send({
      status: "OK",
      data: alumniList.alumni,
      page: alumniList.totalRows > 0 ? page + 1 : 0,
      limit,
      totalRows: alumniList.totalRows ? alumniList.totalRows : 0,
      totalPage: alumniList.totalPage ? alumniList.totalPage : 0,
    });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllAlumni = async (req, res) => {
  try {
    const search_query = req.query.search_query || "";
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const filterBy = req.query.filterBy || "none";
    const filterValue = req.query.filterValue;

    const alumniList = await alumniService.getAllAlumni(search_query, page, limit, filterBy, filterValue);

    res.send({
      status: "OK",
      data: alumniList.alumni,
      page: alumniList.totalRows > 0 ? page + 1 : 0,
      limit,
      totalRows: alumniList.totalRows ? alumniList.totalRows : 0,
      totalPage: alumniList.totalPage ? alumniList.totalPage : 0,
    });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAlumniList,
  filterAlumniBy,
  alumniStatusTS,
  sendBroadcastEmail,
  getAlumniHasTracerStudyByOperator,
  getAllAlumni,
};
