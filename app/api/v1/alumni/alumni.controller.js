const alumniService = require("./alumni.service");

//daftar alumni
const getAlumniList = async (req, res) => {
  try {
    const alumniList = await alumniService.getAlumniList();
    res.send({ status: "OK", data: alumniList });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//daftar alumni --> operator get
const alumniStatusTS = async (req, res) => {
  try {
    const alumniOP = await alumniService.alumniTS();
    res.send({ status: "OK", data: alumniOP });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
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
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//send email
const sendBroadcastEmail = async (req, res) => {
  try {
    const broadcastEmail = await alumniService.sendEmail();
    res.send({ status: "OK", message: "broadcast email sent successfully" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAlumniList,
  filterAlumniBy,
  alumniStatusTS,
  sendBroadcastEmail,
};
