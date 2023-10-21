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
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get proposal by id
// @used            getProposalById
const findProposalById = async (id) => {
  const proposal = await prisma.proposal.findUnique({
    where: {
      id,
    },
  });
  return proposal;
};

//===================================================================
// @description     Upload dokumen proposal
// @route           PUT /proposal/proposal-document/:id
// @access          MAHASISWA
const updateProposalDocumentById = async (id, payload) => {
  const { file_name_proposal, file_size_proposal } = payload;
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
    },
  });
  return proposal;
};

//===================================================================
// @description     Get dokumen proposal
// @route           GET /proposal/proposal-document/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN
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
    },
  });
  return proposal;
};

//===================================================================
// @description     Delete/Update dokumen proposal
// @route           PUT "/proposal/proposal-document/delete/:id
// @access          MAHASISWA
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
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get advisor in proposal by proposal_id & advisor_id
// @used            approveProposalDocumentById
const findAdvisorInProposalByIdAndAdvisorId = async (id, advisor_id) => {
  const proposal = await prisma.proposal.findFirst({
    where: {
      id,
      advisor_id,
    },
  });
  return proposal;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get co-advisor1 in proposal by proposal_id & co_advisor1_id
// @used            approveProposalDocumentById
const findCoAdvisor1InProposalByIdAndAdvisorId = async (id, co_advisor1_id) => {
  const proposal = await prisma.proposal.findFirst({
    where: {
      id,
      co_advisor1_id,
    },
  });
  return proposal;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get co-advisor2 in proposal by proposal_id & co_advisor2_id
// @used            approveProposalDocumentById
const findCoAdvisor2InProposalByIdAndAdvisorId = async (id, co_advisor2_id) => {
  const proposal = await prisma.proposal.findFirst({
    where: {
      id,
      co_advisor2_id,
    },
  });
  return proposal;
};

//=============================(1)======================================
// @description     Approve dokumen proposal
// @route           PUT /proposal/proposal-document/approve/:id
// @access          DOSEN
const approveProposalDocumentByAdvisorById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_advisor: "Approve",
      advisor_proposal_approved_date: new Date(),
    },
    select: {
      id: true,
      is_proposal_approve_by_advisor: true,
      is_proposal_approve_by_co_advisor1: true,
      is_proposal_approve_by_co_advisor2: true,
      advisor_proposal_approved_date: true,
    },
  });
  return proposal;
};

//=============================(2)======================================
// @description     Approve dokumen proposal
// @route           PUT /proposal/proposal-document/approve/:id
// @access          DOSEN
const approveProposalDocumentByCoAdvisor1ById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_co_advisor1: "Approve",
      co_advisor1_proposal_approved_date: new Date(),
    },
    select: {
      id: true,
      is_proposal_approve_by_advisor: true,
      is_proposal_approve_by_co_advisor1: true,
      is_proposal_approve_by_co_advisor2: true,
      co_advisor1_proposal_approved_date: true,
    },
  });
  return proposal;
};

//=============================(3)======================================
// @description     Approve dokumen proposal
// @route           PUT /proposal/proposal-document/approve/:id
// @access          DOSEN
const approveProposalDocumentByCoAdvisor2ById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_co_advisor2: "Approve",
      co_advisor2_proposal_approved_date: new Date(),
    },
    select: {
      id: true,
      is_proposal_approve_by_advisor: true,
      is_proposal_approve_by_co_advisor1: true,
      is_proposal_approve_by_co_advisor2: true,
      co_advisor2_proposal_approved_date: true,
    },
  });
  return proposal;
};

//=============================(1)======================================
// @description     Reject dokumen proposal
// @route           PUT /proposal/proposal-document/reject/:id
// @access          DOSEN
const rejectProposalDocumentByAdvisorById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_advisor: "Rejected",
      advisor_proposal_approved_date: new Date(),
    },
    select: {
      id: true,
      is_proposal_approve_by_advisor: true,
      is_proposal_approve_by_co_advisor1: true,
      is_proposal_approve_by_co_advisor2: true,
      advisor_proposal_approved_date: true,
    },
  });
  return proposal;
};

//=============================(2)======================================
// @description     Reject dokumen proposal
// @route           PUT /proposal/proposal-document/reject/:id
// @access          DOSEN
const rejectProposalDocumentByCoAdvisor1ById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_co_advisor1: "Rejected",
      co_advisor1_proposal_approved_date: new Date(),
    },
    select: {
      id: true,
      is_proposal_approve_by_advisor: true,
      is_proposal_approve_by_co_advisor1: true,
      is_proposal_approve_by_co_advisor2: true,
      co_advisor1_proposal_approved_date: true,
    },
  });
  return proposal;
};

