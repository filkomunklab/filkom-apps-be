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
// @description     Get classroom proposal list
// @route           GET /group/classroom_list
// @access          MAHASISWA
const getClassroomList = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "classroom_list")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getClassroomList(userId);
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
    const userId = req.user.user.id;
    const group = await groupService.getStudentListByClassroomId(id, userId);
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
// @description     Get thesis history by id
// @route           GET /group/thesis_history/:id
// @access          All
const getAllThesisHistoryById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "thesis_history")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const group = await groupService.getAllThesisHistoryById(id);
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

//===================================================================
// @description     Get proposal list advisor
// @route           GET /group/proposal-list-advisor
// @access          DOSEN
const getProposalListAdvisor = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_list_advisor")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getProposalListAdvisor(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get skripsi list advisor
// @route           GET /group/skripsi-list-advisor
// @access          DOSEN
const getSkripsiListAdvisor = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "skripsi_list_advisor")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getSkripsiListAdvisor(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get history list advisor
// @route           GET /group/history-list-advisor
// @access          DOSEN
const getHistoryListAdvisor = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "history_list_advisor")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getHistoryListAdvisor(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get proposal list co-advisor
// @route           GET /group/proposal-list-co-advisor
// @access          DOSEN
const getProposalListCoAdvisor = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_list_co_advisor")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getProposalListCoAdvisor(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get skripsi list co-advisor
// @route           GET /group/skripsi-list-co-advisor
// @access          DOSEN
const getSkripsiListCoAdvisor = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "skripsi_list_co_advisor")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getSkripsiListCoAdvisor(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get history list co-advisor
// @route           GET /group/history-list-co-advisor
// @access          DOSEN
const getHistoryListCoAdvisor = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "history_list_co_advisor")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getHistoryListCoAdvisor(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get proposal list chairman
// @route           GET /group/proposal-list-chairman
// @access          DOSEN
const getProposalListChairman = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_list_chairman")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getProposalListChairman(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get skripsi list chairman
// @route           GET /group/skripsi-list-chairman
// @access          DOSEN
const getSkripsiListChairman = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "skripsi_list_chairman")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getSkripsiListChairman(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get history list chairman
// @route           GET /group/history-list-chairman
// @access          DOSEN
const getHistoryListChairman = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "history_list_chairman")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getHistoryListChairman(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get proposal list member
// @route           GET /group/proposal-list-member
// @access          DOSEN
const getProposalListMember = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_list_member")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getProposalListMember(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get skripsi list member
// @route           GET /group/skripsi-list-member
// @access          DOSEN
const getSkripsiListMember = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "skripsi_list_member")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getSkripsiListMember(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get history list member
// @route           GET /group/history-list-member
// @access          DOSEN
const getHistoryListMember = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "history_list_member")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getHistoryListMember(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get proposal list mk
// @route           GET /group/proposal-list-mk
// @access          DOSEN_MK
const getProposalListMK = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_list_mk")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getProposalListMK(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get skripsi list mk
// @route           GET /group/skripsi-list-mk
// @access          DOSEN_MK
const getSkripsiListMK = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "skripsi_list_mk")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const group = await groupService.getSkripsiListMK(userId);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get proposal list kaprodi IF/SI
// @route           GET /group/proposal-list-kaprodi
// @access          KAPRODI
const getProposalListKaprodi = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_list_kaprodi")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const userRole = req.user.user.role;
    const group = await groupService.getProposalListKaprodi(userId, userRole);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get skripsi list kaprodi IF/SI
// @route           GET /group/skripsi-list-kaprodi
// @access          KAPRODI
const getSkripsiListKaprodi = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "skripsi_list_kaprodi")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const userRole = req.user.user.role;
    const group = await groupService.getSkripsiListKaprodi(userId, userRole);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get history list kaprodi IF/SI
// @route           GET /group/history-list-kaprodi
// @access          DOSEN
const getHistoryListKaprodi = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "history_list_kaprodi")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const userRole = req.user.user.role;
    const group = await groupService.getHistoryListKaprodi(userId, userRole);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get proposal list dekan
// @route           GET /group/proposal-list-dekan
// @access          DEKAN
const getProposalListDekan = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_list_dekan")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const userRole = req.user.user.role;
    const group = await groupService.getProposalListDekan(userId, userRole);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get skripsi list dekan
// @route           GET /group/skripsi-list-dekan
// @access          DEKAN
const getSkripsiListDekan = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "skripsi_list_dekan")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const userRole = req.user.user.role;
    const group = await groupService.getSkripsiListDekan(userId, userRole);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get history list dekan
// @route           GET /group/history-list-dekan
// @access          DOSEN
const getHistoryListDekan = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "history_list_dekan")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const userRole = req.user.user.role;
    const group = await groupService.getHistoryListDekan(userId, userRole);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get proposal list operator fakultas/filkom
// @route           GET /group/proposal-list-sekretaris
// @access          OPERATOR_FAKULTAS
const getProposalListSekretaris = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_list_sekretaris")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const group = await groupService.getProposalListSekretaris();
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get skripsi list operator fakultas/filkom
// @route           GET /group/skripsi-list-sekretaris
// @access          OPERATOR_FAKULTAS
const getSkripsiListSekretaris = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "skripsi_list_sekretaris")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const group = await groupService.getSkripsiListSekretaris();
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Put metadata
// @route           PUT /group/metadata/:id
// @access          MAHASISWA
const updateMetadataById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "metadata")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const payload = req.body;
    if (!(payload.keywords && payload.abstrak && payload.reference)) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const group = await groupService.updateMetadataById(id, payload);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get metadata
// @route           GET /group/metadata/:id
// @access          MAHASISWA
const getMetadataById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "metadata")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const group = await groupService.getMetadataById(id);
    res.send({ status: "OK", data: group });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getThesisList,
  getSubmissionDetailsById,
  getClassroomList,
  getStudentListByClassroomId,
  getDosenList,
  getAdvisorTeamById,
  getAllThesisHistoryById,
  getCommitteeList,
  getSubmissionListMK,
  getSubmissionListKaprodi,
  getSubmissionListDekan,
  getProposalListAdvisor,
  getProposalListCoAdvisor,
  getProposalListChairman,
  getProposalListMember,
  getProposalListMK,
  getProposalListKaprodi,
  getProposalListDekan,
  getProposalListSekretaris,
  // getGroupStudentById,
  // updateMetadataById,
  // getMetadataById,
  getSkripsiListCoAdvisor,
  getSkripsiListAdvisor,
  getSkripsiListChairman,
  getSkripsiListMember,
  getSkripsiListMK,
  getSkripsiListKaprodi,
  getSkripsiListDekan,
  getSkripsiListSekretaris,
  getHistoryListAdvisor,
  getHistoryListCoAdvisor,
  getHistoryListChairman,
  getHistoryListMember,
  getHistoryListKaprodi,
  getHistoryListDekan,

  updateMetadataById,
  getMetadataById,
};
