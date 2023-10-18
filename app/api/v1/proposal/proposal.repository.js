//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// @description     Create empty proposal
// @used            Submission
const insertProposal = async (submission) => {
  const {
    proposed_advisor_id,
    proposed_co_advisor1_id,
    proposed_co_advisor2_id,
    classroom_id,
  } = submission;
  const proposal = await prisma.proposal.create({
    data: {
      advisor_id: proposed_advisor_id,
      co_advisor1_id: proposed_co_advisor1_id,
      co_advisor2_id: proposed_co_advisor2_id,
      classroom_id,
    },
  });
  return proposal;
}


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

// hapus/update 1 proposal
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

// hapus/update 1 proposal
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

// hapus/update 1 proposal
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

// get list schedule
const findProposalSchedule = async () => {
  // Mencari proposal yang tidak memiliki is_pass berisi "Pass" atau "Fail"
  const proposals = await prisma.proposal.findMany({
    where: {
      OR: [
        {
          is_pass: null,
        },
        {
          is_pass: "Repeat",
        },
      ],
    },
    select: {
      id: true,
      advisor: true,
      panelist_chairman: true,
      panelist_member: true,
      start_defence: true,
      end_defence: true,
      defence_room: true,
      defence_date: true,
    },
  });

  // Mengambil daftar proposalIds
  const proposalIds = proposals.map((proposal) => proposal.id);

  // Mengambil data grup berdasarkan proposalIds
  const groups = await findManyGroupsByProposalIds(proposalIds);

  // Menggabungkan data proposal dengan data grup
  const result = proposals.map((proposal) => {
    const group = groups.find((group) => group.proposal_id === proposal.id);
    if (group) {
      return {
        group_id: group.id,
        proposal_id: proposal.id,
        title: group.title,
        advisor: proposal.advisor,
        panelist_chairman: proposal.panelist_chairman,
        panelist_member: proposal.panelist_member,
        start_defence: proposal.start_defence,
        end_defence: proposal.end_defence,
        defence_room: proposal.defence_room,
        defence_date: proposal.defence_date,
      };
    }
    return null;
  });

  // Filter null values (jika ada proposal tanpa grup)
  const filteredResult = result.filter((item) => item !== null);

  return filteredResult;
};

// Mencari grup berdasarkan proposalIds
const findManyGroupsByProposalIds = async (proposalIds) => {
  const groups = await prisma.group.findMany({
    where: {
      proposal_id: {
        in: proposalIds,
      },
    },
    select: {
      id: true,
      proposal_id: true,
      title: true,
    },
  });
  return groups;
};

// create/update jadwal
const updateProposalScheduleById = async (id, payload) => {
  const {
    panelist_chairman,
    panelist_member,
    start_defence,
    end_defence,
    defence_room,
    defence_date
  } = payload;
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      panelist_chairman,
      panelist_member,
      start_defence,
      end_defence,
      defence_room,
      defence_date,
      report_date: defence_date,
    },
    select: {
      id: true,
      panelist_chairman: true,
      panelist_member: true,
      start_defence: true,
      end_defence: true,
      defence_room: true,
      defence_date: true
    }
  });
  return proposal;
};

// get 1 jadwal proposal
const findProposalScheduleById = async (id) => {
  const proposal = await prisma.proposal.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      panelist_chairman: true,
      panelist_member: true,
      advisor: true,
      start_defence: true,
      end_defence: true,
      defence_room: true,
      defence_date: true
    }
  });

  const group = await findGroupById(id);
  group_id = group.id;
  const group_Student = await findGroupStudentById(group_id);
  const scheduleData = {
    id: proposal.id, 
    title: group.title,
    students: group_Student.map(student => student.student_id),
    panelist_chairman: proposal.panelist_chairman,
    panelist_member: proposal.panelist_member,
    advisor: proposal.advisor,
    start_defence: proposal.start_defence,
    end_defence: proposal.end_defence,
    defence_room: proposal.defence_room,
    defence_date: proposal.defence_date,
  };
  return scheduleData;
};

const findGroupById =  async (proposal_id) => {
  const group = await prisma.group.findUnique({
    where: {
      proposal_id,
    },
  });
  return group;
}

const findGroupStudentById =  async (group_id) => {
  const group_Student = await prisma.group_Student.findMany({
    where: {
      group_id,
    },
  });
  return group_Student;
}

// create/update jadwal
const openAccessProposalReportById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_report_open: true,
    },
    select: {
      id: true,
      is_report_open: true,
    }
  });
  return proposal;
};

// get siapa saja yang sudah mengisi berita acara
const findProposalReportById =  async (id) => {
  const proposal = await prisma.proposal.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      is_report_approve_by_dekan: true,
      is_report_approve_by_panelist_chairman: true,
      is_report_approve_by_panelist_member: true,
      is_report_approve_by_advisor: true
    }
  });
  return proposal;
}