//=============================(3)======================================
// @description     Reject dokumen proposal
// @route           PUT /proposal/proposal-document/reject/:id
// @access          DOSEN
const rejectProposalDocumentByCoAdvisor2ById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_co_advisor2: "Rejected",
      co_advisor2_proposal_approved_date: new Date(),
    },
    select: {
      id: true,
      is_proposal_approve_by_advisor: true,
      is_proposal_approve_by_co_advisor1: true,
      is_proposal_approve_by_co_advisor2: true,
      co_advisor2_proposal_approved_date: true,
    },
  });
  return proposal;
};

//===================================================================
// @description     Upload/Update bukti pembayaran
// @route           PUT /proposal/proposal-payment/:id
// @access          MAHASISWA
const updateProposalPaymentById = async (id, payload) => {
  const { file_name_payment, file_size_payment } = payload;
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      file_name_payment,
      upload_date_payment: new Date(),
      file_size_payment,
    },
    select: {
      id: true,
      file_name_payment: true,
      upload_date_payment: true,
      file_size_payment: true,
    },
  });
  return proposal;
};

//===================================================================
// @description     Get bukti pembayaran
// @route           GET /proposal/proposal-payment/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findProposalPaymentById = async (id) => {
  const proposal = await prisma.proposal.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      file_name_payment: true,
      upload_date_payment: true,
      file_size_payment: true,
    },
  });
  return proposal;
};

//===================================================================
// @description     Delete/Update bukti pembayaran
// @route           DELETE /proposal/proposal-payment/delete/:id
// @access          MAHASISWA
const deleteProposalPaymentById = async (id) => {
  await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      file_name_payment: null,
      upload_date_payment: null,
      file_size_payment: null,
    },
  });
};

//===================================================================
// @description     Upload/Update bukti hasil cek plagiat
// @route           PUT /proposal/proposal-plagiarism-check/:id
// @access          MAHASISWA
const updateProposalPlagiarismById = async (id, payload) => {
  const { file_name_plagiarismcheck, file_size_plagiarismcheck } = payload;
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      file_name_plagiarismcheck,
      upload_date_plagiarismcheck: new Date(),
      file_size_plagiarismcheck,
    },
    select: {
      id: true,
      file_name_plagiarismcheck: true,
      upload_date_plagiarismcheck: true,
      file_size_plagiarismcheck: true,
    },
  });
  return proposal;
};

//===================================================================
// @description     Get bukti hasil cek plagiat
// @route           PUT /proposal/proposal-plagiarism-check/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findProposalPlagiarismById = async (id) => {
  const proposal = await prisma.proposal.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      file_name_plagiarismcheck: true,
      upload_date_plagiarismcheck: true,
      file_size_plagiarismcheck: true,
    },
  });
  return proposal;
};

//===================================================================
// @description     Delete/Update bukti hasil cek plagiat
// @route           PUT /proposal/proposal-plagiarism-check/delete/:id
// @access          MAHASISWA
const deleteProposalPlagiarismById = async (id) => {
  await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      file_name_plagiarismcheck: null,
      upload_date_plagiarismcheck: null,
      file_size_plagiarismcheck: null,
    },
  });
};

//===================================================================
// @description     Get all proposal schedule
// @route           GET /proposal/schedule
// @access          OPERATOR_FAKULTAS
// @used            checkTimeConflict
const findAllProposalSchedule = async () => {
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

  return proposals;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Check conflict between schedule
// @used            checkScheduleConflict
const findAllConflictingProposalSchedule = async (
  id,
  defence_date,
  defence_room
) => {
  const conflictingSchedules = await prisma.Proposal.findMany({
    where: {
      defence_date,
      defence_room,
      NOT: {
        id,
      },
    },
  });

  return conflictingSchedules;
};

//===================================================================
// @description     Create/Update proposal schedule
// @route           POST /proposal/schedule/:id
// @access          OPERATOR_FAKULTAS
const updateProposalScheduleById = async (id, payload) => {
  const {
    panelist_chairman_id,
    panelist_member_id,
    start_defence,
    end_defence,
    defence_room,
    defence_date,
  } = payload;
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      panelist_chairman_id,
      panelist_member_id,
      start_defence,
      end_defence,
      defence_room,
      defence_date,
      report_date: defence_date,
    },
    select: {
      id: true,
      panelist_chairman_id: true,
      panelist_member_id: true,
      start_defence: true,
      end_defence: true,
      defence_room: true,
      defence_date: true,
    },
  });
  return proposal;
};

