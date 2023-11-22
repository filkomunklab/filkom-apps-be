const alumniService = require("./alumni.service");
const { policyFor } = require("../policy");

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
  const policy = policyFor(req.user);
  if (!policy.can("read", "alumni_list")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  const search_query = req.query.search_query || "";
  try {
    const alumniOP = await alumniService.alumniTS(search_query);
    res.send({ status: "OK", data: alumniOP });
  } catch (error) {
    console.log(error);
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
  const policy = policyFor(req.user);
  if (!policy.can("broadcastEmail", "alumni_list")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const recipientEmails = req.body.recipientEmails;
    await alumniService.sendEmail(recipientEmails);
    res.send({ status: "OK", message: "broadcast email sent successfully" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
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

    const alumniList = await alumniService.getAlumniHasTracerStudyByOperator(
      search_query,
      page,
      limit,
      filterBy,
      filterValue
    );

    res.send({
      status: "OK",
      data: alumniList.alumni,
      page: alumniList.totalRows > 0 ? page + 1 : 0,
      limit,
      totalRows: alumniList.totalRows ? alumniList.totalRows : 0,
      totalPage: alumniList.totalPage ? alumniList.totalPage : 0,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllAlumni = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "alumni_list")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const search_query = req.query.search_query || "";
    // const page = parseInt(req.query.page) - 1 || 0;
    // const limit = parseInt(req.query.limit) || 10;
    // const filterBy = req.query.filterBy || "none";
    // const filterValue = req.query.filterValue;

    const alumniList = await alumniService.getAllAlumni(search_query);

    res.send({
      status: "OK",
      data: alumniList.alumni,
      // page: alumniList.totalRows > 0 ? page + 1 : 0,
      // limit,
      // totalRows: alumniList.totalRows ? alumniList.totalRows : 0,
      // totalPage: alumniList.totalPage ? alumniList.totalPage : 0,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const broadcastWAChat = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("broadcastWa", "alumni_list")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const { phoneNums } = req.body;
    const pesan = `Halo Alumnus UNKLAB!. Perkenalkan, Kami dari Surveyor Universitas Klabat (UNKLAB), ingin mengirimkan kuesioner untuk pelaksanaan Tracer Study Tahun 2023, dalam hal pemeringkatan kampus kami.
    Jika berkenan dan kalau ada waktu kosong, kiranya dapat membantu kami untuk mengisi kuesioner yang akan kami kirimkan, paling lambat sebelum tanggal 14 September 2023. 
    
    Untuk pengisian kuesioner dapat mengakses link website Unklab dibawah ini:
    https://development-filkom-apps-fe.vercel.app/
    
    Salam hangat,😊🙏
    Tim Tracer Study
    Alumni Universitas Klabat
    Tahun 2023   `;

    if (!pesan || !phoneNums) {
      return res.status(400).json({ status: "error", pesan: "Bad request" });
    }

    const results = await alumniService.sendBroadcastWA(pesan, phoneNums);
    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", pesan: "error server" });
  }
};

module.exports = {
  getAlumniList,
  filterAlumniBy,
  alumniStatusTS,
  sendBroadcastEmail,
  broadcastWAChat,
  getAlumniHasTracerStudyByOperator,
  getAllAlumni,
};
