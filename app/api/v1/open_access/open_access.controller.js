const accessService = require("./open_access.service");

// const openAccessTodb = async (req, res) => {
//   const payload = req.body;
//   try {
//     const openAccess = await openService.createOpenAccessTodb(payload);
//     res.status(201).send({ status: "OK", data: openAccess });
//   } catch (error) {
//     res
//       .status(error?.status || 500)
//       .send({ status: "FAILED", data: { error: error?.message || error } });
//   }
// };

// const setAccess = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const set_access = req.query;
//     const openAccess = await openService.patchSetOpenAccess(id, set_access);
//     res.send({ status: "OK", data: openAccess });
//   } catch (error) {
//     res
//       .status(error?.status || 500)
//       .send({ status: "FAILED", data: { error: error?.message || error } });
//   }
// };

const openGradeAccess = async (req, res) => {
  const payload = req.body;
  try {
    const openAccess = await accessService.createOpenGradAccess(payload);
    res.status(201).send({ status: "OK", data: openAccess });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const closeGradesAccess = async (req, res) => {
  const { id } = req.params;
  try {
    const openAccess = await accessService.setGradesAccessClose(id);
    res.status(201).send({ status: "OK", data: openAccess });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  //   openAccessTodb,
  //   setAccess,
  openGradeAccess,
  closeGradesAccess,
};