// create/update report
const signProposalReportById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_report_approve_by_dekan: true,
      is_report_approve_by_panelist_chairman: true,
      is_report_approve_by_panelist_member: true,
      is_report_approve_by_advisor: true
    },
    select: {
      id: true,
      is_report_approve_by_dekan: true,
      is_report_approve_by_panelist_chairman: true,
      is_report_approve_by_panelist_member: true,
      is_report_approve_by_advisor: true
    }
  });
  return proposal;
};

// create/update kesimpulan report
const updateProposalConclusionById = async (id, payload) => {
  const {
    exam_conclution,
    changes_conclusion,
    assessment_conclution,
    is_pass,
  } = payload;
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      exam_conclution,
      changes_conclusion,
      assessment_conclution,
      is_pass,
    },
    select: {
      id: true,
      exam_conclution: true,
      changes_conclusion: true,
      assessment_conclution: true,
      is_pass: true,
      report_date: true
    }
  });
  return proposal;
};

// get kesimpulan report
const findProposalConclusionById =  async (id) => {
  const proposal = await prisma.proposal.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      exam_conclution,
      changes_conclusion,
      assessment_conclution,
      is_pass,
      report_date
    }
  });
  return proposal;
}

// upload/update dokumen revisi
const updateProposalRevisionDocumentById = async (id, payload) => {
  const {
    file_name_revision,
    file_size_revision,
  } = payload;
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      file_name_revision,
      upload_date_revision: new Date(),
      file_size_revision,
      is_revision_approve_by_panelist_chairman: "Waiting",
      is_revision_approve_by_panelist_member: "Waiting",
      is_revision_approve_by_advisor: "Waiting",
    },
    select: {
      id: true,
      file_name_revision: true,
      upload_date_revision: true,
      file_size_revision: true,
      is_revision_approve_by_panelist_chairman: true,
      is_revision_approve_by_panelist_member: true,
      is_revision_approve_by_advisor: true,
    }
  });
  return proposal;
};

// get dokumen revisi
const findProposalRevisionDocumentById =  async (id) => {
  const proposal = await prisma.proposal.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      file_name_revision: true,
      upload_date_revision: true,
      file_size_revision: true,
      is_revision_approve_by_panelist_chairman: true,
      is_revision_approve_by_panelist_member: true,
      is_revision_approve_by_advisor: true,
    }
  });
  return proposal;
}

// hapus/update 1 revisi
const deleteProposalRevisionDocumentById = async (id) => {
  await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      file_name_revision: null,
      upload_date_revision: null,
      file_size_revision: null,
      is_revision_approve_by_panelist_chairman: null,
      is_revision_approve_by_panelist_member: null,
      is_revision_approve_by_advisor: null,
    },
    select: {
      id: true,
      file_name_revision: true,
      upload_date_revision: true,
      file_size_revision: true,
      is_revision_approve_by_panelist_chairman: true,
      is_revision_approve_by_panelist_member: true,
      is_revision_approve_by_advisor: true,
    }
  });
};

// approve dokumen revisi
const approveProposalRevisionDocumentById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_panelist_chairman: "Approve",
      is_revision_approve_by_panelist_member: "Approve",
      is_revision_approve_by_advisor: "Approve",
    },
    select: {
      id: true,
      is_revision_approve_by_panelist_chairman: true,
      is_revision_approve_by_panelist_member: true,
      is_revision_approve_by_advisor: true,
    }
  });

  if (
    proposal.is_revision_approve_by_panelist_chairman === "Approve" &&
    proposal.is_revision_approve_by_panelist_member === "Approve" &&
    proposal.is_revision_approve_by_advisor === "Approve"
  ) {
    await updateProgressById(id);
  }

  return proposal;
};

// ++ update progress
const updateProgressById = async (proposal_id) => {
  const proposal = await prisma.group.update({
    where: {
      proposal_id,
    },
    data: {
      progress: "Skripsi"
    },
    select: {
      id: true,
      progress: true
    }
  });

  return proposal;
}

// approve dokumen revisi
const rejectProposalRevisionDocumentById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_panelist_chairman: "Rejected",
      is_revision_approve_by_panelist_member: "Rejected",
      is_revision_approve_by_advisor: "Rejected",
    },
    select: {
      id: true,
      is_revision_approve_by_panelist_chairman: true,
      is_revision_approve_by_panelist_member: true,
      is_revision_approve_by_advisor: true,
    }
  });
  return proposal;
};

module.exports = {
  insertProposal,

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

  findProposalSchedule,
  updateProposalScheduleById,
  findProposalScheduleById,

  openAccessProposalReportById,
  findProposalReportById,
  signProposalReportById,
  updateProposalConclusionById,
  findProposalConclusionById,

  updateProposalRevisionDocumentById,
  findProposalRevisionDocumentById,
  deleteProposalRevisionDocumentById,
  approveProposalRevisionDocumentById,
  rejectProposalRevisionDocumentById,

}