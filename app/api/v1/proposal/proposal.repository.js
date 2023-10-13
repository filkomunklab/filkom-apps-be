//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// get 1 Proposal
const findProposalById = async (id) => {
    const proposal = await prisma.proposal.findUnique({
      where: {
        id,
      },
    });
    return proposal;
};

// upload/update dokumen proposal
const updateProposalDocumentById = async (id, payload) => {
    const {
      file_name_proposal,
      file_size_proposal,
    } = payload;
    const proposal = await prisma.proposal.update({
      where: {
        id,
      },
      data: {
        file_name_proposal,
        upload_date_proposal: new Date(),
        file_size_proposal,
        is_proposal_approve_by_advisor: "Waiting",
        is_proposal_approve_by_co_advisor1: "Waiting",
        is_proposal_approve_by_co_advisor2: "Waiting",
      },
      select: {
        id: true,
        file_name_proposal: true,
        upload_date_proposal: true,
        file_size_proposal: true,
        is_proposal_approve_by_advisor: true,
        is_proposal_approve_by_co_advisor1: true,
        is_proposal_approve_by_co_advisor2: true,
      }
    });
    return proposal;
};

// get 1 dokumen proposal
const findProposalDocumentById = async (id) => {
    const proposal = await prisma.proposal.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        file_name_proposal: true,
        upload_date_proposal: true,
        file_size_proposal: true,
        is_proposal_approve_by_advisor: true,
        is_proposal_approve_by_co_advisor1: true,
        is_proposal_approve_by_co_advisor2: true,
      }
    });
    return proposal;
};

// hapus/update 1 submission
const deleteProposalDocumentById = async (id) => {
    await prisma.proposal.update({
      where: {
        id,
      },
      data: {
        file_name_proposal: null,
        upload_date_proposal: null,
        file_size_proposal: null,
        is_proposal_approve_by_advisor: null,
        is_proposal_approve_by_co_advisor1: null,
        is_proposal_approve_by_co_advisor2: null,
      },
      select: {
        id: true,
        file_name_proposal: true,
        upload_date_proposal: true,
        file_size_proposal: true,
        is_proposal_approve_by_advisor: true,
        is_proposal_approve_by_co_advisor1: true,
        is_proposal_approve_by_co_advisor2: true,
      }
    });
};

// approve dokumen proposal
const approveProposalDocumentById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_advisor: "Approve",
      is_proposal_approve_by_co_advisor1: "Approve",
      is_proposal_approve_by_co_advisor2: "Approve",
    },
    select: {
      id: true,
      is_proposal_approve_by_advisor: true,
      is_proposal_approve_by_co_advisor1: true,
      is_proposal_approve_by_co_advisor2: true,
    }
  });
  return proposal;
};

// approve dokumen proposal
const rejectProposalDocumentById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_advisor: "Rejected",
      is_proposal_approve_by_co_advisor1: "Rejected",
      is_proposal_approve_by_co_advisor2: "Rejected",
    },
    select: {
      id: true,
      is_proposal_approve_by_advisor: true,
      is_proposal_approve_by_co_advisor1: true,
      is_proposal_approve_by_co_advisor2: true,
    }
  });
  return proposal;
};

// upload/update pembayaran proposal
const updateProposalPaymentById = async (id, payload) => {
    const {
        file_name_payment,
        file_size_payment,
    } = payload;
    const proposal = await prisma.proposal.update({
      where: {
        id,
      },
      data: {
        file_name_payment,
        upload_date_payment: new Date(),
        file_size_payment
      },
      select: {
        id: true,
        file_name_payment: true,
        upload_date_payment: true,
        file_size_payment: true
      }
    });
    return proposal;
};

// get 1 pembayaran proposal
const findProposalPaymentById = async (id) => {
    const proposal = await prisma.proposal.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        file_name_payment: true,
        upload_date_payment: true,
        file_size_payment: true
      }
    });
    return proposal;
};

// hapus/update 1 submission
const deleteProposalPaymentById = async (id) => {
  await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      file_name_payment: null,
      upload_date_payment: null,
      file_size_payment: null
    },
    select: {
      id: true,
      file_name_payment: true,
      upload_date_payment: true,
      file_size_payment: true
    }
  });
};

// upload/update pembayaran proposal
const updateProposalPlagiarismById = async (id, payload) => {
    const {
        file_name_plagiarismcheck,
        file_size_plagiarismcheck,
    } = payload;
    const proposal = await prisma.proposal.update({
      where: {
        id,
      },
      data: {
        file_name_plagiarismcheck,
        upload_date_plagiarismcheck: new Date(),
        file_size_plagiarismcheck
      },
      select: {
        id: true,
        file_name_plagiarismcheck: true,
        upload_date_plagiarismcheck: true,
        file_size_plagiarismcheck: true
      }
    });
    return proposal;
};

// get 1 pembayaran proposal
const findProposalPlagiarismById = async (id) => {
    const proposal = await prisma.proposal.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        file_name_plagiarismcheck: true,
        upload_date_plagiarismcheck: true,
        file_size_plagiarismcheck: true
      }
    });
    return proposal;
};

// hapus/update 1 submission
const deleteProposalPlagiarismById = async (id) => {
  await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      file_name_plagiarismcheck: null,
      upload_date_plagiarismcheck: null,
      file_size_plagiarismcheck: null
    },
    select: {
      id: true,
      file_name_plagiarismcheck: true,
      upload_date_plagiarismcheck: true,
      file_size_plagiarismcheck: true
    }
  });
};

module.exports = {
  findProposalById,
  updateProposalDocumentById,
  deleteProposalDocumentById,
  approveProposalDocumentById,
  rejectProposalDocumentById,
  findProposalDocumentById,
  updateProposalPaymentById,
  findProposalPaymentById,
  deleteProposalPaymentById,
  updateProposalPlagiarismById,
  findProposalPlagiarismById,
  deleteProposalPlagiarismById,

}