//===================================================================
// @description     Get proposal schedule
// @route           GET /proposal/schedule/:id
// @access          OPERATOR_FAKULTAS
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
      defence_date: true,
    },
  });
  return proposal;
};

// const findGroupById =  async (proposal_id) => {
//   const group = await prisma.group.findUnique({
//     where: {
//       proposal_id,
//     },
//   });
//   return group;
// }

// const findGroupStudentById =  async (group_id) => {
//   const group_Student = await prisma.group_Student.findMany({
//     where: {
//       group_id,
//     },
//   });
//   return group_Student;
// }

// // create/update jadwal
// const openAccessProposalReportById = async (id) => {
//   const proposal = await prisma.proposal.update({
//     where: {
//       id,
//     },
//     data: {
//       is_report_open: true,
//     },
//     select: {
//       id: true,
//       is_report_open: true,
//     }
//   });
//   return proposal;
// };

// // get siapa saja yang sudah mengisi berita acara
// const findProposalReportById =  async (id) => {
//   const proposal = await prisma.proposal.findUnique({
//     where: {
//       id,
//     },
//     select: {
//       id: true,
//       is_report_approve_by_dekan: true,
//       is_report_approve_by_panelist_chairman: true,
//       is_report_approve_by_panelist_member: true,
//       is_report_approve_by_advisor: true
//     }
//   });
//   return proposal;
// }

// // create/update report
// const signProposalReportById = async (id) => {
//   const proposal = await prisma.proposal.update({
//     where: {
//       id,
//     },
//     data: {
//       is_report_approve_by_dekan: true,
//       is_report_approve_by_panelist_chairman: true,
//       is_report_approve_by_panelist_member: true,
//       is_report_approve_by_advisor: true
//     },
//     select: {
//       id: true,
//       is_report_approve_by_dekan: true,
//       is_report_approve_by_panelist_chairman: true,
//       is_report_approve_by_panelist_member: true,
//       is_report_approve_by_advisor: true
//     }
//   });
//   return proposal;
// };

// // create/update kesimpulan report
// const updateProposalConclusionById = async (id, payload) => {
//   const {
//     exam_conclution,
//     changes_conclusion,
//     assessment_conclution,
//     is_pass,
//   } = payload;
//   const proposal = await prisma.proposal.update({
//     where: {
//       id,
//     },
//     data: {
//       exam_conclution,
//       changes_conclusion,
//       assessment_conclution,
//       is_pass,
//     },
//     select: {
//       id: true,
//       exam_conclution: true,
//       changes_conclusion: true,
//       assessment_conclution: true,
//       is_pass: true,
//       report_date: true
//     }
//   });
//   return proposal;
// };

// // get kesimpulan report
// const findProposalConclusionById =  async (id) => {
//   const proposal = await prisma.proposal.findUnique({
//     where: {
//       id,
//     },
//     select: {
//       id: true,
//       exam_conclution,
//       changes_conclusion,
//       assessment_conclution,
//       is_pass,
//       report_date
//     }
//   });
//   return proposal;
// }

// // upload/update dokumen revisi
// const updateProposalRevisionDocumentById = async (id, payload) => {
//   const {
//     file_name_revision,
//     file_size_revision,
//   } = payload;
//   const proposal = await prisma.proposal.update({
//     where: {
//       id,
//     },
//     data: {
//       file_name_revision,
//       upload_date_revision: new Date(),
//       file_size_revision,
//       is_revision_approve_by_panelist_chairman: "Waiting",
//       is_revision_approve_by_panelist_member: "Waiting",
//       is_revision_approve_by_advisor: "Waiting",
//     },
//     select: {
//       id: true,
//       file_name_revision: true,
//       upload_date_revision: true,
//       file_size_revision: true,
//       is_revision_approve_by_panelist_chairman: true,
//       is_revision_approve_by_panelist_member: true,
//       is_revision_approve_by_advisor: true,
//     }
//   });
//   return proposal;
// };

