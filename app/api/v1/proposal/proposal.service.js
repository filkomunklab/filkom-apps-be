//Layer untuk handle business logic

const proposalRepository = require("./proposal.repository");

const getProposalById = async (id) => {
    const proposal = await proposalRepository.findProposalById(id);
    if (!proposal) {
      throw {
        status: 400,
        message: `Not found`,
      };
    }
    return proposal;
}; 

const updateProposalDocumentById = async (id, payload) => {
    await getProposalById(id);

    const proposal = await proposalRepository.updateProposalDocumentById(id, payload);
    return proposal;
};

const getProposalDocumentById = async (id) => {
    const proposal = await proposalRepository.findProposalDocumentById(id);
    if (!proposal) {
      throw {
        status: 400,
        message: `Not found`,
      };
    }
    return proposal;
};

const deleteProposalDocumentById = async (id) => {
    await getProposalById(id);
    await proposalRepository.deleteProposalDocumentById(id);
};

const approveProposalDocumentById = async (id) => {
  await getProposalById(id);

  const proposal = await proposalRepository.approveProposalDocumentById(id);
  return proposal;
};

const rejectProposalDocumentById = async (id) => {
  await getProposalById(id);

  const proposal = await proposalRepository.rejectProposalDocumentById(id);
  return proposal;
};

const updateProposalPaymentById = async (id, payload) => {
    await getProposalById(id);

    const proposal = await proposalRepository.updateProposalPaymentById(id, payload);
    return proposal;
};

const getProposalPaymentById = async (id) => {
    const proposal = await proposalRepository.findProposalPaymentById(id);
    if (!proposal) {
      throw {
        status: 400,
        message: `Not found`,
      };
    }
    return proposal;
};

const deleteProposalPaymentById = async (id) => {
  await getProposalById(id);
  await proposalRepository.deleteProposalPaymentById(id);
};

const updateProposalPlagiarismById = async (id, payload) => {
    await getProposalById(id);

    const proposal = await proposalRepository.updateProposalPlagiarismById(id, payload);
    return proposal;
};

const getProposalPlagiarismById = async (id) => {
    const proposal = await proposalRepository.findProposalPlagiarismById(id);
    if (!proposal) {
      throw {
        status: 400,
        message: `Not found`,
      };
    }
    return proposal;
};

const deleteProposalPlagiarismById = async (id) => {
  await getProposalById(id);
  await proposalRepository.deleteProposalPlagiarismById(id);
};

module.exports = {
  getProposalDocumentById,
  updateProposalDocumentById,
  deleteProposalDocumentById,
  approveProposalDocumentById,
  rejectProposalDocumentById,
  updateProposalPaymentById,
  getProposalPaymentById,
  deleteProposalPaymentById,
  updateProposalPlagiarismById,
  getProposalPlagiarismById,
  deleteProposalPlagiarismById,

}