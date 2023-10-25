//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const groupService = require("./group.service");
const { policyFor } = require("../policy");

//===================================================================
// @description     Get thesis list
// @route           GET /group_student/thesis_list
// @access          MAHASISWA
const getThesisList = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "thesis_list")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getThesisList(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get details submission by id
// @route           GET /group_student/submission_details/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN
const getSubmissionDetailsById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "submission_details")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const group = await groupService.getSubmissionDetailsById(id);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get student list in the same proposal classroom
// @route           GET /group/classroom/students-list/:id
// @access          MAHASISWA
const getStudentListByClassroomId = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "thesis_student_list")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const group = await groupService.getStudentListByClassroomId(id);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get dosen list
// @route           GET /group/dosen-list
// @access          MAHASISWA
const getDosenList = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "dosen_list")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const group = await groupService.getDosenList();
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get advisor team by id
// @route           GET /group/advisor-group/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getAdvisorTeamById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "advisor_team")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const group = await groupService.getAdvisorTeamById(id);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get committee list
// @route           GET /group/committee-list
// @access          DOSEN
const getCommitteeList = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "committee_list")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const group = await groupService.getCommitteeList();
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get submission list dosen mk
// @route           GET /group/submission-list-mk
// @access          DOSEN_MK
const getSubmissionListMK = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "submission_list_mk")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getSubmissionListMK(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get submission list kaprodi
// @route           GET /group/submission-list-kaprodi
// @access          KAPRODI
const getSubmissionListKaprodi = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "submission_list_kaprodi")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getSubmissionListKaprodi(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get submission list dekan
// @route           GET /group/submission-list-dekan
// @access          DEKAN
const getSubmissionListDekan = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "submission_list_dekan")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getSubmissionListDekan(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// const getGroupStudentById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const group_student = await groupService.getGroupStudentById(id);
//         res.send({ status: "OK", data: group_student });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const updateMetadataById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const payload = req.body;

//         if (
//             !(
//                 payload.keywords  &&
//                 payload.abstrak  &&
//                 payload.reference
//             )
//         ) {
//             return res
//             .status(400)
//             .send({ status: "FAILED", data: { error: "some field is missing" } });
//         }
//         const group = await groupService.updateMetadataById(
//             id,
//             payload
//         );
//         res.send({ status: "OK", data: group });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// const getMetadataById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const group = await groupService.getMetadataById(id);
//         res.send({ status: "OK", data: group });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

module.exports = {
  getThesisList,
  getSubmissionDetailsById,
  getStudentListByClassroomId,
  getDosenList,
  getAdvisorTeamById,
  getCommitteeList,
  getSubmissionList,
  getSubmissionListMK,
  getSubmissionListKaprodi,
  getSubmissionListDekan,
  // getGroupStudentById,
  // updateMetadataById,
  // getMetadataById,
};