// // get dokumen revisi
// const findProposalRevisionDocumentById =  async (id) => {
//   const proposal = await prisma.proposal.findUnique({
//     where: {
//       id,
//     },
//     select: {
//       id: true,
//       file_name_revision: true,
//       upload_date_revision: true,
//       file_size_revision: true,
//       is_revision_approve_by_panelist_chairman: true,
//       is_revision_approve_by_panelist_member: true,
//       is_revision_approve_by_advisor: true,
//     }
//   });
//   return proposal;
// }

// // hapus/update 1 revisi
// const deleteProposalRevisionDocumentById = async (id) => {
//   await prisma.proposal.update({
//     where: {
//       id,
//     },
//     data: {
//       file_name_revision: null,
//       upload_date_revision: null,
//       file_size_revision: null,
//       is_revision_approve_by_panelist_chairman: null,
//       is_revision_approve_by_panelist_member: null,
//       is_revision_approve_by_advisor: null,
//     },
//     select: {
//       id: true,
//       file_name_revision: true,
//       upload_date_revision: true,
//       file_size_revision: true,
//       is_revision_approve_by_panelist_chairman: true,
//       is_revision_approve_by_panelist_member: true,
//       is_revision_approve_by_advisor: true,
//     }
//   });
// };

// // approve dokumen revisi
// const approveProposalRevisionDocumentById = async (id) => {
//   const proposal = await prisma.proposal.update({
//     where: {
//       id,
//     },
//     data: {
//       is_revision_approve_by_panelist_chairman: "Approve",
//       is_revision_approve_by_panelist_member: "Approve",
//       is_revision_approve_by_advisor: "Approve",
//     },
//     select: {
//       id: true,
//       is_revision_approve_by_panelist_chairman: true,
//       is_revision_approve_by_panelist_member: true,
//       is_revision_approve_by_advisor: true,
//     }
//   });

//   if (
//     proposal.is_revision_approve_by_panelist_chairman === "Approve" &&
//     proposal.is_revision_approve_by_panelist_member === "Approve" &&
//     proposal.is_revision_approve_by_advisor === "Approve"
//   ) {
//     await updateProgressById(id);
//   }

//   return proposal;
// };

// // ++ update progress
// const updateProgressById = async (proposal_id) => {
//   const proposal = await prisma.group.update({
//     where: {
//       proposal_id,
//     },
//     data: {
//       progress: "Skripsi"
//     },
//     select: {
//       id: true,
//       progress: true
//     }
//   });

//   return proposal;
// }

// // approve dokumen revisi
// const rejectProposalRevisionDocumentById = async (id) => {
//   const proposal = await prisma.proposal.update({
//     where: {
//       id,
//     },
//     data: {
//       is_revision_approve_by_panelist_chairman: "Rejected",
//       is_revision_approve_by_panelist_member: "Rejected",
//       is_revision_approve_by_advisor: "Rejected",
//     },
//     select: {
//       id: true,
//       is_revision_approve_by_panelist_chairman: true,
//       is_revision_approve_by_panelist_member: true,
//       is_revision_approve_by_advisor: true,
//     }
//   });
//   return proposal;
// };

module.exports = {
  insertProposal,
  findProposalById,
  updateProposalDocumentById,
  findProposalDocumentById,
  deleteProposalDocumentById,
  findAdvisorInProposalByIdAndAdvisorId,
  findCoAdvisor1InProposalByIdAndAdvisorId,
  findCoAdvisor2InProposalByIdAndAdvisorId,
  approveProposalDocumentByAdvisorById,
  approveProposalDocumentByCoAdvisor1ById,
  approveProposalDocumentByCoAdvisor2ById,
  rejectProposalDocumentByAdvisorById,
  rejectProposalDocumentByCoAdvisor1ById,
  rejectProposalDocumentByCoAdvisor2ById,
  updateProposalPaymentById,
  findProposalPaymentById,
  deleteProposalPaymentById,
  updateProposalPlagiarismById,
  findProposalPlagiarismById,
  deleteProposalPlagiarismById,

  findAllProposalSchedule,
  findAllConflictingProposalSchedule,
  updateProposalScheduleById,
  findProposalScheduleById,

  // openAccessProposalReportById,
  // findProposalReportById,
  // signProposalReportById,
  // updateProposalConclusionById,
  // findProposalConclusionById,

  // updateProposalRevisionDocumentById,
  // findProposalRevisionDocumentById,
  // deleteProposalRevisionDocumentById,
  // approveProposalRevisionDocumentById,
  // rejectProposalRevisionDocumentById,
};
