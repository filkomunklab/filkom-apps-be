//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// get semua submission
const findAllSubmission = async () => {
  const submission = await prisma.submission.findMany();
  return submission;
};

// hapus 1 submission
const deleteSubmission = async (id) => {
  await prisma.submission.delete({
    where: {
      id,
    },
  });
};

// hapus All submission
const deleteAllSubmission = async () => {
  await prisma.submission.deleteMany({});
};

// create submission
const insertSubmission = async (payload) => {
  const {
      file_name,
      file_size,
      is_consultation,
      proposed_advisor,
      proposed_co_advisor1,
      proposed_co_advisor2,
      classroom_id,
  } = payload;
  const submission = await prisma.submission.create({
    data: {
      file_name,
      file_size,
      is_consultation,
      proposed_advisor,
      proposed_co_advisor1,
      proposed_co_advisor2,
      classroom_id,
    },
  });

  // Mengambil ID grup yang baru dibuat
  const { id: submission_id } = submission;

  await insertGroup(payload, submission_id);

  return submission;
};

// +++ create kelompok, input title
const insertGroup = async (payload, submission_id) => {
  const {
    title,
    partner1,
    partner2,
    partner3,
  } = payload;
  const group = await prisma.group.create({
    data: {
      title,
      progress: "Submission",
      submission_id
    },
  });

  // get id user yang login
  // student_id = userId;
  student_id = "f3fa4d77-0c7b-49a0-b84d-7a9be9b3faf0";

  // Mengambil ID grup yang baru dibuat
  const { id: group_id } = group;

  // Memasukkan mahasiswa ke dalam kelompok
  const groupStudents = await Promise.all([
    insertGroupStudent({ group_id, student_id: student_id }),
    partner1 && insertGroupStudent({ group_id, student_id: partner1 }),
    partner2 && insertGroupStudent({ group_id, student_id: partner2 }),
    partner3 &&insertGroupStudent({ group_id, student_id: partner3 }),
  ]);

  return group;
};

// +++ create kelompok mahasiswa
const insertGroupStudent = async (data) => {
  const { group_id, student_id } = data;
  const group_student = await prisma.group_Student.create({
    data: {
      group_id,
      student_id,
    },
  });
  return group_student;
};

// get 1 submission
const findSubmissionById = async (id) => {
  const submission = await prisma.submission.findUnique({
    where: {
      id,
    },
  });
  return submission;
};

// update submission
const updateSubmission = async (id, payload) => {
  const {
    file_name,
    file_size,
    is_consultation,
    proposed_advisor,
    proposed_co_advisor1,
    proposed_co_advisor2,
  } = payload;
  const submission = await prisma.submission.update({
    where: {
      id,
    },
    data: {
      file_name,
      file_size,
      is_consultation,
      proposed_advisor,
      proposed_co_advisor1,
      proposed_co_advisor2,
      updated_at: new Date(),
    },
  });

  await updateGroupTitle(id, payload);
  return submission;
};

// update title
const updateGroupTitle = async (id, payload) => {
  const { title } = payload;
    const group = await prisma.group.update({
        where: {
          submission_id: id,
        },
        data: {
            title,
            updated_at: new Date(),
        },
    });
    return group;
}

// update advisor
const updateAdvisorAndOrCoAdvisor = async (id, payload) => {
  const {
    proposed_advisor,
    proposed_co_advisor1,
    proposed_co_advisor2,
  } = payload;
  const submission = await prisma.submission.update({
    where: {
      id,
    },
    data: {
      proposed_advisor,
      proposed_co_advisor1,
      proposed_co_advisor2,
    },
  });
  return submission;
};

// approve submission
const approveSubmission = async (id) => {
  const submission = await prisma.submission.update({
    where: {
      id,
    },
    data: {
      is_approve: "Approve"
    },
  });

  await insertProposal(id, submission);
  await insertSkripsi(id, submission);

  return submission;
};

// +++ create proposal
const insertProposal = async (submission_id, submission) => {
  const {
    proposed_advisor,
    proposed_co_advisor1,
    proposed_co_advisor2,
    classroom_id,
  } = submission;
  const proposal = await prisma.proposal.create({
    data: {
      advisor: proposed_advisor,
      co_advisor1: proposed_co_advisor1,
      co_advisor2: proposed_co_advisor2,
      classroom_id,
    },
  });

  const { id: proposal_id } = proposal;
  
  await updateGroupProposalIdById(submission_id, proposal_id);

  return proposal;
}

const updateGroupProposalIdById = async (submission_id, proposal_id) => {
  const group = await prisma.group.update({
    where: {
      submission_id,
    },
    data: {
      proposal_id,
    },
  });

  return group;
}

// +++ create skripsi
const insertSkripsi = async (submission_id, submission) => {
  const {
    proposed_advisor,
    proposed_co_advisor1,
    proposed_co_advisor2,
  } = submission;
  const skripsi = await prisma.skripsi.create({
    data: {
      advisor: proposed_advisor,
      co_advisor1: proposed_co_advisor1,
      co_advisor2: proposed_co_advisor2,
    },
  });

  const { id: skripsi_id } = skripsi;
  
  await updateGroupSkripsiIdById(submission_id, skripsi_id);

  return skripsi;
}

const updateGroupSkripsiIdById = async (submission_id, skripsi_id) => {
  const group = await prisma.group.update({
    where: {
      submission_id,
    },
    data: {
      skripsi_id,
    },
  });

  return group;
}

// reject submission
const rejectSubmission = async (id) => {
  const submission = await prisma.submission.update({
    where: {
      id,
    },
    data: {
      is_approve: "Rejected"
    },
  });
  return submission;
};

module.exports = {
  findAllSubmission,
  deleteSubmission,
  deleteAllSubmission,
  insertSubmission,
  findSubmissionById,
  updateSubmission,
  updateAdvisorAndOrCoAdvisor,
  approveSubmission,
  rejectSubmission,
  updateGroupTitle,
}