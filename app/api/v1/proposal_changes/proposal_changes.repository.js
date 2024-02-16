//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

//===================================================================
// @description     Create proposal assessment
// @route           POST /proposal-assessment
// @access          DOSEN
const insertProposalChanges = async (userId, payload) => {
  const { proposal_id, changes } = payload;
  const proposalChanges = await prisma.proposal_Changes.create({
    data: {
      proposal_id,
      dosen_id: userId,
      changes,
    },
  });

  return proposalChanges;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get proposal_changes by proposal_id, & dosen_id
// @used            createProposalChanges, Proposal
const findProposalChangesByProposalIdAndDosenId = async (
  proposal_id,
  dosen_id
) => {
  const proposalChanges = await prisma.proposal_Changes.findFirst({
    where: {
      proposal_id,
      dosen_id,
    },
  });
  return proposalChanges;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get all proposal_changes by proposal_id
// @used            Proposal
const findAllProposalChangesByProposalId = async (proposal_id) => {
  const proposalChanges = await prisma.proposal_Changes.findMany({
    where: {
      proposal_id,
    },
  });
  return proposalChanges;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Create empty change for group by panelist team
// @used            Proposal
const insertEmptyProposalChanges = async (proposal_id, dosen_id) => {
  const proposalChanges = await prisma.proposal_Changes.create({
    data: {
      proposal_id,
      dosen_id,
    },
  });

  return proposalChanges;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Update proposal change by id
// @used            Proposal
const updateProposalChangeById = async (id, payload) => {
  const { judul, bab1, bab2, bab3, other } = payload;
  const proposalChanges = await prisma.proposal_Changes.update({
    where: {
      id,
    },
    data: {
      judul,
      bab1,
      bab2,
      bab3,
      other,
    },
  });

  return proposalChanges;
};

module.exports = {
  insertProposalChanges,
  findProposalChangesByProposalIdAndDosenId,
  findAllProposalChangesByProposalId,
  insertEmptyProposalChanges,
  updateProposalChangeById,
};
