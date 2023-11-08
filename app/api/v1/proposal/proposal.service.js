//Layer untuk handle business logic

const {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  deleteObject,
} = require("firebase/storage");
const { storage } = require("../../../config/firebase");
const proposalRepository = require("./proposal.repository");
const groupRepository = require("../group/group.repository");
const groupStudentRepository = require("../group_student/group_student.repository");
const employeeRepository = require("../employee/employee.repository");
const studentRepository = require("../student/student.repository");
const proposalAssessmentRepository = require("../proposal_assessment/proposal_assessment.repository");
const proposalChangesRepository = require("../proposal_changes/proposal_changes.repository");
const skripsiRepository = require("../skripsi/skripsi.repository");
const classroomRepository = require("../classroom/classroom.repository");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get proposal by id
// @used            updateProposalDocumentById, deleteProposalDocumentById,
//                  approveProposalDocumentById, rejectProposalDocumentById,
//                  updateProposalPaymentById, deleteProposalPaymentById,
//                  updateProposalPaymentById, getProposalPaymentById,
//                  updateProposalPlagiarismById, deleteProposalPlagiarismById,
//                  updateProposalScheduleById, openAccessProposalReportById,
//                  signProposalReportById, updateProposalConclusionById,
//                  getAllProposalAssessmentById, updateProposalRevisionDocumentById,
//                  deleteProposalRevisionDocumentById, approveProposalRevisionDocumentById,
//                  rejectProposalRevisionDocumentById,
const getProposalById = async (id) => {
  const proposal = await proposalRepository.findProposalById(id);
  if (!proposal) {
    throw {
      status: 400,
      message: `Proposal not found`,
    };
  }
  return proposal;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get group_student by student_id & group_id (check student in group_student)
// @used            updateProposalDocumentById, deleteProposalDocumentById,
//                  updateProposalPaymentById, deleteProposalPaymentById,
//                  updateProposalPlagiarismById,
const getGroupStudentByStudentIdAndGroupId = async (student_id, group_id) => {
  const group_student =
    await groupStudentRepository.findGroupStudentByStudentIdAndGroupId(
      student_id,
      group_id
    );
  if (!group_student) {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }
  return group_student;
};

//===================================================================
// @description     Upload dokumen proposal
// @route           PUT /proposal/proposal-document/:id
// @access          MAHASISWA
const updateProposalDocumentById = async (userId, id, payload) => {
  // check proposal
  const proposal = await getProposalById(id);
  // get group by proposal_id
  const group = await groupRepository.findGroupByProposalId(proposal.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // delete existing file
  if (proposal.file_name_proposal) {
    // file
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      `proposal/${group.id}/${proposal.file_name_proposal}`
    );
    // Delete the file
    await deleteObject(desertRef);
  }

  // file
  const storageRef = ref(
    storage,
    `proposal/${group.id}/${payload.proposal_file.file_name_proposal}`
  );
  const metadata = { contentType: "application/pdf" };
  const binaryString = atob(payload.proposal_file.buffer);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  await uploadBytes(storageRef, byteArray, metadata);
  const path = await getDownloadURL(storageRef);

  // update proposal document
  const UpdatedProposal = await proposalRepository.updateProposalDocumentById(
    id,
    payload,
    path
  );

  // check approve by advisor
  if (UpdatedProposal.is_proposal_approve_by_advisor !== "Approve") {
    await proposalRepository.updateProposalDocumentApproveByAdvisorById(id);
  }
  // check approve by co-advisor1
  if (UpdatedProposal.is_proposal_approve_by_co_advisor1 !== "Approve") {
    await proposalRepository.updateProposalDocumentApproveByCoAdvisor1ById(id);
  }
  // check approve by co-advisor2
  if (UpdatedProposal.is_proposal_approve_by_co_advisor2 !== "Approve") {
    await proposalRepository.updateProposalDocumentApproveByCoAdvisor2ById(id);
  }

  // last check proposal
  const lastUpdatedProposal = await getProposalById(id);

  const Data = {
    id: UpdatedProposal.id,
    file_name_proposal: UpdatedProposal.file_name_proposal,
    upload_date_proposal: UpdatedProposal.upload_date_proposal,
    file_size_proposal: UpdatedProposal.file_size_proposal,
    file_path_proposal: UpdatedProposal.file_path_proposal,
    is_proposal_approve_by_advisor:
      lastUpdatedProposal.is_proposal_approve_by_advisor,
    is_proposal_approve_by_co_advisor1:
      lastUpdatedProposal.is_proposal_approve_by_co_advisor1,
    is_proposal_approve_by_co_advisor2:
      lastUpdatedProposal.is_proposal_approve_by_co_advisor2,
  };
  return Data;
};

//===================================================================
// @description     Get dokumen proposal
// @route           GET /proposal/proposal-document/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN
const getProposalDocumentById = async (id) => {
  const proposal = await proposalRepository.findProposalDocumentById(id);
  if (!proposal) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  const Data = {
    id: proposal.id,
    file_name_proposal: proposal.file_name_proposal,
    upload_date_proposal: proposal.upload_date_proposal,
    file_size_proposal: proposal.file_size_proposal,
    file_path_proposal: proposal.file_path_proposal,
    is_proposal_approve_by_advisor: proposal.is_proposal_approve_by_advisor,
    is_proposal_approve_by_co_advisor1:
      proposal.is_proposal_approve_by_co_advisor1,
    is_proposal_approve_by_co_advisor2:
      proposal.is_proposal_approve_by_co_advisor2,
  };
  return Data;
};

//===================================================================
// @description     Delete/Update dokumen proposal
// @route           PUT "/proposal/proposal-document/delete/:id
// @access          MAHASISWA
const deleteProposalDocumentById = async (userId, id) => {
  // check proposal
  const proposal = await getProposalById(id);
  // get group by proposal_id
  const group = await groupRepository.findGroupByProposalId(proposal.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // file
  const storage = getStorage();
  // Create a reference to the file to delete
  const desertRef = ref(
    storage,
    `proposal/${group.id}/${proposal.file_name_proposal}`
  );
  // Delete the file
  await deleteObject(desertRef);

  // delete/update proposal document
  const UpdatedProposal = await proposalRepository.deleteProposalDocumentById(
    id
  );

  // check approve by advisor
  if (
    UpdatedProposal.is_proposal_approve_by_advisor !== "Approve" &&
    UpdatedProposal.is_proposal_approve_by_advisor !== "Rejected"
  ) {
    await proposalRepository.deleteProposalDocumentApproveByAdvisorById(id);
  }
  // check approve by co-advisor1
  if (
    UpdatedProposal.is_proposal_approve_by_co_advisor1 !== "Approve" &&
    UpdatedProposal.is_proposal_approve_by_co_advisor1 !== "Rejected"
  ) {
    await proposalRepository.deleteProposalDocumentApproveByCoAdvisor1ById(id);
  }
  // check approve by co-advisor2
  if (
    UpdatedProposal.is_proposal_approve_by_co_advisor2 !== "Approve" &&
    UpdatedProposal.is_proposal_approve_by_co_advisor2 !== "Rejected"
  ) {
    await proposalRepository.deleteProposalDocumentApproveByCoAdvisor2ById(id);
  }
};

//===================================================================
// @description     Approve dokumen proposal
// @route           PUT /proposal/proposal-document/approve/:id
// @access          DOSEN
const approveProposalDocumentById = async (userId, id) => {
  // check proposal
  const proposal = await getProposalById(id);
  // check exist proposal document
  if (
    proposal.file_name_proposal === null &&
    proposal.file_size_proposal === null
  ) {
    throw {
      status: 400,
      message: `There are no files to approve`,
    };
  }
  // check apakah advisor
  const advisor =
    await proposalRepository.findAdvisorInProposalByIdAndAdvisorId(
      proposal.id,
      userId
    );
  // check apakah co-advisor1
  const co_advisor1 =
    await proposalRepository.findCoAdvisor1InProposalByIdAndAdvisorId(
      proposal.id,
      userId
    );
  // check apakah co-advisor2
  const co_advisor2 =
    await proposalRepository.findCoAdvisor2InProposalByIdAndAdvisorId(
      proposal.id,
      userId
    );

  if (advisor) {
    if (advisor.is_proposal_approve_by_advisor === "Approve") {
      throw {
        status: 400,
        message: `File has been approved`,
      };
    } else {
      const UpdatedProposal =
        await proposalRepository.approveProposalDocumentByAdvisorById(id);
      const Data = {
        is_proposal_approve_by_advisor:
          UpdatedProposal.is_proposal_approve_by_advisor,
        advisor_proposal_approved_date:
          UpdatedProposal.advisor_proposal_approved_date,
      };
      return Data;
    }
  }
  if (co_advisor1) {
    if (co_advisor1.is_proposal_approve_by_co_advisor1 === "Approve") {
      throw {
        status: 400,
        message: `File has been approved`,
      };
    } else {
      const UpdatedProposal =
        await proposalRepository.approveProposalDocumentByCoAdvisor1ById(id);
      const Data = {
        is_proposal_approve_by_co_advisor1:
          UpdatedProposal.is_proposal_approve_by_co_advisor1,
        co_advisor1_proposal_approved_date:
          UpdatedProposal.co_advisor1_proposal_approved_date,
      };
      return Data;
    }
  }
  if (co_advisor2) {
    if (co_advisor2.is_proposal_approve_by_co_advisor1 === "Approve") {
      throw {
        status: 400,
        message: `File has been approved`,
      };
    } else {
      const UpdatedProposal =
        await proposalRepository.approveProposalDocumentByCoAdvisor2ById(id);
      const Data = {
        is_proposal_approve_by_co_advisor2:
          UpdatedProposal.is_proposal_approve_by_co_advisor2,
        co_advisor2_proposal_approved_date:
          UpdatedProposal.co_advisor2_proposal_approved_date,
      };
      return Data;
    }
  }

  if (!advisor && !co_advisor1 && !co_advisor2) {
    throw {
      status: 400,
      message: `You are not Advisor or Co-Advisor`,
    };
  }
};

//===================================================================
// @description     Reject dokumen proposal
// @route           PUT /proposal/proposal-document/reject/:id
// @access          DOSEN
const rejectProposalDocumentById = async (userId, id) => {
  // check proposal
  const proposal = await getProposalById(id);
  // check exist proposal document
  if (
    proposal.file_name_proposal === null &&
    proposal.file_size_proposal === null
  ) {
    throw {
      status: 400,
      message: `There are no files to reject`,
    };
  }
  // check apakah advisor
  const advisor =
    await proposalRepository.findAdvisorInProposalByIdAndAdvisorId(
      proposal.id,
      userId
    );
  // check apakah co-advisor1
  const co_advisor1 =
    await proposalRepository.findCoAdvisor1InProposalByIdAndAdvisorId(
      proposal.id,
      userId
    );
  // check apakah co-advisor2
  const co_advisor2 =
    await proposalRepository.findCoAdvisor2InProposalByIdAndAdvisorId(
      proposal.id,
      userId
    );

  if (advisor) {
    if (
      advisor.is_proposal_approve_by_advisor === "Rejected" ||
      advisor.is_proposal_approve_by_advisor === "Approve"
    ) {
      throw {
        status: 400,
        message: `File has been rejected or approved`,
      };
    } else {
      const UpdatedProposal =
        await proposalRepository.rejectProposalDocumentByAdvisorById(id);
      const Data = {
        is_proposal_approve_by_advisor:
          UpdatedProposal.is_proposal_approve_by_advisor,
        advisor_proposal_approved_date:
          UpdatedProposal.advisor_proposal_approved_date,
      };
      return Data;
    }
  }
  if (co_advisor1) {
    if (
      co_advisor1.is_proposal_approve_by_co_advisor1 === "Rejected" ||
      co_advisor1.is_proposal_approve_by_co_advisor1 === "Approve"
    ) {
      throw {
        status: 400,
        message: `File has been rejected or approved`,
      };
    } else {
      const UpdatedProposal =
        await proposalRepository.rejectProposalDocumentByCoAdvisor1ById(id);
      const Data = {
        is_proposal_approve_by_co_advisor1:
          UpdatedProposal.is_proposal_approve_by_co_advisor1,
        co_advisor1_proposal_approved_date:
          UpdatedProposal.co_advisor1_proposal_approved_date,
      };
      return Data;
    }
  }
  if (co_advisor2) {
    if (
      co_advisor2.is_proposal_approve_by_co_advisor1 === "Rejected" ||
      co_advisor2.is_proposal_approve_by_co_advisor1 === "Approve"
    ) {
      throw {
        status: 400,
        message: `File has been rejected or approved`,
      };
    } else {
      const UpdatedProposal =
        await proposalRepository.rejectProposalDocumentByCoAdvisor2ById(id);
      const Data = {
        is_proposal_approve_by_co_advisor2:
          UpdatedProposal.is_proposal_approve_by_co_advisor2,
        co_advisor2_proposal_approved_date:
          UpdatedProposal.co_advisor2_proposal_approved_date,
      };
      return Data;
    }
  }

  if (!advisor && !co_advisor1 && !co_advisor2) {
    throw {
      status: 400,
      message: `You are not Advisor or Co-Advisor`,
    };
  }
};

//===================================================================
// @description     Upload/Update bukti pembayaran
// @route           PUT /proposal/proposal-payment/:id
// @access          MAHASISWA
const updateProposalPaymentById = async (id, userId, payload) => {
  // check proposal
  const proposal = await getProposalById(id);
  // get group by proposal_id
  const group = await groupRepository.findGroupByProposalId(proposal.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // delete existing file
  if (proposal.file_path_payment) {
    // file
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      `proposal/${group.id}/${proposal.file_name_payment}`
    );
    // Delete the file
    await deleteObject(desertRef);
  }

  // file
  const storageRef = ref(
    storage,
    `proposal/${group.id}/${payload.payment_file.file_name_payment}`
  );
  const metadata = { contentType: "application/pdf" };
  const binaryString = atob(payload.payment_file.buffer);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  await uploadBytes(storageRef, byteArray, metadata);
  const path = await getDownloadURL(storageRef);

  // update proposal document
  const UpdatedProposal = await proposalRepository.updateProposalPaymentById(
    id,
    payload,
    path
  );
  return UpdatedProposal;
};

//===================================================================
// @description     Get bukti pembayaran
// @route           GET /proposal/proposal-payment/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
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

//===================================================================
// @description     Delete/Update bukti pembayaran
// @route           DELETE /proposal/proposal-payment/delete/:id
// @access          MAHASISWA
const deleteProposalPaymentById = async (id, userId) => {
  // check proposal
  const proposal = await getProposalById(id);
  // get group by proposal_id
  const group = await groupRepository.findGroupByProposalId(proposal.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // file
  const storage = getStorage();
  // Create a reference to the file to delete
  const desertRef = ref(
    storage,
    `proposal/${group.id}/${proposal.file_name_payment}`
  );
  // Delete the file
  await deleteObject(desertRef);

  // delete/update proposal document
  await proposalRepository.deleteProposalPaymentById(id);
};

//===================================================================
// @description     Upload/Update bukti hasil cek plagiat
// @route           PUT /proposal/proposal-plagiarism-check/:id
// @access          MAHASISWA
const updateProposalPlagiarismById = async (id, userId, payload) => {
  // check proposal
  const proposal = await getProposalById(id);
  // get group by proposal_id
  const group = await groupRepository.findGroupByProposalId(proposal.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // delete existing file
  if (proposal.file_name_plagiarismcheck) {
    // file
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      `proposal/${group.id}/${proposal.file_name_plagiarismcheck}`
    );
    // Delete the file
    await deleteObject(desertRef);
  }

  // file
  const storageRef = ref(
    storage,
    `proposal/${group.id}/${payload.plagiarism_file.file_name_plagiarismcheck}`
  );
  const metadata = { contentType: "application/pdf" };
  const binaryString = atob(payload.plagiarism_file.buffer);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  await uploadBytes(storageRef, byteArray, metadata);
  const path = await getDownloadURL(storageRef);

  // update proposal plagiarism
  const UpdatedProposal = await proposalRepository.updateProposalPlagiarismById(
    id,
    payload,
    path
  );
  return UpdatedProposal;
};

//===================================================================
// @description     Get bukti hasil cek plagiat
// @route           PUT /proposal/proposal-plagiarism-check/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
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

//===================================================================
// @description     Delete/Update bukti hasil cek plagiat
// @route           PUT /proposal/proposal-plagiarism-check/delete/:id
// @access          MAHASISWA
const deleteProposalPlagiarismById = async (id, userId) => {
  // check proposal
  const proposal = await getProposalById(id);
  // get group by proposal_id
  const group = await groupRepository.findGroupByProposalId(proposal.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // file
  const storage = getStorage();
  // Create a reference to the file to delete
  const desertRef = ref(
    storage,
    `proposal/${group.id}/${proposal.file_name_plagiarismcheck}`
  );
  // Delete the file
  await deleteObject(desertRef);

  // delete/update proposal plagiarism
  await proposalRepository.deleteProposalPlagiarismById(id);
};

//===================================================================
// @description     Get all proposal schedule
// @route           GET /proposal/schedule
// @access          OPERATOR_FAKULTAS
const getAllProposalSchedule = async () => {
  const scheduleBySemester = {};

  const proposals = await proposalRepository.findAllProposalSchedule();
  if (!proposals) {
    return scheduleBySemester;
  }
  // Dapatkan semua proposal_id di sini
  const proposalIds = proposals.map((proposal) => proposal.id);

  // Dapatkan grup berdasarkan proposalIds
  const groups = await groupRepository.findManyGroupsByProposalIds(proposalIds);

  // Menggabungkan data proposal dengan data grup
  await Promise.all(
    proposals.map(async (proposal) => {
      // memproses pengambilan jadwal proposal yang belum mulai sidang
      if (proposal.is_report_open !== true) {
        for (const group of groups) {
          // memproses jika menemukan group yang progress di "Proposal"
          if (group && group.progress === "Proposal") {
            const studentIds =
              await groupStudentRepository.findGroupStudentByGroupId(group.id);

            const students = [];
            for (const entry of studentIds) {
              const student = await studentRepository.findStudentById(entry);
              let name = student.firstName;
              if (student.lastName) {
                name += ` ${student.lastName}`;
              }
              const studentData = {
                id: student.id,
                fullName: name,
                nim: student.nim,
              };
              students.push(studentData);
            }
            // Menggabungkan firstName dan lastName menjadi fullName
            const getEmployeeNameAndDegree = async (
              firstName,
              lastName,
              degree
            ) => {
              let name = firstName;

              if (lastName) {
                name += ` ${lastName}`;
              }

              if (degree) {
                name += `, ${degree}`;
              }

              return name;
            };
            const advisorName = await getEmployeeNameAndDegree(
              proposal.advisor.firstName,
              proposal.advisor.lastName,
              proposal.advisor.degree
            );
            const panelistChairmanName = await getEmployeeNameAndDegree(
              proposal.panelist_chairman?.firstName,
              proposal.panelist_chairman?.lastName,
              proposal.panelist_chairman?.degree
            );
            const panelistMemberName = await getEmployeeNameAndDegree(
              proposal.panelist_member?.firstName,
              proposal.panelist_member?.lastName,
              proposal.panelist_member?.degree
            );

            // get classroom
            const classroom = await classroomRepository.findClassroomById(
              proposal.classroom_id
            );

            if (group) {
              const data = {
                group_id: group.id,
                proposal_id: proposal.id,
                title: group.title,
                students,
                advisor_id: proposal.advisor.id,
                advisor_name: advisorName,
                panelist_chairman_id: proposal.panelist_chairman?.id || null,
                panelist_chairman_name: panelistChairmanName || null,
                panelist_member_id: proposal.panelist_member?.id || null,
                panelist_member_name: panelistMemberName || null,
                start_defence: proposal.start_defence,
                end_defence: proposal.end_defence,
                defence_room: proposal.defence_room,
                defence_date: proposal.defence_date,
              };
              // Create a semester key based on the Academic_Calendar data
              const semesterKey = `${classroom.academic.year}-${classroom.academic.semester} (${classroom.name})`;

              if (!scheduleBySemester[semesterKey]) {
                scheduleBySemester[semesterKey] = {
                  semester: semesterKey,
                  schedules: [],
                };
              }

              scheduleBySemester[semesterKey].schedules.push(data);
            }
          }
        }
      }
    })
  );
  // Convert the scheduleBySemester object into an array of semesters
  const scheduleList = Object.values(scheduleBySemester);

  return scheduleList;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get dosen by id
// @used            updateProposalScheduleById,
const getDosenById = async (id) => {
  const dosen = await employeeRepository.findEmployeeById(id);
  if (!dosen) {
    throw {
      status: 400,
      message: `Dosen not found`,
    };
  }
  return dosen;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Check conflict between schedule
// @used            updateProposalScheduleById
const checkScheduleConflict = async (id, payload) => {
  const { start_defence, end_defence, defence_room, defence_date } = payload;

  // // Konversi tanggal payload ke format yang sesuai
  // const formattedPayloadDate = formatDate(defence_date); // Anda perlu membuat fungsi formatDate

  // Query database untuk jadwal yang relevan, kecuali jadwal yang akan diupdate
  const conflictingSchedules =
    await proposalRepository.findAllConflictingProposalSchedule(
      id,
      defence_date,
      defence_room
    );

  // Periksa tabrakan
  const isConflict = conflictingSchedules.some((schedule) => {
    const scheduleStart = schedule.start_defence;
    const scheduleEnd = schedule.end_defence;

    return (
      (start_defence >= scheduleStart && start_defence <= scheduleEnd) ||
      (end_defence >= scheduleStart && end_defence <= scheduleEnd)
    );
  });

  return isConflict;
};

//===================================================================
// @description     Create/Update proposal schedule
// @route           PUT /proposal/schedule/:id
// @access          OPERATOR_FAKULTAS
const updateProposalScheduleById = async (id, payload) => {
  // check proposal
  const proposal = await getProposalById(id);
  const { panelist_chairman_id, panelist_member_id } = payload;

  // check if has defence
  if (proposal.is_report_open === true) {
    throw {
      status: 400,
      message: `Can't perform this action`,
    };
  }

  if (
    proposal.advisor_id !== panelist_chairman_id &&
    proposal.advisor_id !== panelist_member_id &&
    panelist_chairman_id !== panelist_member_id
  ) {
    // mengecek dosen
    if (panelist_chairman_id) {
      await getDosenById(panelist_chairman_id);
    }
    if (panelist_member_id) {
      await getDosenById(panelist_member_id);
    }

    // check conflict between schedule
    const isConflict = await checkScheduleConflict(proposal.id, payload);
    console.log(isConflict);
    if (isConflict) {
      throw {
        status: 400,
        message: `Conflict`,
      };
    }

    const updatedProposal = await proposalRepository.updateProposalScheduleById(
      id,
      payload
    );
    return updatedProposal;
  } else {
    throw {
      status: 400,
      message: `There are the same lecturers`,
    };
  }
};

//===================================================================
// @description     Get proposal schedule
// @route           GET /proposal/schedule/:id
// @access          OPERATOR_FAKULTAS
const getProposalScheduleById = async (id) => {
  const proposal = await proposalRepository.findProposalScheduleById(id);
  if (!proposal) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  const group = await groupRepository.findGroupByProposalId(id);
  const groupStudent = await groupStudentRepository.findGroupStudentByGroupId(
    group.id
  );
  const students = await Promise.all(
    groupStudent.map(async (student_id) => {
      // get student in table student by student_id
      const student = await studentRepository.findStudentById(student_id);
      if (student) {
        // Menggabungkan firstName dan lastName menjadi fullName
        let fullName = student.firstName;

        if (student.lastName) {
          fullName += ` ${student.lastName}`;
        }
        return {
          fullName: fullName,
          nim: student.nim,
          major: student.major,
        };
      } else {
        throw {
          status: 400,
          message: `Student Not found`,
        };
      }
    })
  );
  const formatNameWithDegree = (employee) => {
    const { firstName, lastName, degree } = employee;
    let name = firstName;
    if (lastName) {
      name += ` ${lastName}`;
    }
    if (degree) {
      name += `, ${degree}`;
    }
    return name;
  };

  const panelistChairman = formatNameWithDegree(proposal.panelist_chairman);
  const panelistMember = formatNameWithDegree(proposal.panelist_member);
  const advisor = formatNameWithDegree(proposal.advisor);
  const scheduleData = {
    id: proposal.id,
    title: group.title,
    students,
    panelist_chairman: panelistChairman,
    panelist_member: panelistMember,
    advisor: advisor,
    start_defence: proposal.start_defence,
    end_defence: proposal.end_defence,
    defence_room: proposal.defence_room,
    defence_date: proposal.defence_date,
  };
  return scheduleData;
};

//===================================================================
// @description     Open report
// @route           PUT /proposal/proposal-report/open-access/:id
// @access          DOSEN
const openAccessProposalReportById = async (id, userId) => {
  // check proposal
  const proposal = await getProposalById(id);
  // check if dosen is panelist chairman
  if (proposal.panelist_chairman_id === userId) {
    // check if already openend
    if (proposal.is_report_open) {
      throw {
        status: 400,
        message: `Report has opened`,
      };
    }
    const updatedProposal =
      await proposalRepository.openAccessProposalReportById(id);
    // check if success open report
    if (updatedProposal) {
      // get group
      const group = await groupRepository.findGroupByProposalId(proposal.id);

      // input chairman and member into skripsi
      await skripsiRepository.updateSkripsiChairmanAndMemberById(
        group.skripsi_id,
        proposal.panelist_chairman_id,
        proposal.panelist_member_id
      );

      // get group_student -> student_id
      const studentIds = await groupStudentRepository.findGroupStudentByGroupId(
        group.id
      );
      // looping to create empty assessment for all student
      for (const student of studentIds) {
        // create empty assessment for chairman
        await proposalAssessmentRepository.insertEmptyProposalAssessment(
          proposal.id,
          student,
          proposal.panelist_chairman_id
        );
        // create empty assessment for member
        await proposalAssessmentRepository.insertEmptyProposalAssessment(
          proposal.id,
          student,
          proposal.panelist_member_id
        );
        // create empty assessment for advisor
        await proposalAssessmentRepository.insertEmptyProposalAssessment(
          proposal.id,
          student,
          proposal.advisor_id
        );
      }
      // create empty change for chairman
      await proposalChangesRepository.insertEmptyProposalChanges(
        proposal.id,
        proposal.panelist_chairman_id
      );
      // create empty change for member
      await proposalChangesRepository.insertEmptyProposalChanges(
        proposal.id,
        proposal.panelist_member_id
      );
      // create empty change for advisor
      await proposalChangesRepository.insertEmptyProposalChanges(
        proposal.id,
        proposal.advisor_id
      );
      if (proposal.co_advisor1_id) {
        // create empty change for co-advisor1
        await proposalChangesRepository.insertEmptyProposalChanges(
          proposal.id,
          proposal.co_advisor1_id
        );
      }
      if (proposal.co_advisor2_id) {
        // create empty change for co-advisor2
        await proposalChangesRepository.insertEmptyProposalChanges(
          proposal.id,
          proposal.co_advisor2_id
        );
      }
    }
    return updatedProposal;
  } else {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }
};

//===================================================================
// @description     Update proposal assessment by id
// @route           PUT /proposal/proposal-assessment/:id
// @access          DOSEN
const updateProposalAssessmentById = async (id, userId, payload) => {
  // check existing assessment
  const assessment =
    await proposalAssessmentRepository.findProposalAssessmentByProposalIdAndStudentIdAndDosenId(
      id,
      payload.student_id,
      userId
    );
  if (!assessment) {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }
  // update assessment
  const updateAssessment =
    await proposalAssessmentRepository.updateProposalAssessmentById(
      assessment.id,
      payload.value
    );
  return updateAssessment;
};

//===================================================================
// @description     Get all proposal assessment by id
// @route           GET /proposal/proposal-assessment/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getAllProposalAssessmentById = async (id) => {
  // check proposal
  const proposal = await getProposalById(id);

  const proposalAssessment =
    await proposalAssessmentRepository.findAllProposalAssessmentByProposalId(
      id
    );
  if (!proposalAssessment) {
    throw {
      status: 400,
      message: `Proposal assessment not found`,
    };
  }

  const groupedProposalAssessment = {};
  // Kelompokkan proposal_assessment berdasarkan student_id
  proposalAssessment.forEach((assessment) => {
    const studentId = assessment.student_id;

    if (!groupedProposalAssessment[studentId]) {
      groupedProposalAssessment[studentId] = [];
    }

    groupedProposalAssessment[studentId].push(assessment);
  });

  const result = [];

  for (const studentId in groupedProposalAssessment) {
    const student = await studentRepository.findStudentById(studentId);
    let fullName = student.firstName;
    if (student.lastName) {
      fullName += ` ${student.lastName}`;
    }

    const chairmanValue = groupedProposalAssessment[studentId].find(
      (assessment) => assessment.dosen_id === proposal.panelist_chairman_id
    );

    const memberValue = groupedProposalAssessment[studentId].find(
      (assessment) => assessment.dosen_id === proposal.panelist_member_id
    );

    const advisorValue = groupedProposalAssessment[studentId].find(
      (assessment) => assessment.dosen_id === proposal.advisor_id
    );

    const studentData = {
      proposal_id: proposal.id,
      student_id: student.id,
      fullName: fullName,
      nim: student.nim,
      major: student.major,
      value_by_chairman: chairmanValue ? chairmanValue.value : null,
      value_by_member: memberValue ? memberValue.value : null,
      value_by_advisor: advisorValue ? advisorValue.value : null,
    };

    result.push(studentData);
  }

  return result;
};

//===================================================================
// @description     Update proposal changes by id
// @route           PUT /proposal/proposal-changes/:id
// @access          DOSEN
const updateProposalChangesById = async (id, userId, payload) => {
  // check existing change
  const change =
    await proposalChangesRepository.findProposalChangesByProposalIdAndDosenId(
      id,
      userId
    );
  if (!change) {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }
  // update change
  const updateChange = await proposalChangesRepository.updateProposalChangeById(
    change.id,
    payload.changes
  );
  return updateChange;
};

//===================================================================
// @description     Get all proposal changes by id
// @route           GET /proposal/proposal-changes/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getAllProposalChangesById = async (id) => {
  // check proposal
  const proposal = await getProposalById(id);

  const proposalChanges =
    await proposalChangesRepository.findAllProposalChangesByProposalId(id);
  if (!proposalChanges) {
    throw {
      status: 400,
      message: `Proposal changes not found`,
    };
  }

  // const proposalChangesIds = proposalChanges.map((proposalChanges) => proposalChanges.id);
  const chairmanChanges = proposalChanges.find(
    (changes) => changes.dosen_id === proposal.panelist_chairman_id
  );

  const memberChanges = proposalChanges.find(
    (changes) => changes.dosen_id === proposal.panelist_member_id
  );

  const advisorChanges = proposalChanges.find(
    (changes) => changes.dosen_id === proposal.advisor_id
  );

  const coAdvisor1Changes = proposalChanges.find(
    (changes) => changes.dosen_id === proposal.co_advisor1_id
  );

  const coAdvisor2Changes = proposalChanges.find(
    (changes) => changes.dosen_id === proposal.co_advisor2_id
  );

  const changesData = {
    proposal_id: proposal.id,
    changes_by_chairman: chairmanChanges ? chairmanChanges.changes : null,
    changes_by_member: memberChanges ? memberChanges.changes : null,
    changes_by_advisor: advisorChanges ? advisorChanges.changes : null,
    changes_by_co_advisor1: coAdvisor1Changes
      ? coAdvisor1Changes.changes
      : null,
    changes_by_co_advisor2: coAdvisor2Changes
      ? coAdvisor2Changes.changes
      : null,
  };

  return changesData;
};

//===================================================================
// @description     Get report
// @route           GET /proposal/proposal-report/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getProposalReportById = async (id) => {
  const proposal = await proposalRepository.findProposalReportById(id);
  if (!proposal) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return proposal;
};

//===================================================================
// @description     Fill/Update report
// @route           PUT /proposal/proposal-report/:id
// @access          DOSEN, DEKAN
const signProposalReportById = async (id, userId) => {
  // check proposal
  const proposal = await getProposalById(id);
  if (proposal.is_report_open) {
    if (proposal.panelist_chairman_id === userId) {
      const updatedProposal =
        await proposalRepository.signChairmanProposalReportById(id);
      return updatedProposal;
    } else if (proposal.panelist_member_id === userId) {
      const updatedProposal =
        await proposalRepository.signMemberProposalReportById(id);
      return updatedProposal;
    } else if (proposal.advisor_id === userId) {
      const updatedProposal =
        await proposalRepository.signAdvisorProposalReportById(id);
      return updatedProposal;
    } else {
      const updatedProposal =
        await proposalRepository.signDekanProposalReportById(id);
      return updatedProposal;
    }
  } else {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }
};

//===================================================================
// @description     Fill/Update report conclusion
// @route           PUT /proposal/proposal-report/conclusion/:id
// @access          DOSEN
const updateProposalConclusionById = async (id, userId, payload) => {
  // check proposal
  const proposal = await getProposalById(id);

  // get group by proposal_id
  const group = await groupRepository.findGroupByProposalId(id);

  // get group_student by group_id
  const groupStudent = await groupStudentRepository.findGroupStudentByGroupId(
    group.id
  );

  // Get all proposal_id in here
  const studentIds = groupStudent.map((student) => student.id);

  // Check assessments for all students
  const allAssessmentsExist = studentIds.every(async (studentId) => {
    // check chairman assessment
    const chairmanAssessment =
      await proposalAssessmentRepository.findProposalAssessmentByProposalIdAndStudentIdAndDosenId(
        id,
        studentId,
        proposal.panelist_chairman_id
      );
    // check member assessment
    const memberAssessment =
      await proposalAssessmentRepository.findProposalAssessmentByProposalIdAndStudentIdAndDosenId(
        id,
        studentId,
        proposal.panelist_member_id
      );
    // check advisor assessment
    const advisorAssessment =
      await proposalAssessmentRepository.findProposalAssessmentByProposalIdAndStudentIdAndDosenId(
        id,
        studentId,
        proposal.advisor_id
      );

    return chairmanAssessment && memberAssessment && advisorAssessment;
  });

  // check chairman changes
  const chairmanChanges =
    await proposalChangesRepository.findProposalChangesByProposalIdAndDosenId(
      id,
      proposal.panelist_chairman_id
    );
  // check member changes
  const memberChanges =
    await proposalChangesRepository.findProposalChangesByProposalIdAndDosenId(
      id,
      proposal.panelist_member_id
    );
  // check advisor changes
  const advisorChanges =
    await proposalChangesRepository.findProposalChangesByProposalIdAndDosenId(
      id,
      proposal.advisor_id
    );

  if (
    allAssessmentsExist &&
    chairmanChanges &&
    memberChanges &&
    advisorChanges
  ) {
    console.log("sudah terisi");
    if (proposal.panelist_chairman_id === userId) {
      if (
        proposal.is_report_approve_by_panelist_chairman &&
        proposal.is_report_approve_by_panelist_member &&
        proposal.is_report_approve_by_advisor
      ) {
        const updatedProposal =
          await proposalRepository.updateProposalConclusionById(id, payload);
        return updatedProposal;
      } else {
        throw {
          status: 400,
          message: `You can't perform this action`,
        };
      }
    } else {
      throw {
        status: 400,
        message: `You can't perform this action`,
      };
    }
  } else {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }
};

//===================================================================
// @description     Get report conclusion
// @route           GET /proposal/proposal-report/conclusion/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getProposalConclusionById = async (id) => {
  const proposal = await proposalRepository.findProposalConclusionById(id);
  if (!proposal) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return proposal;
};

//===================================================================
// @description     Upload/Update dokumen revisi proposal
// @route           PUT /proposal/proposal-revision-document/:id
// @access          MAHASISWA
const updateProposalRevisionDocumentById = async (id, userId, payload) => {
  // check proposal
  const proposal = await getProposalById(id);
  // get group by proposal_id
  const group = await groupRepository.findGroupByProposalId(proposal.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // delete existing file
  if (proposal.file_name_revision) {
    // file
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      `proposal/${group.id}/${proposal.file_name_revision}`
    );
    // Delete the file
    await deleteObject(desertRef);
  }

  // file
  const storageRef = ref(
    storage,
    `proposal/${group.id}/${payload.revision_file.file_name_revision}`
  );
  const metadata = { contentType: "application/pdf" };
  const binaryString = atob(payload.revision_file.buffer);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  await uploadBytes(storageRef, byteArray, metadata);
  const path = await getDownloadURL(storageRef);

  // update proposal revision document
  const updatedProposal =
    await proposalRepository.updateProposalRevisionDocumentById(
      id,
      payload,
      path
    );

  // check approve by chairman
  if (updatedProposal.is_revision_approve_by_panelist_chairman !== "Approve") {
    await proposalRepository.updateProposalRevisionDocumentApproveByChairmanById(
      id
    );
  }
  // check approve by member
  if (updatedProposal.is_revision_approve_by_panelist_member !== "Approve") {
    await proposalRepository.updateProposalRevisionDocumentApproveByMemberById(
      id
    );
  }
  // check approve by advisor
  if (updatedProposal.is_revision_approve_by_advisor !== "Approve") {
    await proposalRepository.updateProposalRevisionDocumentApproveByAdvisorById(
      id
    );
  }

  // last check proposal
  const lastUpdatedProposal = await getProposalById(id);

  const Data = {
    id: updatedProposal.id,
    file_name_revision: updatedProposal.file_name_revision,
    upload_date_revision: updatedProposal.upload_date_revision,
    file_size_revision: updatedProposal.file_size_revision,
    file_path_revision: updatedProposal.file_path_revision,
    is_revision_approve_by_panelist_chairman:
      lastUpdatedProposal.is_revision_approve_by_panelist_chairman,
    is_revision_approve_by_panelist_member:
      lastUpdatedProposal.is_revision_approve_by_panelist_member,
    is_revision_approve_by_advisor:
      lastUpdatedProposal.is_revision_approve_by_advisor,
  };
  return Data;
};

//===================================================================
// @description     Get dokumen revisi proposal
// @route           GET /proposal/proposal-revision-document/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getProposalRevisionDocumentById = async (id) => {
  const proposal = await proposalRepository.findProposalRevisionDocumentById(
    id
  );
  if (!proposal) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  const Data = {
    id: proposal.id,
    file_name_revision: proposal.file_name_revision,
    upload_date_revision: proposal.upload_date_revision,
    file_size_revision: proposal.file_size_revision,
    file_path_revision: proposal.file_path_revision,
    is_revision_approve_by_panelist_chairman:
      proposal.is_revision_approve_by_panelist_chairman,
    is_revision_approve_by_panelist_member:
      proposal.is_revision_approve_by_panelist_member,
    is_revision_approve_by_advisor: proposal.is_revision_approve_by_advisor,
  };
  return Data;
};

//===================================================================
// @description     Delete/Update dokumen revisi proposal
// @route           PUT /proposal/proposal-revision-document/delete/:id
// @access          MAHASISWA
const deleteProposalRevisionDocumentById = async (id, userId) => {
  // check proposal
  const proposal = await getProposalById(id);
  // get group by proposal_id
  const group = await groupRepository.findGroupByProposalId(proposal.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // file
  const storage = getStorage();
  // Create a reference to the file to delete
  const desertRef = ref(
    storage,
    `proposal/${group.id}/${proposal.file_name_revision}`
  );
  // Delete the file
  await deleteObject(desertRef);

  // delete/update proposal revision document
  const updatedProposal =
    await proposalRepository.deleteProposalRevisionDocumentById(id);

  // check approve by chairman
  if (
    updatedProposal.is_revision_approve_by_panelist_chairman !== "Approve" &&
    updatedProposal.is_revision_approve_by_panelist_chairman !== "Rejected"
  ) {
    await proposalRepository.deleteProposalRevisionDocumentApproveByChairmanById(
      id
    );
  }
  // check approve by member
  if (
    updatedProposal.is_revision_approve_by_panelist_member !== "Approve" &&
    updatedProposal.is_revision_approve_by_panelist_member !== "Rejected"
  ) {
    await proposalRepository.deleteProposalRevisionDocumentApproveByMemberById(
      id
    );
  }
  // check approve by advisor
  if (
    updatedProposal.is_revision_approve_by_advisor !== "Approve" &&
    updatedProposal.is_revision_approve_by_advisor !== "Rejected"
  ) {
    await proposalRepository.deleteProposalRevisionDocumentApproveByAdvisorById(
      id
    );
  }
};

//===================================================================
// @description     Approve dokumen revisi proposal
// @route           PUT /proposal/proposal-revision-document/approve/:id
// @access          DOSEN
const approveProposalRevisionDocumentById = async (id, userId) => {
  // check proposal
  const proposal = await getProposalById(id);

  // check exist proposal document
  if (
    proposal.file_name_revision === null &&
    proposal.file_size_revision === null
  ) {
    throw {
      status: 400,
      message: `There are no files to approve`,
    };
  }
  // check apakah chairman
  const chairman =
    await proposalRepository.findChairmanInProposalByIdAndChairmanId(
      proposal.id,
      userId
    );
  // check apakah member
  const member = await proposalRepository.findMemberInProposalByIdAndMemberId(
    proposal.id,
    userId
  );
  // check apakah advisor
  const advisor =
    await proposalRepository.findAdvisorInProposalByIdAndAdvisorId(
      proposal.id,
      userId
    );

  // if user is chairman
  if (chairman) {
    if (chairman.is_revision_approve_by_panelist_chairman === "Approve") {
      throw {
        status: 400,
        message: `Revision has been approved`,
      };
    } else {
      // approve revisi
      const UpdatedProposal =
        await proposalRepository.approveProposalRevisionDocumentByChairmanById(
          id
        );
      // if all panelis approved
      if (
        UpdatedProposal.is_revision_approve_by_panelist_chairman ===
          "Approve" &&
        UpdatedProposal.is_revision_approve_by_panelist_member === "Approve" &&
        UpdatedProposal.is_revision_approve_by_advisor === "Approve"
      ) {
        // update progress in group to "Skripsi"
        await groupRepository.updateGroupProgressByProposalId(
          UpdatedProposal.id
        );
      }
      const Data = {
        is_revision_approve_by_panelist_chairman:
          UpdatedProposal.is_revision_approve_by_panelist_chairman,
        panelist_chairman_revision_approve_date:
          UpdatedProposal.panelist_chairman_revision_approve_date,
      };
      return Data;
    }
  }
  // if user is member
  if (member) {
    if (member.is_revision_approve_by_panelist_member === "Approve") {
      throw {
        status: 400,
        message: `Revision has been approved`,
      };
    } else {
      // approve revisi
      const UpdatedProposal =
        await proposalRepository.approveProposalRevisionDocumentByMemberById(
          id
        );
      // if all panelis approved
      if (
        UpdatedProposal.is_revision_approve_by_panelist_chairman ===
          "Approve" &&
        UpdatedProposal.is_revision_approve_by_panelist_member === "Approve" &&
        UpdatedProposal.is_revision_approve_by_advisor === "Approve"
      ) {
        // update progress in group to "Skripsi"
        await groupRepository.updateGroupProgressByProposalId(
          UpdatedProposal.id
        );
      }
      const Data = {
        is_revision_approve_by_panelist_member:
          UpdatedProposal.is_revision_approve_by_panelist_member,
        panelist_member_revision_approve_date:
          UpdatedProposal.panelist_member_revision_approve_date,
      };
      return Data;
    }
  }
  // if user is advisor
  if (advisor) {
    if (advisor.is_revision_approve_by_advisor === "Approve") {
      throw {
        status: 400,
        message: `Revision has been approved`,
      };
    } else {
      // approve revisi
      const UpdatedProposal =
        await proposalRepository.approveProposalRevisionDocumentByAdvisorById(
          id
        );
      // if all panelis approved
      if (
        UpdatedProposal.is_revision_approve_by_panelist_chairman ===
          "Approve" &&
        UpdatedProposal.is_revision_approve_by_panelist_member === "Approve" &&
        UpdatedProposal.is_revision_approve_by_advisor === "Approve"
      ) {
        // update progress in group to "Skripsi"
        await groupRepository.updateGroupProgressByProposalId(
          UpdatedProposal.id
        );
      }
      const Data = {
        is_revision_approve_by_advisor:
          UpdatedProposal.is_revision_approve_by_advisor,
        advisor_revision_approve_date:
          UpdatedProposal.advisor_revision_approve_date,
      };
      return Data;
    }
  }
};

//===================================================================
// @description     Reject dokumen revisi proposal
// @route           PUT /proposal/proposal-revision-document/reject/:id
// @access          DOSEN
const rejectProposalRevisionDocumentById = async (id, userId) => {
  // check proposal
  const proposal = await getProposalById(id);

  // check exist proposal document
  if (
    proposal.file_name_revision === null &&
    proposal.file_size_revision === null
  ) {
    throw {
      status: 400,
      message: `There are no files to approve`,
    };
  }
  // check apakah chairman
  const chairman =
    await proposalRepository.findChairmanInProposalByIdAndChairmanId(
      proposal.id,
      userId
    );
  // check apakah member
  const member = await proposalRepository.findMemberInProposalByIdAndMemberId(
    proposal.id,
    userId
  );
  // check apakah advisor
  const advisor =
    await proposalRepository.findAdvisorInProposalByIdAndAdvisorId(
      proposal.id,
      userId
    );

  // if user is chairman
  if (chairman) {
    if (
      chairman.is_revision_approve_by_panelist_chairman === "Rejected" ||
      chairman.is_revision_approve_by_panelist_chairman === "Approve"
    ) {
      throw {
        status: 400,
        message: `Revision has been approved`,
      };
    } else {
      // reject revisi
      const UpdatedProposal =
        await proposalRepository.rejectProposalRevisionDocumentByChairmanById(
          id
        );
      const Data = {
        is_revision_approve_by_panelist_chairman:
          UpdatedProposal.is_revision_approve_by_panelist_chairman,
        panelist_chairman_revision_approve_date:
          UpdatedProposal.panelist_chairman_revision_approve_date,
      };
      return Data;
    }
  }
  // if user is member
  if (member) {
    if (
      member.is_revision_approve_by_panelist_member === "Rejected" ||
      member.is_revision_approve_by_panelist_member === "Approve"
    ) {
      throw {
        status: 400,
        message: `Revision has been approved`,
      };
    } else {
      // reject revisi
      const UpdatedProposal =
        await proposalRepository.rejectProposalRevisionDocumentByMemberById(id);
      const Data = {
        is_revision_approve_by_panelist_member:
          UpdatedProposal.is_revision_approve_by_panelist_member,
        panelist_member_revision_approve_date:
          UpdatedProposal.panelist_member_revision_approve_date,
      };
      return Data;
    }
  }
  // if user is member
  if (advisor) {
    if (
      advisor.is_revision_approve_by_advisor === "Rejected" ||
      advisor.is_revision_approve_by_advisor === "Approve"
    ) {
      throw {
        status: 400,
        message: `Revision has been rejected or approved`,
      };
    } else {
      // reject revisi
      const UpdatedProposal =
        await proposalRepository.rejectProposalRevisionDocumentByAdvisorById(
          id
        );
      const Data = {
        is_revision_approve_by_advisor:
          UpdatedProposal.is_revision_approve_by_advisor,
        advisor_revision_approve_date:
          UpdatedProposal.advisor_revision_approve_date,
      };
      return Data;
    }
  }
};

module.exports = {
  updateProposalDocumentById,
  getProposalDocumentById,
  deleteProposalDocumentById,
  approveProposalDocumentById,
  rejectProposalDocumentById,
  updateProposalPaymentById,
  getProposalPaymentById,
  deleteProposalPaymentById,
  updateProposalPlagiarismById,
  getProposalPlagiarismById,
  deleteProposalPlagiarismById,

  getAllProposalSchedule,
  updateProposalScheduleById,
  getProposalScheduleById,

  openAccessProposalReportById,
  updateProposalAssessmentById,
  getAllProposalAssessmentById,
  updateProposalChangesById,
  getAllProposalChangesById,
  getProposalReportById,
  signProposalReportById,
  updateProposalConclusionById,
  getProposalConclusionById,

  updateProposalRevisionDocumentById,
  getProposalRevisionDocumentById,
  deleteProposalRevisionDocumentById,
  approveProposalRevisionDocumentById,
  rejectProposalRevisionDocumentById,
};
