//Layer untuk handle business logic

const consultationRepository = require("./consultation.repository");
const groupRepository = require("../group/group.repository");
const proposalRepository = require("../proposal/proposal.repository");

//===================================================================
// @description     Create consultation
// @route           POST /consultation
// @access          DOSEN
const createConsultation = async (userId, payload) => {
  // check group
  const group = await groupRepository.findGroupById(payload.group_id);
  if (!group) {
    throw {
      status: 400,
      message: `Group not found`,
    };
  }
  // check proposal
  const proposal = await proposalRepository.findProposalById(group.proposal_id);
  if (
    userId === proposal.advisor_id ||
    userId === proposal.co_advisor1_id ||
    userId === proposal.co_advisor2_id
  ) {
    const consultation = await consultationRepository.insertConsultation(
      payload,
      userId
    );
    return consultation;
  }
  if (
    !userId === proposal.advisor_id &&
    !userId === proposal.co_advisor1_id &&
    !userId === proposal.co_advisor2_id
  ) {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }
};

//===================================================================
// @description     Get all consultation by group id
// @route           GET /consultation/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getAllConsultationByGroupId = async (id) => {
  const consultation = await employeeRepository.findAllConsultationByGroupId(
    id
  );
  if (!consultation) {
    throw {
      status: 400,
      message: `Consultation not found`,
    };
  }
  return consultation;
};

module.exports = {
  createConsultation,
  getAllConsultationByGroupId,
};
