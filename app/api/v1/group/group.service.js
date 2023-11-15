//Layer untuk handle business logic

const moment = require("moment-timezone");
moment.tz = require("moment-timezone").tz;
const groupRepository = require("./group.repository");
const groupStudentRepository = require("../group_student/group_student.repository");
const submissionRepository = require("../submission/submission.repository");
const proposalRepository = require("../proposal/proposal.repository");
const skripsiRepository = require("../skripsi/skripsi.repository");
const studentRepository = require("../student/student.repository");
const employeeRepository = require("../employee/employee.repository");
const classroomRepository = require("../classroom/classroom.repository");
const proposalStudentRepository = require("../proposal_student/proposal_student.repository");
const skripsiStudentRepository = require("../skripsi_student/skripsi_student.repository");
const userManagementRepository = require("../user_management/user_namagement.repository");
const thesisHistoryRepository = require("../thesis_history/thesis_history.repository");

//===================================================================
// @description     Get thesis list
// @route           GET /group_student/submission_list
// @access          MAHASISWA
const getThesisList = async (userId) => {
  const groupStudent = await groupStudentRepository.findGroupStudentByStudentId(
    userId
  );
  if (!groupStudent) {
    // mengembalikan data kosong karena belum mengajukan judul
    return groupStudent;
  }

  const result = [];
  for (const entry of groupStudent) {
    const group = await groupRepository.findGroupById(entry.group_id);
    // cek if group have submission
    if (group.submission_id) {
      const submission = await submissionRepository.findSubmissionById(
        group.submission_id
      );

      // Inisialisasi variabel untuk Proposal dan Skripsi
      let proposal = null;
      let skripsi = null;

      // Cek apakah group memiliki Proposal
      if (group.proposal_id) {
        proposal = await proposalRepository.findProposalById(group.proposal_id);
      }

      // Cek apakah group memiliki Skripsi
      if (group.skripsi_id) {
        skripsi = await skripsiRepository.findSkripsiById(group.skripsi_id);
      }

      // Kumpulkan data yang diperlukan dari setiap entitas
      const data = {
        group_id: group.id,
        title: group.title,
        is_approve: submission.is_approve,
        is_pass_proposal: proposal ? proposal.is_pass : null,
        is_pass_skripsi: skripsi ? skripsi.is_pass : null,
      };

      result.push(data);
    }
  }
  return result;

  // const student_group = await groupRepository.findSubmissionList(userId);
  // if (!student_group) {
  //   throw {
  //     status: 400,
  //     message: `Not found`,
  //   };
  // }
  // return student_group;
};

//===================================================================
// @description     Get details submission by id
// @route           GET /group_student/submission_details/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN
const getSubmissionDetailsById = async (id) => {
  // check group
  const group = await groupRepository.findGroupById(id);
  // get all student in group_student by group_id
  const studentIds = await groupStudentRepository.findGroupStudentByGroupId(
    group.id
  );

  // Get submission data for the student
  const submission = await submissionRepository.findSubmissionById(
    group.submission_id
  );
  // Inisialisasi variabel untuk Proposal dan Skripsi
  let proposal = null;
  let skripsi = null;

  // Cek apakah group memiliki Proposal
  if (group.proposal_id) {
    proposal = await proposalRepository.findProposalById(group.proposal_id);
  }

  // Cek apakah group memiliki Skripsi
  if (group.skripsi_id) {
    skripsi = await skripsiRepository.findSkripsiById(group.skripsi_id);
  }

  //check status siap sidang proposal
  let proposalDocumentStatus = false;
  let proposalPaymentStatus = false;
  let proposalPlagiarismStatus = false;

  let panelistChairman = false;
  let panelistMember = false;
  let advisor = false;
  if (proposal) {
    if (proposal.file_name_proposal) {
      proposalDocumentStatus = true;
    }
    if (proposal.file_name_payment) {
      proposalPaymentStatus = true;
    }
    if (proposal.file_name_plagiarismcheck) {
      proposalPlagiarismStatus = true;
    }

    // get panelist chairman in employee
    panelistChairman = await employeeRepository.findEmployeeById(
      proposal.panelist_chairman_id
    );
    // get panelist member in employee
    panelistMember = await employeeRepository.findEmployeeById(
      proposal.panelist_member_id
    );
    // get advisor in employee
    advisor = await employeeRepository.findEmployeeById(proposal.advisor_id);
  }

  //check status siap sidang skripsi
  let skripsiDocumentStatus = false;
  let skripsiPaymentStatus = false;
  let skripsiPlagiarismStatus = false;
  if (skripsi) {
    if (skripsi.file_name_skripsi) {
      skripsiDocumentStatus = true;
    }
    if (skripsi.file_name_payment) {
      skripsiPaymentStatus = true;
    }
    if (skripsi.file_name_plagiarismcheck) {
      skripsiPlagiarismStatus = true;
    }
  }

  const chairmanFullname = `${panelistChairman.firstName} ${
    panelistChairman.lastName || ""
  }`;

  const memberFullname = `${panelistMember.firstName} ${
    panelistMember.lastName || ""
  }`;

  const advisorFullname = `${advisor.firstName} ${advisor.lastName || ""}`;

  // data beranda submission
  const submissionData = {
    group_id: group.id,
    progress: group.progress,
    title: group.title,
    students: [],
    submission_status: {
      status: submission.is_approve,
    },
  };
  // data beranda proposal
  const proposalData = {
    group_id: group.id,
    progress: group.progress,
    title: group.title,
    students: [],
    proposal_status: {
      advisor_status: proposal ? proposal.is_proposal_approve_by_advisor : null,
      co_advisor1_status: proposal
        ? proposal.is_proposal_approve_by_co_advisor1
        : null,
      co_advisor2_status: proposal
        ? proposal.is_proposal_approve_by_co_advisor2
        : null,
    },
    ready_status: {
      proposalDocumentStatus,
      proposalPaymentStatus,
      proposalPlagiarismStatus,
    },
    panelist_team: {
      panelist_chairman: chairmanFullname,
      panelist_member: memberFullname,
      advisor: advisorFullname,
    },
    schedule: {
      start: proposal ? proposal.start_defence : null,
      end: proposal ? proposal.end_defence : null,
      date: proposal ? proposal.defence_date : null,
      room: proposal ? proposal.defence_room : null,
    },
    defence_status: {
      status: proposal ? proposal.is_pass : null,
    },
    revisi_status: {
      chairman_status: proposal
        ? proposal.is_revision_approve_by_panelist_chairman
        : null,
      member_status: proposal
        ? proposal.is_revision_approve_by_panelist_member
        : null,
      advisor_status: proposal ? proposal.is_revision_approve_by_advisor : null,
    },
  };
  // data beranda skripsi
  const skripsiData = {
    group_id: group.id,
    progress: group.progress,
    title: group.title,
    students: [],
    skripsi_status: {
      advisor_status: skripsi ? skripsi.is_skripsi_approve_by_advisor : null,
      co_advisor1_status: skripsi
        ? skripsi.is_skripsi_approve_by_co_advisor1
        : null,
      co_advisor2_status: skripsi
        ? skripsi.is_skripsi_approve_by_co_advisor2
        : null,
    },
    ready_status: {
      skripsiDocumentStatus,
      skripsiPaymentStatus,
      skripsiPlagiarismStatus,
    },
    panelist_team: {
      panelist_chairman: chairmanFullname,
      panelist_member: memberFullname,
      advisor: advisorFullname,
    },
    schedule: {
      start: skripsi ? skripsi.start_defence : null,
      end: skripsi ? skripsi.end_defence : null,
      date: skripsi ? skripsi.defence_date : null,
      room: skripsi ? skripsi.defence_room : null,
    },
    defence_status: {
      status: skripsi ? skripsi.is_pass : null,
    },
    revisi_status: {
      chairman_status: skripsi
        ? skripsi.is_revision_approve_by_panelist_chairman
        : null,
      member_status: skripsi
        ? skripsi.is_revision_approve_by_panelist_member
        : null,
      advisor_status: skripsi ? skripsi.is_revision_approve_by_advisor : null,
    },
  };

  // Loop through studentIds and fetch student data
  for (const studentId of studentIds) {
    // get student
    console.log("student:", studentId);
    const student = await studentRepository.findStudentById(studentId);

    // Add student data
    if (submission) {
      submissionData.students.push({
        fullName: `${student.firstName} ${student.lastName || ""}`,
        nim: student.nim,
        major: student.major,
      });
    }
    if (proposal) {
      proposalData.students.push({
        fullName: `${student.firstName} ${student.lastName || ""}`,
        nim: student.nim,
        major: student.major,
      });
    }
    if (skripsi) {
      skripsiData.students.push({
        fullName: `${student.firstName} ${student.lastName || ""}`,
        nim: student.nim,
        major: student.major,
      });
    }
  }

  if (group.progress === "Submission") {
    return submissionData;
  } else if (group.progress === "Proposal") {
    return proposalData;
  } else if (group.progress === "Skripsi" || group.progress === "Finished") {
    return skripsiData;
  }
};

//===================================================================
// @description     Get classroom proposal list
// @route           GET /group/classroom_list
// @access          MAHASISWA
const getClassroomList = async (userId) => {
  // get classroom of proposal_student
  const proposalStudents =
    await proposalStudentRepository.findAllProposalStudentByStudentId(userId);
  if (!proposalStudents) {
    return proposalStudents;
  }

  const result = [];
  for (const entry of proposalStudents) {
    // get classroom
    const classroom = await classroomRepository.findClassroomById(
      entry.classroom_id
    );
    // get dosen mk
    const employee = await employeeRepository.findEmployeeById(
      classroom.dosen_mk_id
    );
    let name = employee.firstName;

    // Tambahkan lastName jika ada
    if (employee.lastName) {
      name += ` ${employee.lastName}`;
    }

    if (classroom.name === "Proposal") {
      const classroomData = {
        id: classroom.id,
        classroom: `${classroom.name} Semester ${classroom.academic.semester} ${classroom.academic.year} - ${name}`,
      };
      result.push(classroomData);
    }
  }
  return result;
};

//===================================================================
// @description     Get all student in the same proposal classroom
// @route           GET /group/classroom/students/:id
// @access          MAHASISWA
const getStudentListByClassroomId = async (id, userId) => {
  // check classroom
  const classroom = await classroomRepository.findClassroomById(id);
  if (!classroom) {
    return classroom;
  }
  // get all proposal student by classroom_id
  const proposalStudent =
    await proposalStudentRepository.findProposalStudentByClassroomId(id);

  const submissions = await submissionRepository.findAllSubmissionByClassroomId(
    id
  );
  const otherTeamPartners = [];
  for (const entry of submissions) {
    const group = await groupRepository.findGroupBySubmissionId(entry.id);
    const groupStudents =
      await groupStudentRepository.findGroupStudentByGroupId(group.id);
    for (const entry of groupStudents) {
      otherTeamPartners.push({ student_id: entry.student_id });
    }
  }

  const studentData = [];
  for (const entry of proposalStudent) {
    // get student
    const student = await studentRepository.findStudentById(entry.student_id);

    // Check if the student is not in otherTeamPartners
    const isNotInOtherTeamPartners = !otherTeamPartners.some(
      (partner) => partner.student_id === entry.student_id
    );

    const isNotUserId = entry.student_id !== userId;

    if (isNotInOtherTeamPartners && isNotUserId) {
      // concatenate name
      const fullName = `${student.firstName} ${student.lastName || ""}`;
      const data = {
        id: student.id,
        fullName,
      };
      studentData.push(data);
    }
  }

  return studentData;
};

//===================================================================
// @description     Get dosen list
// @route           GET /group/dosen-list
// @access          MAHASISWA
const getDosenList = async () => {
  // Get all dosen
  const userDosen = await userManagementRepository.findAllUserByRole("DOSEN");

  const dosenList = [];
  for (const entry of userDosen) {
    // Get employee
    const employee = await employeeRepository.findEmployeeByNIK(entry.userId);
    let name = employee.firstName;

    // Tambahkan lastName jika ada
    if (employee.lastName) {
      name += ` ${employee.lastName}`;
    }

    // Tambahkan degree jika tidak null
    if (employee.degree) {
      name += `, ${employee.degree}`;
    }

    const data = {
      id: employee.id,
      name,
    };
    dosenList.push(data);
  }
  return dosenList;
};

//===================================================================
// @description     Get advisor team by id
// @route           GET /group/advisor-group/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getAdvisorTeamById = async (id) => {
  const group = await groupRepository.findGroupById(id);

  let advisorName = null;
  let coAdvisor1Name = null;
  let coAdvisor2Name = null;
  if (group.proposal_id) {
    const proposal = await proposalRepository.findProposalById(
      group.proposal_id
    );
    async function getEmployeeNameAndDegree(employeeId) {
      const employee = await employeeRepository.findEmployeeById(employeeId);
      let name = employee.firstName;

      if (employee.lastName) {
        name += ` ${employee.lastName}`;
      }

      if (employee.degree) {
        name += `, ${employee.degree}`;
      }

      return name;
    }

    if (proposal.advisor_id) {
      advisorName = await getEmployeeNameAndDegree(proposal.advisor_id);
    }
    if (proposal.co_advisor1_id) {
      coAdvisor1Name = await getEmployeeNameAndDegree(proposal.co_advisor1_id);
    }
    if (proposal.co_advisor2_id) {
      coAdvisor2Name = await getEmployeeNameAndDegree(proposal.co_advisor2_id);
    }
  }

  const advisorTeamData = {
    progress: group.progress,
    submission_id: group.submission_id || null,
    proposal_id: group.proposal_id || null,
    skripsi_id: group.skripsi_id || null,
    advisor: advisorName,
    co_advisor1: coAdvisor1Name,
    co_advisor2: coAdvisor2Name,
  };

  return advisorTeamData;
};

//===================================================================
// @description     Get thesis history by id
// @route           GET /group/thesis_history/:id
// @access          All
const getAllThesisHistoryById = async (id) => {
  let groupHistory = [];
  const thesisHistory =
    await thesisHistoryRepository.findAllhesisHistoryByGroupId(id);

  if (thesisHistory);

  for (const history of thesisHistory) {
    const dosen = await employeeRepository.findEmployeeById(history.user_id);
    const student = await studentRepository.findStudentById(history.user_id);
    const formattedDate = moment(history.date)
      .tz("Asia/Makassar")
      .format("DD-MM-YYYY HH:mm:ss");

    if (dosen) {
      let name = dosen.firstName;
      if (dosen.lastName) {
        name += ` ${dosen.lastName}`;
      }
      const data = {
        id: history.id,
        description: history.description,
        user: name,
        date: formattedDate,
      };
      groupHistory.push(data);
    } else {
      let name = student.firstName;
      if (student.lastName) {
        name += ` ${student.lastName}`;
      }
      const data = {
        id: history.id,
        description: history.description,
        user: name,
        date: formattedDate,
      };
      groupHistory.push(data);
    }
  }
  return groupHistory;
};

//===================================================================
// @description     Get committee list
// @route           GET /group/committee-list
// @access          DOSEN
const getCommitteeList = async () => {
  const submissions = await submissionRepository.findAllSubmissionByIsApproveId(
    "Waiting"
  );
  const submissionBySemester = {};
  // looping to get all submission
  for (const entry of submissions) {
    const group = await groupRepository.findGroupBySubmissionId(entry.id);
    const groupStudents =
      await groupStudentRepository.findGroupStudentByGroupId(group.id);

    async function getEmployeeNameAndDegree(employeeId) {
      const employee = await employeeRepository.findEmployeeById(employeeId);
      let name = employee.firstName;

      if (employee.lastName) {
        name += ` ${employee.lastName}`;
      }

      if (employee.degree) {
        name += `, ${employee.degree}`;
      }

      return name;
    }

    let advisorName = null;
    let coAdvisor1Name = null;
    let coAdvisor2Name = null;
    if (entry.proposed_advisor_id) {
      advisorName = await getEmployeeNameAndDegree(entry.proposed_advisor_id);
    }
    if (entry.proposed_co_advisor1_id) {
      coAdvisor1Name = await getEmployeeNameAndDegree(
        entry.proposed_co_advisor1_id
      );
    }
    if (entry.proposed_co_advisor2_id) {
      coAdvisor2Name = await getEmployeeNameAndDegree(
        entry.proposed_co_advisor2_id
      );
    }

    // get student all student data
    const students = await Promise.all(
      groupStudents.map(async (student_id) => {
        // get student in table student by student_id
        const student = await studentRepository.findStudentById(student_id);

        // Menggabungkan firstName dan lastName menjadi fullName
        let fullName = student.firstName;
        if (student.lastName) {
          fullName += ` ${student.lastName}`;
        }
        return {
          id: student.id,
          fullName: fullName,
        };
      })
    );
    const submissionData = {
      group_id: group.id,
      submission_id: entry.id,
      students,
      title: group.title,
      proposed_advisor: advisorName,
      proposed_co_advisor1: coAdvisor1Name,
      proposed_co_advisor2: coAdvisor2Name,
      is_consultation: entry.is_consultation,
      is_approve: entry.is_approve,
    };
    const classroom = await classroomRepository.findClassroomById(
      entry.classroom_id
    );
    // Create a semester key based on the Academic_Calendar data
    const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;
    if (!submissionBySemester[semesterKey]) {
      submissionBySemester[semesterKey] = {
        semester: semesterKey,
        submissions: [],
      };
    }

    submissionBySemester[semesterKey].submissions.push(submissionData);
  }
  // Convert the submissionBySemester object into an array of semesters
  const submissionList = Object.values(submissionBySemester);
  return submissionList;
};

//===================================================================
// @description     Get submission list dosen mk
// @route           GET /group/submission-list-mk
// @access          DOSEN_MK
const getSubmissionListMK = async (userId) => {
  const submissionBySemester = {};
  // get all proposal classroom
  const classrooms = await classroomRepository.findClassroomsByDosenMkAndName(
    userId,
    "Proposal"
  );
  if (!classrooms) {
    return submissionBySemester;
  }
  for (const classroom of classrooms) {
    const submissions =
      await submissionRepository.findAllSubmissionByClassroomId(classroom.id);
    if (submissions) {
      for (const entry of submissions) {
        const group = await groupRepository.findGroupBySubmissionId(entry.id);
        const groupStudents =
          await groupStudentRepository.findGroupStudentByGroupId(group.id);

        const getEmployeeNameAndDegree = async (employeeId) => {
          const employee = await employeeRepository.findEmployeeById(
            employeeId
          );
          let name = employee.firstName;

          if (employee.lastName) {
            name += ` ${employee.lastName}`;
          }

          if (employee.degree) {
            name += `, ${employee.degree}`;
          }

          return name;
        };

        let advisorName = null;
        let coAdvisor1Name = null;
        let coAdvisor2Name = null;

        if (entry.proposed_advisor_id) {
          advisorName = await getEmployeeNameAndDegree(
            entry.proposed_advisor_id
          );
        }
        if (entry.proposed_co_advisor1_id) {
          coAdvisor1Name = await getEmployeeNameAndDegree(
            entry.proposed_co_advisor1_id
          );
        }
        if (entry.proposed_co_advisor2_id) {
          coAdvisor2Name = await getEmployeeNameAndDegree(
            entry.proposed_co_advisor2_id
          );
        }

        const students = await Promise.all(
          groupStudents.map(async (student_id) => {
            const student = await studentRepository.findStudentById(student_id);
            let fullName = student.firstName;

            if (student.lastName) {
              fullName += ` ${student.lastName}`;
            }

            return {
              id: student.id,
              fullName: fullName,
            };
          })
        );

        const submissionData = {
          group_id: group.id,
          submission_id: entry.id,
          students,
          title: group.title,
          proposed_advisor: advisorName,
          proposed_co_advisor1: coAdvisor1Name,
          proposed_co_advisor2: coAdvisor2Name,
          is_consultation: entry.is_consultation,
          is_approve: entry.is_approve,
        };

        // Create a semester key based on the Academic_Calendar data
        const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

        if (!submissionBySemester[semesterKey]) {
          submissionBySemester[semesterKey] = {
            semester: semesterKey,
            submissions: [],
          };
        }

        submissionBySemester[semesterKey].submissions.push(submissionData);
      }
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const submissionList = Object.values(submissionBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_submitted: 0,
    has_submitted: 0,
    approved: 0,
    rejected: 0,
  };

  for (const semesterKey in submissionBySemester) {
    const semesterData = submissionBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const submission of semesterData?.submissions ?? []) {
      if (submission) {
        dashboard.total_group++; // Increment total_group count

        if (submission.title === null) {
          dashboard.not_submitted++; // Increment not_submitted count
        } else {
          dashboard.has_submitted++; // Increment has_submitted count
        }

        if (submission.is_approve === "Approve") {
          dashboard.approved++; // Increment approved count
        } else if (submission.is_approve === "Rejected") {
          dashboard.rejected++; // Increment rejected count
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: submissionList,
  };

  return result;
};

//===================================================================
// @description     Get submission list kaprodi
// @route           GET /group/submission-list-kaprodi
// @access          KAPRODI
const getSubmissionListKaprodi = async (userId) => {
  // check user if dosen mk
  const kaprodi = await employeeRepository.findEmployeeById(userId);
  const userKaprodi = await userManagementRepository.findUserByNIKAndRole(
    kaprodi.nik,
    "KAPRODI"
  );
  const submissionBySemester = {};

  if (userKaprodi && kaprodi.major === "IF") {
    // get all submission
    const submissions = await submissionRepository.findAllSubmission();
    if (submissions) {
      for (const submission of submissions) {
        if (submission.classroom_id) {
          // get group
          const group = await groupRepository.findGroupBySubmissionId(
            submission.id
          );
          // get all student in group
          const groupStudents =
            await groupStudentRepository.findGroupStudentByGroupId(group.id);
          // variable to check if thesis is in Informatika
          let isInformatika = null;

          // looping to check if thesis is in Informatika
          for (const studentId of groupStudents) {
            // get student data
            const student = await studentRepository.findStudentById(studentId);
            if (student.major === "IF") {
              isInformatika = true;
              break; // Menghentikan loop jika ditemukan student dengan major === "IF"
            }
          }

          if (isInformatika) {
            async function getEmployeeNameAndDegree(employeeId) {
              const employee = await employeeRepository.findEmployeeById(
                employeeId
              );
              let name = employee.firstName;

              if (employee.lastName) {
                name += ` ${employee.lastName}`;
              }

              if (employee.degree) {
                name += `, ${employee.degree}`;
              }

              return name;
            }

            let advisorName = null;
            let coAdvisor1Name = null;
            let coAdvisor2Name = null;
            if (submission.proposed_advisor_id) {
              advisorName = await getEmployeeNameAndDegree(
                submission.proposed_advisor_id
              );
            }
            if (submission.proposed_co_advisor1_id) {
              coAdvisor1Name = await getEmployeeNameAndDegree(
                submission.proposed_co_advisor1_id
              );
            }
            if (submission.proposed_co_advisor2_id) {
              coAdvisor2Name = await getEmployeeNameAndDegree(
                submission.proposed_co_advisor2_id
              );
            }

            const students = await Promise.all(
              groupStudents.map(async (student_id) => {
                const student = await studentRepository.findStudentById(
                  student_id
                );
                let fullName = student.firstName;

                if (student.lastName) {
                  fullName += ` ${student.lastName}`;
                }

                return {
                  id: student.id,
                  fullName: fullName,
                };
              })
            );

            const submissionData = {
              group_id: group.id,
              submission_id: submission.id,
              students,
              title: group.title,
              proposed_advisor: advisorName,
              proposed_co_advisor1: coAdvisor1Name,
              proposed_co_advisor2: coAdvisor2Name,
              is_consultation: submission.is_consultation,
              is_approve: submission.is_approve,
            };
            // get classroom
            const classroom = await classroomRepository.findClassroomById(
              submission.classroom_id
            );
            // Create a semester key based on the Academic_Calendar data
            const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

            if (!submissionBySemester[semesterKey]) {
              submissionBySemester[semesterKey] = {
                semester: semesterKey,
                submissions: [],
              };
            }

            submissionBySemester[semesterKey].submissions.push(submissionData);
          }
        }
      }
    }
  }
  if (userKaprodi && kaprodi.major === "SI") {
    // get all submission
    const submissions = await submissionRepository.findAllSubmission();
    if (submissions) {
      for (const submission of submissions) {
        if (submission.classroom_id) {
          // get group
          const group = await groupRepository.findGroupBySubmissionId(
            submission.id
          );
          // get all student in group
          const groupStudents =
            await groupStudentRepository.findGroupStudentByGroupId(group.id);
          // variable to check if thesis is in Informatika
          let isSistemInformasi = null;

          // looping to check if thesis is in Informatika
          for (const studentId of groupStudents) {
            // get student data
            const student = await studentRepository.findStudentById(studentId);
            if (student.major === "SI") {
              isSistemInformasi = true;
              break; // Menghentikan loop jika ditemukan student dengan major === "IF"
            }
          }

          if (isSistemInformasi) {
            async function getEmployeeNameAndDegree(employeeId) {
              const employee = await employeeRepository.findEmployeeById(
                employeeId
              );
              let name = employee.firstName;

              if (employee.lastName) {
                name += ` ${employee.lastName}`;
              }

              if (employee.degree) {
                name += `, ${employee.degree}`;
              }

              return name;
            }

            let advisorName = null;
            let coAdvisor1Name = null;
            let coAdvisor2Name = null;
            if (submission.proposed_advisor_id) {
              advisorName = await getEmployeeNameAndDegree(
                submission.proposed_advisor_id
              );
            }
            if (submission.proposed_co_advisor1_id) {
              coAdvisor1Name = await getEmployeeNameAndDegree(
                submission.proposed_co_advisor1_id
              );
            }
            if (submission.proposed_co_advisor2_id) {
              coAdvisor2Name = await getEmployeeNameAndDegree(
                submission.proposed_co_advisor2_id
              );
            }

            const students = await Promise.all(
              groupStudents.map(async (student_id) => {
                const student = await studentRepository.findStudentById(
                  student_id
                );
                let fullName = student.firstName;

                if (student.lastName) {
                  fullName += ` ${student.lastName}`;
                }

                return {
                  id: student.id,
                  fullName: fullName,
                };
              })
            );

            const submissionData = {
              group_id: group.id,
              submission_id: submission.id,
              students,
              title: group.title,
              proposed_advisor: advisorName,
              proposed_co_advisor1: coAdvisor1Name,
              proposed_co_advisor2: coAdvisor2Name,
              is_consultation: submission.is_consultation,
              is_approve: submission.is_approve,
            };
            // get classroom
            const classroom = await classroomRepository.findClassroomById(
              submission.classroom_id
            );
            // Create a semester key based on the Academic_Calendar data
            const semesterKey = `${classroom.academic.year}-${classroom.academic.semester} (${classroom.name})`;

            if (!submissionBySemester[semesterKey]) {
              submissionBySemester[semesterKey] = {
                semester: semesterKey,
                submissions: [],
              };
            }

            submissionBySemester[semesterKey].submissions.push(submissionData);
          }
        }
      }
    }
  }

  // Convert the submissionBySemester object into an array of semesters
  const submissionList = Object.values(submissionBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_submitted: 0,
    has_submitted: 0,
    approved: 0,
    rejected: 0,
  };

  for (const semesterKey in submissionBySemester) {
    const semesterData = submissionBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const submission of semesterData?.submissions ?? []) {
      if (submission) {
        dashboard.total_group++; // Increment total_group count

        if (submission.title === null) {
          dashboard.not_submitted++; // Increment not_submitted count
        } else {
          dashboard.has_submitted++; // Increment has_submitted count
        }

        if (submission.is_approve === "Approve") {
          dashboard.approved++; // Increment approved count
        } else if (submission.is_approve === "Rejected") {
          dashboard.rejected++; // Increment rejected count
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: submissionList,
  };

  return result;
};

//===================================================================
// @description     Get submission list dekan
// @route           GET /group/submission-list-dekan
// @access          DEKAN
const getSubmissionListDekan = async (userId) => {
  const dekan = await employeeRepository.findEmployeeById(userId);
  const userDekan = await userManagementRepository.findUserByNIKAndRole(
    dekan.nik,
    "DEKAN"
  );

  const submissionBySemester = {};

  if (userDekan) {
    const submissions = await submissionRepository.findAllSubmission();
    if (!submissions) {
      return submissionBySemester;
    }

    for (const entry of submissions) {
      // get classroom
      const classroom = await classroomRepository.findClassroomById(
        entry.classroom_id
      );
      const group = await groupRepository.findGroupBySubmissionId(entry.id);
      const groupStudents =
        await groupStudentRepository.findGroupStudentByGroupId(group.id);

      const getEmployeeNameAndDegree = async (employeeId) => {
        const employee = await employeeRepository.findEmployeeById(employeeId);
        let name = employee.firstName;

        if (employee.lastName) {
          name += ` ${employee.lastName}`;
        }

        if (employee.degree) {
          name += `, ${employee.degree}`;
        }

        return name;
      };

      let advisorName = null;
      let coAdvisor1Name = null;
      let coAdvisor2Name = null;

      if (entry.proposed_advisor_id) {
        advisorName = await getEmployeeNameAndDegree(entry.proposed_advisor_id);
      }
      if (entry.proposed_co_advisor1_id) {
        coAdvisor1Name = await getEmployeeNameAndDegree(
          entry.proposed_co_advisor1_id
        );
      }
      if (entry.proposed_co_advisor2_id) {
        coAdvisor2Name = await getEmployeeNameAndDegree(
          entry.proposed_co_advisor2_id
        );
      }

      const students = await Promise.all(
        groupStudents.map(async (student_id) => {
          const student = await studentRepository.findStudentById(student_id);
          let fullName = student.firstName;

          if (student.lastName) {
            fullName += ` ${student.lastName}`;
          }

          return {
            id: student.id,
            fullName: fullName,
          };
        })
      );

      const submissionData = {
        group_id: group.id,
        submission_id: entry.id,
        students,
        title: group.title,
        proposed_advisor: advisorName,
        proposed_co_advisor1: coAdvisor1Name,
        proposed_co_advisor2: coAdvisor2Name,
        is_consultation: entry.is_consultation,
        is_approve: entry.is_approve,
      };
      // Create a semester key based on the Academic_Calendar data
      const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

      if (!submissionBySemester[semesterKey]) {
        submissionBySemester[semesterKey] = {
          semester: semesterKey,
          submissions: [],
        };
      }

      submissionBySemester[semesterKey].submissions.push(submissionData);
    }
  }

  // Convert the submissionBySemester object into an array of semesters
  const submissionList = Object.values(submissionBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_submitted: 0,
    has_submitted: 0,
    approved: 0,
    rejected: 0,
  };

  for (const semesterKey in submissionBySemester) {
    const semesterData = submissionBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const submission of semesterData?.submissions ?? []) {
      if (submission) {
        dashboard.total_group++; // Increment total_group count

        if (submission.title === null) {
          dashboard.not_submitted++; // Increment not_submitted count
        } else {
          dashboard.has_submitted++; // Increment has_submitted count
        }

        if (submission.is_approve === "Approve") {
          dashboard.approved++; // Increment approved count
        } else if (submission.is_approve === "Rejected") {
          dashboard.rejected++; // Increment rejected count
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: submissionList,
  };

  return result;
};

//===================================================================
// @description     Get proposal list advisor
// @route           GET /group/proposal-list-advisor
// @access          DOSEN
const getProposalListAdvisor = async (userId) => {
  const proposalBySemester = {};

  // check user if advisor / get all proposal
  const advisor = await proposalRepository.findAllProposalByAdvisorId(userId);
  if (!advisor) {
    return proposalBySemester;
  }

  for (const entry of advisor) {
    if (entry.classroom_id) {
      // get classroom
      const classroom = await classroomRepository.findClassroomById(
        entry.classroom_id
      );
      const group = await groupRepository.findGroupByProposalId(entry.id);
      const groupStudents =
        await groupStudentRepository.findGroupStudentByGroupId(group.id);

      const students = await Promise.all(
        groupStudents.map(async (student_id) => {
          const student = await studentRepository.findStudentById(student_id);
          let fullName = student.firstName;

          if (student.lastName) {
            fullName += ` ${student.lastName}`;
          }

          return {
            id: student.id,
            fullName: fullName,
          };
        })
      );

      // variable to know if group has submit proposal
      let uploaded = false;
      if (entry.file_path_proposal) {
        uploaded = true;
      }
      const proposalData = {
        group_id: group.id,
        proposal_id: entry.id,
        students,
        uploaded,
        title: group.title,
        approve_by_advisor: entry.is_proposal_approve_by_advisor,
        approve_by_co_advisor1: entry.is_proposal_approve_by_co_advisor1,
        approve_by_co_advisor2: entry.is_proposal_approve_by_co_advisor2,
      };

      // Create a semester key based on the Academic_Calendar data
      const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

      if (!proposalBySemester[semesterKey]) {
        proposalBySemester[semesterKey] = {
          semester: semesterKey,
          proposals: [],
        };
      }

      proposalBySemester[semesterKey].proposals.push(proposalData);
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const proposalList = Object.values(proposalBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_submitted: 0,
    has_submitted: 0,
    approved: 0,
    rejected: 0,
  };

  for (const semesterKey in proposalBySemester) {
    const semesterData = proposalBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const proposal of semesterData?.proposals ?? []) {
      if (proposal) {
        dashboard.total_group++; // Increment total_group count

        if (proposal.uploaded === false) {
          dashboard.not_submitted++; // Increment not_submitted count
        } else {
          dashboard.has_submitted++; // Increment has_submitted count
        }

        if (
          proposal.is_proposal_approve_by_advisor === "Approve" &&
          proposal.is_proposal_approve_by_co_advisor1 === "Approve" &&
          proposal.is_proposal_approve_by_co_advisor2 === "Approve"
        ) {
          dashboard.approved++; // Increment approved count
        } else if (
          proposal.is_proposal_approve_by_advisor === "Rejected" &&
          proposal.is_proposal_approve_by_co_advisor1 === "Rejected" &&
          proposal.is_proposal_approve_by_co_advisor2 === "Rejected"
        ) {
          dashboard.rejected++; // Increment rejected count
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: proposalList,
  };

  return result;
};

//===================================================================
// @description     Get skripsi list advisor
// @route           GET /group/skripsi-list-advisor
// @access          DOSEN
const getSkripsiListAdvisor = async (userId) => {
  const skripsiBySemester = {};

  // check user if advisor / get all proposal
  const advisor = await skripsiRepository.findAllSkripsiByAdvisorId(userId);
  if (!advisor) {
    return skripsiBySemester;
  }

  for (const entry of advisor) {
    if (entry.classroom_id) {
      // get classroom
      const classroom = await classroomRepository.findClassroomById(
        entry.classroom_id
      );
      const group = await groupRepository.findGroupBySkripsiId(entry.id);
      const groupStudents =
        await groupStudentRepository.findGroupStudentByGroupId(group.id);

      const students = await Promise.all(
        groupStudents.map(async (student_id) => {
          const student = await studentRepository.findStudentById(student_id);
          let fullName = student.firstName;

          if (student.lastName) {
            fullName += ` ${student.lastName}`;
          }

          return {
            id: student.id,
            fullName: fullName,
          };
        })
      );

      // variable to know if group has submit proposal
      let uploaded = false;
      if (entry.file_path_skripsi) {
        uploaded = true;
      }
      const skripsiData = {
        group_id: group.id,
        skripsi_id: entry.id,
        students,
        uploaded,
        title: group.title,
        approve_by_advisor: entry.is_skripsi_approve_by_advisor,
        approve_by_co_advisor1: entry.is_skripsi_approve_by_co_advisor1,
        approve_by_co_advisor2: entry.is_skripsi_approve_by_co_advisor2,
      };

      // Create a semester key based on the Academic_Calendar data
      const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

      if (!skripsiBySemester[semesterKey]) {
        skripsiBySemester[semesterKey] = {
          semester: semesterKey,
          skripsis: [],
        };
      }

      skripsiBySemester[semesterKey].skripsis.push(skripsiData);
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const skripsiList = Object.values(skripsiBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_submitted: 0,
    has_submitted: 0,
    approved: 0,
    rejected: 0,
  };

  for (const semesterKey in skripsiBySemester) {
    const semesterData = skripsiBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const skripsi of semesterData?.skripsis ?? []) {
      if (skripsi) {
        dashboard.total_group++; // Increment total_group count

        if (skripsi.uploaded === false) {
          dashboard.not_submitted++; // Increment not_submitted count
        } else {
          dashboard.has_submitted++; // Increment has_submitted count
        }

        if (
          skripsi.is_skripsi_approve_by_advisor === "Approve" &&
          skripsi.is_skripsi_approve_by_co_advisor1 === "Approve" &&
          skripsi.is_skripsi_approve_by_co_advisor2 === "Approve"
        ) {
          dashboard.approved++; // Increment approved count
        } else if (
          skripsi.is_skripsi_approve_by_advisor === "Rejected" &&
          skripsi.is_skripsi_approve_by_co_advisor1 === "Rejected" &&
          skripsi.is_skripsi_approve_by_co_advisor2 === "Rejected"
        ) {
          dashboard.rejected++; // Increment rejected count
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: skripsiList,
  };

  return result;
};

//===================================================================
// @description     Get history list advisor
// @route           GET /group/history-list-advisor
// @access          DOSEN
const getHistoryListAdvisor = async (userId) => {
  const historyData = {};

  // get all advisor skripsi
  const skripsis = await skripsiRepository.findAllSkripsiByAdvisorId(userId);
  // console.log("Data skripsi: ", skripsis);

  // check if found proposal
  if (skripsis) {
    for (const entry of skripsis) {
      // get group
      const group = await groupRepository.findGroupBySkripsiId(entry.id);

      // check if progress is FINISH
      if (group.progress === "Finished") {
        // get student data
        const groupStudents =
          await groupStudentRepository.findGroupStudentByGroupId(group.id);
        const students = await Promise.all(
          groupStudents.map(async (student_id) => {
            const student = await studentRepository.findStudentById(student_id);
            let fullName = student.firstName;

            if (student.lastName) {
              fullName += ` ${student.lastName}`;
            }

            return {
              id: student.id,
              fullName: fullName,
            };
          })
        );

        const data = {
          group_id: group.id,
          students,
          title: group.title,
          approve_date: entry.approve_date,
        };
        // get classroom
        const classroom = await classroomRepository.findClassroomById(
          entry.classroom_id
        );
        // Create a semester key based on the Academic_Calendar data
        const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

        if (!historyData[semesterKey]) {
          historyData[semesterKey] = {
            semester: semesterKey,
            skripsis: [],
          };
        }
        historyData[semesterKey].skripsis.push(data);
        // console.log("Data riwayat: ", historyData);
      }
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const historyList = Object.values(historyData);
  return historyList;
};

//===================================================================
// @description     Get proposal list co-advisor
// @route           GET /group/proposal-list-co-advisor
// @access          DOSEN
const getProposalListCoAdvisor = async (userId) => {
  // check user if advisor / get all proposal
  const coAdvisor = await proposalRepository.findAllProposalByCoAdvisorId(
    userId
  );

  const proposalBySemester = {};

  for (const entry of coAdvisor) {
    if (entry.classroom_id) {
      // get classroom
      const classroom = await classroomRepository.findClassroomById(
        entry.classroom_id
      );
      const group = await groupRepository.findGroupByProposalId(entry.id);
      const groupStudents =
        await groupStudentRepository.findGroupStudentByGroupId(group.id);

      const students = await Promise.all(
        groupStudents.map(async (student_id) => {
          const student = await studentRepository.findStudentById(student_id);
          let fullName = student.firstName;

          if (student.lastName) {
            fullName += ` ${student.lastName}`;
          }

          return {
            id: student.id,
            fullName: fullName,
          };
        })
      );

      let status_co_advisor;
      if (entry.co_advisor1_id === userId) {
        status_co_advisor = "CO_ADVISOR1";
      }
      if (entry.co_advisor2_id === userId) {
        status_co_advisor = "CO_ADVISOR2";
      }

      // variable to know if group has submit proposal
      let uploaded = false;
      if (entry.file_path_proposal) {
        uploaded = true;
      }
      const proposalData = {
        group_id: group.id,
        proposal_id: entry.id,
        status_co_advisor,
        students,
        uploaded,
        title: group.title,
        approve_by_advisor: entry.is_proposal_approve_by_advisor,
        approve_by_co_advisor1: entry.is_proposal_approve_by_co_advisor1,
        approve_by_co_advisor2: entry.is_proposal_approve_by_co_advisor2,
      };

      // Create a semester key based on the Academic_Calendar data
      const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

      if (!proposalBySemester[semesterKey]) {
        proposalBySemester[semesterKey] = {
          semester: semesterKey,
          proposals: [],
        };
      }

      proposalBySemester[semesterKey].proposals.push(proposalData);
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const proposalList = Object.values(proposalBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_submitted: 0,
    has_submitted: 0,
    approved: 0,
    rejected: 0,
  };

  for (const semesterKey in proposalBySemester) {
    const semesterData = proposalBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const proposal of semesterData?.proposals ?? []) {
      if (proposal) {
        dashboard.total_group++; // Increment total_group count

        if (proposal.uploaded === false) {
          dashboard.not_submitted++; // Increment not_submitted count
        } else {
          dashboard.has_submitted++; // Increment has_submitted count
        }

        if (
          proposal.is_proposal_approve_by_advisor === "Approve" &&
          proposal.is_proposal_approve_by_co_advisor1 === "Approve" &&
          proposal.is_proposal_approve_by_co_advisor2 === "Approve"
        ) {
          dashboard.approved++; // Increment approved count
        } else if (
          proposal.is_proposal_approve_by_advisor === "Rejected" &&
          proposal.is_proposal_approve_by_co_advisor1 === "Rejected" &&
          proposal.is_proposal_approve_by_co_advisor2 === "Rejected"
        ) {
          dashboard.rejected++; // Increment rejected count
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: proposalList,
  };

  return result;
};

//===================================================================
// @description     Get skripsi list co-advisor
// @route           GET /group/skripsi-list-co-advisor
// @access          DOSEN
const getSkripsiListCoAdvisor = async (userId) => {
  const skripsiBySemester = {};

  // check user if advisor / get all proposal
  const coadvisor = await skripsiRepository.findAllSkripsiByCoAdvisorId(userId);
  if (!coadvisor) {
    skripsiBySemester;
  }

  for (const entry of coadvisor) {
    if (entry.classroom_id) {
      // get classroom
      const classroom = await classroomRepository.findClassroomById(
        entry.classroom_id
      );
      const group = await groupRepository.findGroupBySkripsiId(entry.id);
      const groupStudents =
        await groupStudentRepository.findGroupStudentByGroupId(group.id);

      const students = await Promise.all(
        groupStudents.map(async (student_id) => {
          const student = await studentRepository.findStudentById(student_id);
          let fullName = student.firstName;

          if (student.lastName) {
            fullName += ` ${student.lastName}`;
          }

          return {
            id: student.id,
            fullName: fullName,
          };
        })
      );

      let status_co_advisor;
      if (entry.co_advisor1_id === userId) {
        status_co_advisor = "CO_ADVISOR1";
      }
      if (entry.co_advisor2_id === userId) {
        status_co_advisor = "CO_ADVISOR2";
      }

      // variable to know if group has submit proposal
      let uploaded = false;
      if (entry.file_path_skripsi) {
        uploaded = true;
      }
      const skripsiData = {
        group_id: group.id,
        skripsi_id: entry.id,
        status_co_advisor,
        students,
        uploaded,
        title: group.title,
        approve_by_advisor: entry.is_skripsi_approve_by_advisor,
        approve_by_co_advisor1: entry.is_skripsi_approve_by_co_advisor1,
        approve_by_co_advisor2: entry.is_skripsi_approve_by_co_advisor2,
      };

      // Create a semester key based on the Academic_Calendar data
      const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

      if (!skripsiBySemester[semesterKey]) {
        skripsiBySemester[semesterKey] = {
          semester: semesterKey,
          skripsis: [],
        };
      }

      skripsiBySemester[semesterKey].skripsis.push(skripsiData);
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const skripsiList = Object.values(skripsiBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_submitted: 0,
    has_submitted: 0,
    approved: 0,
    rejected: 0,
  };

  for (const semesterKey in skripsiBySemester) {
    const semesterData = skripsiBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const skripsi of semesterData?.skripsis ?? []) {
      if (skripsi) {
        dashboard.total_group++; // Increment total_group count

        if (skripsi.uploaded === false) {
          dashboard.not_submitted++; // Increment not_submitted count
        } else {
          dashboard.has_submitted++; // Increment has_submitted count
        }

        if (
          skripsi.is_skripsi_approve_by_advisor === "Approve" &&
          skripsi.is_skripsi_approve_by_co_advisor1 === "Approve" &&
          skripsi.is_skripsi_approve_by_co_advisor2 === "Approve"
        ) {
          dashboard.approved++; // Increment approved count
        } else if (
          skripsi.is_skripsi_approve_by_advisor === "Rejected" &&
          skripsi.is_skripsi_approve_by_co_advisor1 === "Rejected" &&
          skripsi.is_skripsi_approve_by_co_advisor2 === "Rejected"
        ) {
          dashboard.rejected++; // Increment rejected count
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: skripsiList,
  };

  return result;
};

//===================================================================
// @description     Get history list co-advisor
// @route           GET /group/history-list-co-advisor
// @access          DOSEN
const getHistoryListCoAdvisor = async (userId) => {
  const historyData = {};

  // get all co-advisor skripsi
  const skripsis = await skripsiRepository.findAllSkripsiByCoAdvisorId(userId);
  // console.log("Data skripsi: ", skripsis);

  // check if found proposal
  if (skripsis) {
    for (const entry of skripsis) {
      // get group
      const group = await groupRepository.findGroupBySkripsiId(entry.id);

      // check if progress is FINISH
      if (group.progress === "Finished") {
        // get student data
        const groupStudents =
          await groupStudentRepository.findGroupStudentByGroupId(group.id);
        const students = await Promise.all(
          groupStudents.map(async (student_id) => {
            const student = await studentRepository.findStudentById(student_id);
            let fullName = student.firstName;

            if (student.lastName) {
              fullName += ` ${student.lastName}`;
            }

            return {
              id: student.id,
              fullName: fullName,
            };
          })
        );
        let status_co_advisor;
        if (entry.co_advisor1_id === userId) {
          status_co_advisor = "CO_ADVISOR1";
        }
        if (entry.co_advisor2_id === userId) {
          status_co_advisor = "CO_ADVISOR2";
        }

        const data = {
          group_id: group.id,
          status_co_advisor,
          students,
          title: group.title,
          approve_date: entry.approve_date,
        };
        // get classroom
        const classroom = await classroomRepository.findClassroomById(
          entry.classroom_id
        );
        // Create a semester key based on the Academic_Calendar data
        const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

        if (!historyData[semesterKey]) {
          historyData[semesterKey] = {
            semester: semesterKey,
            skripsis: [],
          };
        }
        historyData[semesterKey].skripsis.push(data);
        // console.log("Data riwayat: ", historyData);
      }
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const historyList = Object.values(historyData);
  return historyList;
};

//===================================================================
// @description     Get proposal list chairman
// @route           GET /group/proposal-list-chairman
// @access          DOSEN
const getProposalListChairman = async (userId) => {
  const proposalBySemester = {};

  // check user if chairman / get all proposal
  const chairman = await proposalRepository.findAllProposalByChairman(userId);
  if (!chairman) {
    return proposalBySemester;
  }

  for (const entry of chairman) {
    if (entry.classroom_id) {
      // get classroom
      const classroom = await classroomRepository.findClassroomById(
        entry.classroom_id
      );

      const group = await groupRepository.findGroupByProposalId(entry.id);
      const groupStudents =
        await groupStudentRepository.findGroupStudentByGroupId(group.id);

      const students = await Promise.all(
        groupStudents.map(async (student_id) => {
          const student = await studentRepository.findStudentById(student_id);
          let fullName = student.firstName;

          if (student.lastName) {
            fullName += ` ${student.lastName}`;
          }

          return {
            id: student.id,
            fullName: fullName,
          };
        })
      );

      const proposalData = {
        group_id: group.id,
        proposal_id: entry.id,
        students,
        title: group.title,
        defence_status: entry.is_pass,
        approve_chairman: entry.is_revision_approve_by_panelist_chairman,
        approve_member: entry.is_revision_approve_by_panelist_member,
        approve_advisor: entry.is_revision_approve_by_advisor,
      };

      // Create a semester key based on the Academic_Calendar data
      const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

      if (!proposalBySemester[semesterKey]) {
        proposalBySemester[semesterKey] = {
          semester: semesterKey,
          proposals: [],
        };
      }

      proposalBySemester[semesterKey].proposals.push(proposalData);
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const proposalList = Object.values(proposalBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_defence: 0,
    has_defence: 0,
    has_revision: 0,
    not_revision: 0,
  };

  for (const semesterKey in proposalBySemester) {
    const semesterData = proposalBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const proposal of semesterData?.proposals ?? []) {
      if (proposal) {
        dashboard.total_group++; // Increment total_group count

        if (proposal.defence_status === null) {
          dashboard.not_defence++; // Increment not_defence count
        } else {
          dashboard.has_defence++; // Increment has_defence count
        }

        if (
          proposal.is_revision_approve_by_panelist_chairman === "Approve" &&
          proposal.is_revision_approve_by_panelist_member === "Approve" &&
          proposal.is_revision_approve_by_advisor === "Approve"
        ) {
          dashboard.approved++; // Increment approved count
        } else if (
          proposal.is_revision_approve_by_panelist_chairman === "Rejected" &&
          proposal.is_revision_approve_by_panelist_member === "Rejected" &&
          proposal.is_revision_approve_by_advisor === "Rejected"
        ) {
          dashboard.rejected++; // Increment rejected count
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: proposalList,
  };

  return result;
};

//===================================================================
// @description     Get skripsi list chairman
// @route           GET /group/skripsi-list-chairman
// @access          DOSEN
const getSkripsiListChairman = async (userId) => {
  // check user if chairman / get all proposal
  const chairman = await skripsiRepository.findAllSkripsiByChairman(userId);

  const skripsiBySemester = {};

  for (const entry of chairman) {
    if (entry.classroom_id) {
      // get classroom
      const classroom = await classroomRepository.findClassroomById(
        entry.classroom_id
      );

      const group = await groupRepository.findGroupBySkripsiId(entry.id);
      const groupStudents =
        await groupStudentRepository.findGroupStudentByGroupId(group.id);

      const students = await Promise.all(
        groupStudents.map(async (student_id) => {
          const student = await studentRepository.findStudentById(student_id);
          let fullName = student.firstName;

          if (student.lastName) {
            fullName += ` ${student.lastName}`;
          }

          return {
            id: student.id,
            fullName: fullName,
          };
        })
      );

      const skripsiData = {
        group_id: group.id,
        skripsi_id: entry.id,
        students,
        title: group.title,
        defence_status: entry.is_pass,
        approve_chairman: entry.is_revision_approve_by_panelist_chairman,
        approve_member: entry.is_revision_approve_by_panelist_member,
        approve_advisor: entry.is_revision_approve_by_advisor,
      };

      // Create a semester key based on the Academic_Calendar data
      const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

      if (!skripsiBySemester[semesterKey]) {
        skripsiBySemester[semesterKey] = {
          semester: semesterKey,
          skripsis: [],
        };
      }

      skripsiBySemester[semesterKey].skripsis.push(skripsiData);
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const skripsiList = Object.values(skripsiBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_defence: 0,
    has_defence: 0,
    has_revision: 0,
    not_revision: 0,
  };

  for (const semesterKey in skripsiBySemester) {
    const semesterData = skripsiBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const skripsi of semesterData?.skripsis ?? []) {
      if (skripsi) {
        dashboard.total_group++; // Increment total_group count

        if (skripsi.defence_status === null) {
          dashboard.not_defence++; // Increment not_defence count
        } else {
          dashboard.has_defence++; // Increment has_defence count
        }

        if (
          skripsi.is_revision_approve_by_panelist_chairman === "Approve" &&
          skripsi.is_revision_approve_by_panelist_member === "Approve" &&
          skripsi.is_revision_approve_by_advisor === "Approve"
        ) {
          dashboard.approved++; // Increment approved count
        } else if (
          skripsi.is_revision_approve_by_panelist_chairman === "Rejected" &&
          skripsi.is_revision_approve_by_panelist_member === "Rejected" &&
          skripsi.is_revision_approve_by_advisor === "Rejected"
        ) {
          dashboard.rejected++; // Increment rejected count
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: skripsiList,
  };

  return result;
};

//===================================================================
// @description     Get history list chairman
// @route           GET /group/history-list-chairman
// @access          DOSEN
const getHistoryListChairman = async (userId) => {
  const historyData = {};

  // get all chairman skripsi
  const skripsis = await skripsiRepository.findAllSkripsiByChairman(userId);
  // console.log("Data skripsi: ", skripsis);

  // check if found proposal
  if (skripsis) {
    for (const entry of skripsis) {
      // get group
      const group = await groupRepository.findGroupBySkripsiId(entry.id);

      // check if progress is FINISH
      if (group.progress === "Finished") {
        // get student data
        const groupStudents =
          await groupStudentRepository.findGroupStudentByGroupId(group.id);
        const students = await Promise.all(
          groupStudents.map(async (student_id) => {
            const student = await studentRepository.findStudentById(student_id);
            let fullName = student.firstName;

            if (student.lastName) {
              fullName += ` ${student.lastName}`;
            }

            return {
              id: student.id,
              fullName: fullName,
            };
          })
        );

        const data = {
          group_id: group.id,
          students,
          title: group.title,
          approve_date: entry.approve_date,
        };
        // get classroom
        const classroom = await classroomRepository.findClassroomById(
          entry.classroom_id
        );
        // Create a semester key based on the Academic_Calendar data
        const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

        if (!historyData[semesterKey]) {
          historyData[semesterKey] = {
            semester: semesterKey,
            skripsis: [],
          };
        }
        historyData[semesterKey].skripsis.push(data);
        // console.log("Data riwayat: ", historyData);
      }
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const historyList = Object.values(historyData);
  return historyList;
};

//===================================================================
// @description     Get proposal list member
// @route           GET /group/proposal-list-member
// @access          DOSEN
const getProposalListMember = async (userId) => {
  const proposalBySemester = {};

  // check user if member / get all proposal
  const member = await proposalRepository.findAllProposalByMember(userId);
  if (!member) {
    return proposalBySemester;
  }

  for (const entry of member) {
    if (entry.classroom_id) {
      // get classroom
      const classroom = await classroomRepository.findClassroomById(
        entry.classroom_id
      );

      const groupStudents =
        await groupStudentRepository.findGroupStudentByGroupId(group.id);

      const students = await Promise.all(
        groupStudents.map(async (student_id) => {
          const student = await studentRepository.findStudentById(student_id);
          let fullName = student.firstName;

          if (student.lastName) {
            fullName += ` ${student.lastName}`;
          }

          return {
            id: student.id,
            fullName: fullName,
          };
        })
      );

      const proposalData = {
        group_id: group.id,
        proposal_id: entry.id,
        students,
        title: group.title,
        defence_status: entry.is_pass,
        approve_chairman: entry.is_revision_approve_by_panelist_chairman,
        approve_member: entry.is_revision_approve_by_panelist_member,
        approve_advisor: entry.is_revision_approve_by_advisor,
      };

      // Create a semester key based on the Academic_Calendar data
      const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

      if (!proposalBySemester[semesterKey]) {
        proposalBySemester[semesterKey] = {
          semester: semesterKey,
          proposals: [],
        };
      }

      proposalBySemester[semesterKey].proposals.push(proposalData);
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const proposalList = Object.values(proposalBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_defence: 0,
    has_defence: 0,
    has_revision: 0,
    not_revision: 0,
  };

  for (const semesterKey in proposalBySemester) {
    const semesterData = proposalBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const proposal of semesterData?.proposals ?? []) {
      if (proposal) {
        dashboard.total_group++; // Increment total_group count

        if (proposal.defence_status === null) {
          dashboard.not_defence++; // Increment not_defence count
        } else {
          dashboard.has_defence++; // Increment has_defence count
        }

        if (
          proposal.is_revision_approve_by_panelist_chairman === "Approve" &&
          proposal.is_revision_approve_by_panelist_member === "Approve" &&
          proposal.is_revision_approve_by_advisor === "Approve"
        ) {
          dashboard.approved++; // Increment approved count
        } else if (
          proposal.is_revision_approve_by_panelist_chairman === "Rejected" &&
          proposal.is_revision_approve_by_panelist_member === "Rejected" &&
          proposal.is_revision_approve_by_advisor === "Rejected"
        ) {
          dashboard.rejected++; // Increment rejected count
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: proposalList,
  };

  return result;
};

//===================================================================
// @description     Get skripsi list member
// @route           GET /group/skripsi-list-member
// @access          DOSEN
const getSkripsiListMember = async (userId) => {
  const skripsiBySemester = {};

  // check user if member / get all proposal
  const member = await skripsiRepository.findAllSkripsiByMember(userId);
  if (!member) {
    return skripsiBySemester;
  }

  for (const entry of member) {
    if (entry.classroom_id) {
      // get classroom
      const classroom = await classroomRepository.findClassroomById(
        entry.classroom_id
      );

      const group = await groupRepository.findGroupBySkripsiId(entry.id);
      const groupStudents =
        await groupStudentRepository.findGroupStudentByGroupId(group.id);

      const students = await Promise.all(
        groupStudents.map(async (student_id) => {
          const student = await studentRepository.findStudentById(student_id);
          let fullName = student.firstName;

          if (student.lastName) {
            fullName += ` ${student.lastName}`;
          }

          return {
            id: student.id,
            fullName: fullName,
          };
        })
      );

      const skripsiData = {
        group_id: group.id,
        skripsi_id: entry.id,
        students,
        title: group.title,
        defence_status: entry.is_pass,
        approve_chairman: entry.is_revision_approve_by_panelist_chairman,
        approve_member: entry.is_revision_approve_by_panelist_member,
        approve_advisor: entry.is_revision_approve_by_advisor,
      };

      // Create a semester key based on the Academic_Calendar data
      const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

      if (!skripsiBySemester[semesterKey]) {
        skripsiBySemester[semesterKey] = {
          semester: semesterKey,
          skripsis: [],
        };
      }

      skripsiBySemester[semesterKey].skripsis.push(skripsiData);
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const skripsiList = Object.values(skripsiBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_defence: 0,
    has_defence: 0,
    has_revision: 0,
    not_revision: 0,
  };

  for (const semesterKey in skripsiBySemester) {
    const semesterData = skripsiBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const skripsi of semesterData?.skripsis ?? []) {
      if (skripsi) {
        dashboard.total_group++; // Increment total_group count

        if (proposal.defence_status === null) {
          dashboard.not_defence++; // Increment not_defence count
        } else {
          dashboard.has_defence++; // Increment has_defence count
        }

        if (
          skripsi.is_revision_approve_by_panelist_chairman === "Approve" &&
          skripsi.is_revision_approve_by_panelist_member === "Approve" &&
          skripsi.is_revision_approve_by_advisor === "Approve"
        ) {
          dashboard.approved++; // Increment approved count
        } else if (
          skripsi.is_revision_approve_by_panelist_chairman === "Rejected" &&
          skripsi.is_revision_approve_by_panelist_member === "Rejected" &&
          skripsi.is_revision_approve_by_advisor === "Rejected"
        ) {
          dashboard.rejected++; // Increment rejected count
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: skripsiList,
  };

  return result;
};

//===================================================================
// @description     Get history list member
// @route           GET /group/history-list-member
// @access          DOSEN
const getHistoryListMember = async (userId) => {
  const historyData = {};

  // get all member skripsi
  const skripsis = await skripsiRepository.findAllSkripsiByMember(userId);
  // console.log("Data skripsi: ", skripsis);

  // check if found proposal
  if (skripsis) {
    for (const entry of skripsis) {
      // get group
      const group = await groupRepository.findGroupBySkripsiId(entry.id);

      // check if progress is FINISH
      if (group.progress === "Finished") {
        // get student data
        const groupStudents =
          await groupStudentRepository.findGroupStudentByGroupId(group.id);
        const students = await Promise.all(
          groupStudents.map(async (student_id) => {
            const student = await studentRepository.findStudentById(student_id);
            let fullName = student.firstName;

            if (student.lastName) {
              fullName += ` ${student.lastName}`;
            }

            return {
              id: student.id,
              fullName: fullName,
            };
          })
        );

        const data = {
          group_id: group.id,
          students,
          title: group.title,
          approve_date: entry.approve_date,
        };
        // get classroom
        const classroom = await classroomRepository.findClassroomById(
          entry.classroom_id
        );
        // Create a semester key based on the Academic_Calendar data
        const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

        if (!historyData[semesterKey]) {
          historyData[semesterKey] = {
            semester: semesterKey,
            skripsis: [],
          };
        }
        historyData[semesterKey].skripsis.push(data);
        // console.log("Data riwayat: ", historyData);
      }
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const historyList = Object.values(historyData);
  return historyList;
};

//===================================================================
// @description     Get proposal list mk
// @route           GET /group/proposal-list-mk
// @access          DOSEN_MK
const getProposalListMK = async (userId) => {
  const proposalBySemester = {};

  // get all proposal classroom
  const classrooms = await classroomRepository.findClassroomsByDosenMkAndName(
    userId,
    "Proposal"
  );
  if (!classrooms) {
    return proposalBySemester;
  }
  for (const classroom of classrooms) {
    const proposals = await proposalRepository.findAllProposalByClassroomId(
      classroom.id
    );
    if (proposals) {
      for (const entry of proposals) {
        const group = await groupRepository.findGroupByProposalId(entry.id);
        const groupStudents =
          await groupStudentRepository.findGroupStudentByGroupId(group.id);

        const students = await Promise.all(
          groupStudents.map(async (student_id) => {
            const student = await studentRepository.findStudentById(student_id);
            let fullName = student.firstName;

            if (student.lastName) {
              fullName += ` ${student.lastName}`;
            }

            return {
              id: student.id,
              fullName: fullName,
            };
          })
        );

        // variable to know if group has submit proposal
        let uploaded = false;
        if (entry.file_path_proposal) {
          uploaded = true;
        }
        const proposalData = {
          group_id: group.id,
          proposal_id: entry.id,
          students,
          uploaded,
          title: group.title,
          approve_by_advisor: entry.is_proposal_approve_by_advisor,
          approve_by_co_advisor1: entry.is_proposal_approve_by_co_advisor1,
          approve_by_co_advisor2: entry.is_proposal_approve_by_co_advisor2,
        };
        // Create a semester key based on the Academic_Calendar data
        const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

        if (!proposalBySemester[semesterKey]) {
          proposalBySemester[semesterKey] = {
            semester: semesterKey,
            proposals: [],
          };
        }

        proposalBySemester[semesterKey].proposals.push(proposalData);
      }
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const proposalList = Object.values(proposalBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_submitted: 0,
    has_submitted: 0,
    approved: 0,
    rejected: 0,
  };

  for (const semesterKey in proposalBySemester) {
    const semesterData = proposalBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const proposal of semesterData?.proposals ?? []) {
      if (proposal) {
        dashboard.total_group++; // Increment total_group count

        if (proposal.uploaded === false) {
          dashboard.not_submitted++; // Increment not_submitted count
        } else {
          dashboard.has_submitted++; // Increment has_submitted count
        }

        if (
          proposal.is_proposal_approve_by_advisor === "Approve" &&
          proposal.is_proposal_approve_by_co_advisor1 === "Approve" &&
          proposal.is_proposal_approve_by_co_advisor2 === "Approve"
        ) {
          dashboard.approved++; // Increment approved count
        } else if (
          proposal.is_proposal_approve_by_advisor === "Rejected" &&
          proposal.is_proposal_approve_by_co_advisor1 === "Rejected" &&
          proposal.is_proposal_approve_by_co_advisor2 === "Rejected"
        ) {
          dashboard.rejected++; // Increment rejected count
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: proposalList,
  };

  return result;
};

//===================================================================
// @description     Get skripsi list mk
// @route           GET /group/skripsi-list-mk
// @access          DOSEN_MK
const getSkripsiListMK = async (userId) => {
  const skripsiBySemester = {};

  // get all skripsi classroom
  const classrooms = await classroomRepository.findClassroomsByDosenMkAndName(
    userId,
    "Skripsi"
  );

  if (!classrooms) {
    return skripsiBySemester;
  }

  for (const classroom of classrooms) {
    const skripsis = await skripsiRepository.findAllSkripsiByClassroomId(
      classroom.id
    );
    if (skripsis) {
      for (const entry of skripsis) {
        const group = await groupRepository.findGroupBySkripsiId(entry.id);
        const groupStudents =
          await groupStudentRepository.findGroupStudentByGroupId(group.id);

        const students = await Promise.all(
          groupStudents.map(async (student_id) => {
            const student = await studentRepository.findStudentById(student_id);
            let fullName = student.firstName;

            if (student.lastName) {
              fullName += ` ${student.lastName}`;
            }

            return {
              id: student.id,
              fullName: fullName,
            };
          })
        );

        // variable to know if group has submit proposal
        let uploaded = false;
        if (entry.file_path_skripsi) {
          uploaded = true;
        }
        const skripsiData = {
          group_id: group.id,
          skripsi_id: entry.id,
          students,
          uploaded,
          title: group.title,
          approve_by_advisor: entry.is_skripsi_approve_by_advisor,
          approve_by_co_advisor1: entry.is_skripsi_approve_by_co_advisor1,
          approve_by_co_advisor2: entry.is_skripsi_approve_by_co_advisor2,
        };
        // Create a semester key based on the Academic_Calendar data
        const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

        if (!skripsiBySemester[semesterKey]) {
          skripsiBySemester[semesterKey] = {
            semester: semesterKey,
            skripsis: [],
          };
        }

        skripsiBySemester[semesterKey].skripsis.push(skripsiData);
      }
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const skripsiList = Object.values(skripsiBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_submitted: 0,
    has_submitted: 0,
    approved: 0,
    rejected: 0,
  };

  for (const semesterKey in skripsiBySemester) {
    const semesterData = skripsiBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const skripsi of semesterData?.skripsis ?? []) {
      if (skripsi) {
        dashboard.total_group++; // Increment total_group count

        if (skripsi.uploaded === false) {
          dashboard.not_submitted++; // Increment not_submitted count
        } else {
          dashboard.has_submitted++; // Increment has_submitted count
        }

        if (
          skripsi.is_skripsi_approve_by_advisor === "Approve" &&
          skripsi.is_skripsi_approve_by_co_advisor1 === "Approve" &&
          skripsi.is_skripsi_approve_by_co_advisor2 === "Approve"
        ) {
          dashboard.approved++; // Increment approved count
        } else if (
          skripsi.is_skripsi_approve_by_advisor === "Rejected" &&
          skripsi.is_skripsi_approve_by_co_advisor1 === "Rejected" &&
          skripsi.is_skripsi_approve_by_co_advisor2 === "Rejected"
        ) {
          dashboard.rejected++; // Increment rejected count
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: skripsiList,
  };

  return result;
};

//===================================================================
// @description     Get proposal list kaprodi IF/SI
// @route           GET /group/proposal-list-kaprodi
// @access          KAPRODI
const getProposalListKaprodi = async (userId, userRole) => {
  // check user if dosen mk
  const kaprodi = await employeeRepository.findEmployeeById(userId);

  const proposalBySemester = {};

  if (userRole.includes("KAPRODI") && kaprodi.major === "IF") {
    // get all proposal
    const proposals = await proposalRepository.findAllProposal();
    if (proposals) {
      for (const proposal of proposals) {
        if (proposal.classroom_id) {
          // get group
          const group = await groupRepository.findGroupByProposalId(
            proposal.id
          );
          // get all student in group
          const groupStudents =
            await groupStudentRepository.findGroupStudentByGroupId(group.id);
          // variable to check if thesis is in Informatika
          let isInformatika = null;

          // looping to check if thesis is in Informatika
          for (const studentId of groupStudents) {
            // get student data
            const student = await studentRepository.findStudentById(studentId);
            if (student.major === "IF") {
              isInformatika = true;
              break; // Menghentikan loop jika ditemukan student dengan major === "IF"
            }
          }

          if (isInformatika) {
            async function getEmployeeNameAndDegree(employeeId) {
              const employee = await employeeRepository.findEmployeeById(
                employeeId
              );
              let name = employee.firstName;

              if (employee.lastName) {
                name += ` ${employee.lastName}`;
              }

              if (employee.degree) {
                name += `, ${employee.degree}`;
              }

              return name;
            }

            let advisorName = null;
            let coAdvisor1Name = null;
            let coAdvisor2Name = null;
            if (proposal.proposed_advisor_id) {
              advisorName = await getEmployeeNameAndDegree(
                proposal.proposed_advisor_id
              );
            }
            if (proposal.proposed_co_advisor1_id) {
              coAdvisor1Name = await getEmployeeNameAndDegree(
                proposal.proposed_co_advisor1_id
              );
            }
            if (proposal.proposed_co_advisor2_id) {
              coAdvisor2Name = await getEmployeeNameAndDegree(
                proposal.proposed_co_advisor2_id
              );
            }

            const students = await Promise.all(
              groupStudents.map(async (student_id) => {
                const student = await studentRepository.findStudentById(
                  student_id
                );
                let fullName = student.firstName;

                if (student.lastName) {
                  fullName += ` ${student.lastName}`;
                }

                return {
                  id: student.id,
                  fullName: fullName,
                };
              })
            );

            const proposalData = {
              group_id: group.id,
              proposal_id: proposal.id,
              students,
              title: group.title,
              is_pass: proposal.is_pass,
            };

            // get classroom
            const classroom = await classroomRepository.findClassroomById(
              proposal.classroom_id
            );
            // Create a semester key based on the Academic_Calendar data
            const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

            if (!proposalBySemester[semesterKey]) {
              proposalBySemester[semesterKey] = {
                semester: semesterKey,
                proposals: [],
              };
            }

            proposalBySemester[semesterKey].proposals.push(proposalData);
          }
        }
      }
    }
  }
  if (userRole.includes("KAPRODI") && kaprodi.major === "SI") {
    // get all proposal
    const proposals = await proposalRepository.findAllProposal();
    if (proposals) {
      for (const proposal of proposals) {
        if (proposal.classroom_id) {
          // get group
          const group = await groupRepository.findGroupByProposalId(
            proposal.id
          );
          // get all student in group
          const groupStudents =
            await groupStudentRepository.findGroupStudentByGroupId(group.id);
          // variable to check if thesis is in Informatika
          let isSistemInformasi = null;

          // looping to check if thesis is in Informatika
          for (const studentId of groupStudents) {
            // get student data
            const student = await studentRepository.findStudentById(studentId);
            if (student.major === "SI") {
              isSistemInformasi = true;
              break; // Menghentikan loop jika ditemukan student dengan major === "IF"
            }
          }

          if (isSistemInformasi) {
            async function getEmployeeNameAndDegree(employeeId) {
              const employee = await employeeRepository.findEmployeeById(
                employeeId
              );
              let name = employee.firstName;

              if (employee.lastName) {
                name += ` ${employee.lastName}`;
              }

              if (employee.degree) {
                name += `, ${employee.degree}`;
              }

              return name;
            }

            let advisorName = null;
            let coAdvisor1Name = null;
            let coAdvisor2Name = null;
            if (proposal.proposed_advisor_id) {
              advisorName = await getEmployeeNameAndDegree(
                proposal.proposed_advisor_id
              );
            }
            if (proposal.proposed_co_advisor1_id) {
              coAdvisor1Name = await getEmployeeNameAndDegree(
                proposal.proposed_co_advisor1_id
              );
            }
            if (proposal.proposed_co_advisor2_id) {
              coAdvisor2Name = await getEmployeeNameAndDegree(
                proposal.proposed_co_advisor2_id
              );
            }

            const students = await Promise.all(
              groupStudents.map(async (student_id) => {
                const student = await studentRepository.findStudentById(
                  student_id
                );
                let fullName = student.firstName;

                if (student.lastName) {
                  fullName += ` ${student.lastName}`;
                }

                return {
                  id: student.id,
                  fullName: fullName,
                };
              })
            );

            const proposalData = {
              group_id: group.id,
              proposal_id: proposal.id,
              students,
              title: group.title,
              is_pass: proposal.is_pass,
            };

            // get classroom
            const classroom = await classroomRepository.findClassroomById(
              proposal.classroom_id
            );
            // Create a semester key based on the Academic_Calendar data
            const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

            if (!proposalBySemester[semesterKey]) {
              proposalBySemester[semesterKey] = {
                semester: semesterKey,
                proposals: [],
              };
            }

            proposalBySemester[semesterKey].proposals.push(proposalData);
          }
        }
      }
    }
  }

  // Convert the submissionBySemester object into an array of semesters
  const proposalList = Object.values(proposalBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_defence: 0,
    has_defence: 0,
    pass: 0,
    repeat: 0,
    not_pass: 0,
  };

  for (const semesterKey in proposalBySemester) {
    const semesterData = proposalBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const proposal of semesterData?.proposals ?? []) {
      if (proposal) {
        dashboard.total_group++; // Increment total_group count

        if (proposal.is_pass === null) {
          dashboard.not_defence++; // Increment not_defence count
        } else {
          dashboard.has_defence++; // Increment has_defence count
        }

        if (proposal.is_pass === "Pass") {
          dashboard.pass++;
        } else if (proposal.is_pass === "Repeat") {
          dashboard.repeat++;
        } else if (proposal.is_pass === "Fail") {
          dashboard.not_pass++;
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: proposalList,
  };

  return result;
};

//===================================================================
// @description     Get skripsi list kaprodi IF/SI
// @route           GET /group/skripsi-list-kaprodi
// @access          KAPRODI
const getSkripsiListKaprodi = async (userId, userRole) => {
  // check user if kaprodi
  const kaprodi = await employeeRepository.findEmployeeById(userId);

  const skripsiBySemester = {};

  if (userRole.includes("KAPRODI") && kaprodi.major === "IF") {
    // get all proposal
    const skripsis = await proposalRepository.findAllProposal();
    if (skripsis) {
      for (const skripsi of skripsis) {
        if (skripsi.classroom_id) {
          // get group
          const group = await groupRepository.findGroupByProposalId(skripsi.id);
          // get all student in group
          const groupStudents =
            await groupStudentRepository.findGroupStudentByGroupId(group.id);
          // variable to check if thesis is in Informatika
          let isInformatika = null;

          // looping to check if thesis is in Informatika
          for (const studentId of groupStudents) {
            // get student data
            const student = await studentRepository.findStudentById(studentId);
            if (student.major === "IF") {
              isInformatika = true;
              break; // Menghentikan loop jika ditemukan student dengan major === "IF"
            }
          }

          if (isInformatika) {
            async function getEmployeeNameAndDegree(employeeId) {
              const employee = await employeeRepository.findEmployeeById(
                employeeId
              );
              let name = employee.firstName;

              if (employee.lastName) {
                name += ` ${employee.lastName}`;
              }

              if (employee.degree) {
                name += `, ${employee.degree}`;
              }

              return name;
            }

            let advisorName = null;
            let coAdvisor1Name = null;
            let coAdvisor2Name = null;
            if (skripsi.proposed_advisor_id) {
              advisorName = await getEmployeeNameAndDegree(
                skripsi.proposed_advisor_id
              );
            }
            if (skripsi.proposed_co_advisor1_id) {
              coAdvisor1Name = await getEmployeeNameAndDegree(
                skripsi.proposed_co_advisor1_id
              );
            }
            if (skripsi.proposed_co_advisor2_id) {
              coAdvisor2Name = await getEmployeeNameAndDegree(
                skripsi.proposed_co_advisor2_id
              );
            }

            const students = await Promise.all(
              groupStudents.map(async (student_id) => {
                const student = await studentRepository.findStudentById(
                  student_id
                );
                let fullName = student.firstName;

                if (student.lastName) {
                  fullName += ` ${student.lastName}`;
                }

                return {
                  id: student.id,
                  fullName: fullName,
                };
              })
            );
            // get classroom
            const classroom = await classroomRepository.findClassroomById(
              skripsi.classroom_id
            );
            const skripsiData = {
              group_id: group.id,
              skripsi_id: skripsi.id,
              students,
              title: group.title,
              is_pass: skripsi.is_pass,
            };
            // Create a semester key based on the Academic_Calendar data
            const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

            if (!skripsiBySemester[semesterKey]) {
              skripsiBySemester[semesterKey] = {
                semester: semesterKey,
                skripsis: [],
              };
            }

            skripsiBySemester[semesterKey].skripsis.push(skripsiData);
          }
        }
      }
    }
  }
  if (userRole.includes("KAPRODI") && kaprodi.major === "SI") {
    // get all proposal
    const skripsis = await proposalRepository.findAllProposal();
    if (skripsis) {
      for (const skripsi of skripsis) {
        if (skripsi.classroom_id) {
          // get group
          const group = await groupRepository.findGroupByProposalId(skripsi.id);
          // get all student in group
          const groupStudents =
            await groupStudentRepository.findGroupStudentByGroupId(group.id);
          // variable to check if thesis is in Informatika
          let isSistemInformasi = null;

          // looping to check if thesis is in Informatika
          for (const studentId of groupStudents) {
            // get student data
            const student = await studentRepository.findStudentById(studentId);
            if (student.major === "SI") {
              isSistemInformasi = true;
              break; // Menghentikan loop jika ditemukan student dengan major === "IF"
            }
          }

          if (isSistemInformasi) {
            async function getEmployeeNameAndDegree(employeeId) {
              const employee = await employeeRepository.findEmployeeById(
                employeeId
              );
              let name = employee.firstName;

              if (employee.lastName) {
                name += ` ${employee.lastName}`;
              }

              if (employee.degree) {
                name += `, ${employee.degree}`;
              }

              return name;
            }

            let advisorName = null;
            let coAdvisor1Name = null;
            let coAdvisor2Name = null;
            if (skripsi.proposed_advisor_id) {
              advisorName = await getEmployeeNameAndDegree(
                skripsi.proposed_advisor_id
              );
            }
            if (skripsi.proposed_co_advisor1_id) {
              coAdvisor1Name = await getEmployeeNameAndDegree(
                skripsi.proposed_co_advisor1_id
              );
            }
            if (skripsi.proposed_co_advisor2_id) {
              coAdvisor2Name = await getEmployeeNameAndDegree(
                skripsi.proposed_co_advisor2_id
              );
            }

            const students = await Promise.all(
              groupStudents.map(async (student_id) => {
                const student = await studentRepository.findStudentById(
                  student_id
                );
                let fullName = student.firstName;

                if (student.lastName) {
                  fullName += ` ${student.lastName}`;
                }

                return {
                  id: student.id,
                  fullName: fullName,
                };
              })
            );
            // get classroom
            const classroom = await classroomRepository.findClassroomById(
              skripsi.classroom_id
            );
            const skripsiData = {
              group_id: group.id,
              skripsi_id: skripsi.id,
              students,
              title: group.title,
              is_pass: skripsi.is_pass,
            };
            // Create a semester key based on the Academic_Calendar data
            const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

            if (!skripsiBySemester[semesterKey]) {
              skripsiBySemester[semesterKey] = {
                semester: semesterKey,
                skripsis: [],
              };
            }

            skripsiBySemester[semesterKey].skripsis.push(skripsiData);
          }
        }
      }
    }
  }

  // Convert the submissionBySemester object into an array of semesters
  const skripsiList = Object.values(skripsiBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_defence: 0,
    has_defence: 0,
    pass: 0,
    repeat: 0,
    not_pass: 0,
  };

  for (const semesterKey in skripsiBySemester) {
    const semesterData = skripsiBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const skripsi of semesterData?.skripsis ?? []) {
      if (skripsi) {
        dashboard.total_group++; // Increment total_group count

        if (skripsi.is_pass === null) {
          dashboard.not_defence++; // Increment not_defence count
        } else {
          dashboard.has_defence++; // Increment has_defence count
        }

        if (skripsi.is_pass === "Pass") {
          dashboard.pass++;
        } else if (skripsi.is_pass === "Repeat") {
          dashboard.repeat++;
        } else if (skripsi.is_pass === "Fail") {
          dashboard.not_pass++;
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: skripsiList,
  };

  return result;
};

//===================================================================
// @description     Get history list kaprodi IF/SI
// @route           GET /group/history-list-kaprodi
// @access          DOSEN
const getHistoryListKaprodi = async (userId, userRole) => {
  const historyData = {};

  // check user if kaprodi
  const kaprodi = await employeeRepository.findEmployeeById(userId);

  if (userRole.includes("KAPRODI") && kaprodi.major === "IF") {
    // get all skripsi
    const skripsis = await skripsiRepository.findAllSkripsi();
    if (skripsis) {
      for (const skripsi of skripsis) {
        if (skripsi.classroom_id) {
          // get group
          const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
          // get all student in group
          const groupStudents =
            await groupStudentRepository.findGroupStudentByGroupId(group.id);
          // variable to check if thesis is in Informatika
          let isInformatika = null;

          // looping to check if thesis is in Informatika
          for (const studentId of groupStudents) {
            // get student data
            const student = await studentRepository.findStudentById(studentId);
            if (student.major === "IF") {
              isInformatika = true;
              break; // Menghentikan loop jika ditemukan student dengan major === "IF"
            }
          }

          if (isInformatika) {
            const students = await Promise.all(
              groupStudents.map(async (student_id) => {
                const student = await studentRepository.findStudentById(
                  student_id
                );
                let fullName = student.firstName;

                if (student.lastName) {
                  fullName += ` ${student.lastName}`;
                }

                return {
                  id: student.id,
                  fullName: fullName,
                };
              })
            );

            const data = {
              group_id: group.id,
              students,
              title: group.title,
              approve_date: skripsi.approve_date,
            };
            // get classroom
            const classroom = await classroomRepository.findClassroomById(
              skripsi.classroom_id
            );
            // Create a semester key based on the Academic_Calendar data
            const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

            if (!historyData[semesterKey]) {
              historyData[semesterKey] = {
                semester: semesterKey,
                skripsis: [],
              };
            }
            historyData[semesterKey].skripsis.push(data);
          }
        }
      }
    }
  }
  if (userRole.includes("KAPRODI") && kaprodi.major === "SI") {
    // get all skripsi
    const skripsis = await skripsiRepository.findAllSkripsi();
    if (skripsis) {
      for (const skripsi of skripsis) {
        if (skripsi.classroom_id) {
          // get group
          const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
          // get all student in group
          const groupStudents =
            await groupStudentRepository.findGroupStudentByGroupId(group.id);
          // variable to check if thesis is in Informatika
          let isSistemInformasi = null;

          // looping to check if thesis is in Informatika
          for (const studentId of groupStudents) {
            // get student data
            const student = await studentRepository.findStudentById(studentId);
            if (student.major === "SI") {
              isSistemInformasi = true;
              break; // Menghentikan loop jika ditemukan student dengan major === "IF"
            }
          }

          if (isSistemInformasi) {
            const students = await Promise.all(
              groupStudents.map(async (student_id) => {
                const student = await studentRepository.findStudentById(
                  student_id
                );
                let fullName = student.firstName;

                if (student.lastName) {
                  fullName += ` ${student.lastName}`;
                }

                return {
                  id: student.id,
                  fullName: fullName,
                };
              })
            );

            const data = {
              group_id: group.id,
              students,
              title: group.title,
              approve_date: skripsi.approve_date,
            };
            // get classroom
            const classroom = await classroomRepository.findClassroomById(
              skripsi.classroom_id
            );
            // Create a semester key based on the Academic_Calendar data
            const semesterKey = `${classroom.academic.year}-${classroom.academic.semester} (${classroom.name})`;

            if (!historyData[semesterKey]) {
              historyData[semesterKey] = {
                semester: semesterKey,
                skripsis: [],
              };
            }
            historyData[semesterKey].skripsis.push(data);
          }
        }
      }
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const historyList = Object.values(historyData);
  return historyList;
};

//===================================================================
// @description     Get proposal list dekan
// @route           GET /group/proposal-list-dekan
// @access          DEKAN
const getProposalListDekan = async (userId, userRole) => {
  const dekan = await employeeRepository.findEmployeeById(userId);

  const proposalBySemester = {};

  if (userRole.includes("DEKAN") && dekan) {
    const proposal = await proposalRepository.findAllProposal();
    if (!proposal) {
      return proposalBySemester;
    }

    for (const entry of proposal) {
      const group = await groupRepository.findGroupByProposalId(entry.id);

      const groupStudents =
        await groupStudentRepository.findGroupStudentByGroupId(group.id);

      const students = await Promise.all(
        groupStudents.map(async (student_id) => {
          const student = await studentRepository.findStudentById(student_id);
          let fullName = student.firstName;

          if (student.lastName) {
            fullName += ` ${student.lastName}`;
          }

          return {
            id: student.id,
            fullName: fullName,
          };
        })
      );

      const proposalData = {
        group_id: group.id,
        proposal_id: entry.id,
        students,
        title: group.title,
        is_pass: entry.is_pass,
      };

      // get classroom
      const classroom = await classroomRepository.findClassroomById(
        entry.classroom_id
      );

      // Create a semester key based on the Academic_Calendar data
      const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

      if (!proposalBySemester[semesterKey]) {
        proposalBySemester[semesterKey] = {
          semester: semesterKey,
          proposals: [],
        };
      }

      proposalBySemester[semesterKey].proposals.push(proposalData);
    }
  }

  // Convert the submissionBySemester object into an array of semesters
  const proposalList = Object.values(proposalBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_defence: 0,
    has_defence: 0,
    pass: 0,
    repeat: 0,
    not_pass: 0,
  };

  for (const semesterKey in proposalBySemester) {
    const semesterData = proposalBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const proposal of semesterData?.proposals ?? []) {
      if (proposal) {
        dashboard.total_group++; // Increment total_group count

        if (proposal.is_pass === null) {
          dashboard.not_defence++; // Increment not_defence count
        } else {
          dashboard.has_defence++; // Increment has_defence count
        }

        if (proposal.is_pass === "Pass") {
          dashboard.pass++;
        } else if (proposal.is_pass === "Repeat") {
          dashboard.repeat++;
        } else if (proposal.is_pass === "Fail") {
          dashboard.not_pass++;
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: proposalList,
  };

  return result;
};

//===================================================================
// @description     Get skripsi list dekan
// @route           GET /group/skripsi-list-dekan
// @access          DEKAN
const getSkripsiListDekan = async (userId, userRole) => {
  const dekan = await employeeRepository.findEmployeeById(userId);

  const skripsiBySemester = {};

  if (userRole.includes("DEKAN") && dekan) {
    const skripsi = await skripsiRepository.findAllSkripsi();
    if (!skripsi) {
      return skripsiBySemester;
    }

    for (const entry of skripsi) {
      if (entry.classroom_id) {
        const group = await groupRepository.findGroupBySkripsiId(entry.id);

        const groupStudents =
          await groupStudentRepository.findGroupStudentByGroupId(group.id);

        const students = await Promise.all(
          groupStudents.map(async (student_id) => {
            const student = await studentRepository.findStudentById(student_id);
            let fullName = student.firstName;

            if (student.lastName) {
              fullName += ` ${student.lastName}`;
            }

            return {
              id: student.id,
              fullName: fullName,
            };
          })
        );

        const skripsiData = {
          group_id: group.id,
          skripsi_id: entry.id,
          students,
          title: group.title,
          is_pass: entry.is_pass,
        };

        // get classroom
        const classroom = await classroomRepository.findClassroomById(
          entry.classroom_id
        );

        // Create a semester key based on the Academic_Calendar data
        const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

        if (!skripsiBySemester[semesterKey]) {
          skripsiBySemester[semesterKey] = {
            semester: semesterKey,
            skripsis: [],
          };
        }

        skripsiBySemester[semesterKey].skripsis.push(skripsiData);
      }
    }
  }

  // Convert the submissionBySemester object into an array of semesters
  const skripsiList = Object.values(skripsiBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    not_defence: 0,
    has_defence: 0,
    pass: 0,
    repeat: 0,
    not_pass: 0,
  };

  for (const semesterKey in skripsiBySemester) {
    const semesterData = skripsiBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const skripsi of semesterData.skripsis) {
      dashboard.total_group++; // Increment total_group count

      if (skripsi.is_pass === null) {
        dashboard.not_defence++; // Increment not_defence count
      } else {
        dashboard.has_defence++; // Increment has_defence count
      }

      if (skripsi.is_pass === "Pass") {
        dashboard.pass++;
      } else if (skripsi.is_pass === "Repeat") {
        dashboard.repeat++;
      } else if (skripsi.is_pass === "Fail") {
        dashboard.not_pass++;
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: skripsiList,
  };

  return result;
};

//===================================================================
// @description     Get history list dekan
// @route           GET /group/history-list-dekan
// @access          DOSEN
const getHistoryListDekan = async (userId, userRole) => {
  const historyData = {};

  const dekan = await employeeRepository.findEmployeeById(userId);
  if (userRole.includes("DEKAN") && dekan) {
    // get all member skripsi
    const skripsis = await skripsiRepository.findAllSkripsi();
    // console.log("Data skripsi: ", skripsis);

    // check if found proposal
    if (skripsis) {
      for (const entry of skripsis) {
        // get group
        const group = await groupRepository.findGroupBySkripsiId(entry.id);

        // check if progress is FINISH
        if (group.progress === "Finished") {
          // get student data
          const groupStudents =
            await groupStudentRepository.findGroupStudentByGroupId(group.id);
          const students = await Promise.all(
            groupStudents.map(async (student_id) => {
              const student = await studentRepository.findStudentById(
                student_id
              );
              let fullName = student.firstName;

              if (student.lastName) {
                fullName += ` ${student.lastName}`;
              }

              return {
                id: student.id,
                fullName: fullName,
              };
            })
          );

          const data = {
            group_id: group.id,
            students,
            title: group.title,
            approve_date: entry.approve_date,
          };
          // get classroom
          const classroom = await classroomRepository.findClassroomById(
            entry.classroom_id
          );
          // Create a semester key based on the Academic_Calendar data
          const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

          if (!historyData[semesterKey]) {
            historyData[semesterKey] = {
              semester: semesterKey,
              skripsis: [],
            };
          }
          historyData[semesterKey].skripsis.push(data);
          // console.log("Data riwayat: ", historyData);
        }
      }
    }
  }
  // Convert the submissionBySemester object into an array of semesters
  const historyList = Object.values(historyData);
  return historyList;
};

//===================================================================
// @description     Get proposal list operator fakultas/filkom
// @route           GET /group/proposal-list-sekretaris
// @access          OPERATOR_FAKULTAS
const getProposalListSekretaris = async () => {
  const proposalBySemester = {};

  const proposal = await proposalRepository.findAllProposal();
  if (!proposal) {
    return proposalBySemester;
  }

  for (const entry of proposal) {
    const group = await groupRepository.findGroupByProposalId(entry.id);
    const groupStudents =
      await groupStudentRepository.findGroupStudentByGroupId(group.id);

    const students = await Promise.all(
      groupStudents.map(async (student_id) => {
        const student = await studentRepository.findStudentById(student_id);
        let fullName = student.firstName;

        if (student.lastName) {
          fullName += ` ${student.lastName}`;
        }

        return {
          id: student.id,
          fullName: fullName,
        };
      })
    );

    let documentProposal = false;
    let payment = false;
    let plagiarism = false;
    if (entry.file_name_proposal) {
      documentProposal = true;
    }
    if (entry.file_name_payment) {
      payment = true;
    }
    if (entry.file_name_plagiarismcheck) {
      plagiarism = true;
    }

    // variable to know if group have schedule
    let schedule = false;
    if (entry.defence_date) {
      schedule = true;
    }
    const proposalData = {
      group_id: group.id,
      proposal_id: entry.id,
      students,
      schedule,
      title: group.title,
      proposal_status: documentProposal,
      paymant_status: payment,
      plagiarism: plagiarism,
    };

    // get classroom
    const classroom = await classroomRepository.findClassroomById(
      entry.classroom_id
    );

    // Create a semester key based on the Academic_Calendar data
    const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

    if (!proposalBySemester[semesterKey]) {
      proposalBySemester[semesterKey] = {
        semester: semesterKey,
        proposals: [],
      };
    }

    proposalBySemester[semesterKey].proposals.push(proposalData);
  }

  // Convert the submissionBySemester object into an array of semesters
  const proposalList = Object.values(proposalBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    ready: 0,
    not_ready: 0,
    have_schedule: 0,
    not_schedule: 0,
  };

  for (const semesterKey in proposalBySemester) {
    const semesterData = proposalBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const proposal of semesterData?.proposals ?? []) {
      if (proposal) {
        dashboard.total_group++; // Increment total_group count

        if (
          proposal.proposal_status === false &&
          proposal.paymant_status === false &&
          proposal.plagiarism === false
        ) {
          dashboard.not_ready++; // Increment not_ready count
        } else {
          dashboard.ready++; // Increment ready count
        }

        if (proposal.schedule === true) {
          dashboard.have_schedule++;
        } else {
          dashboard.not_schedule++;
        }
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: proposalList,
  };

  return result;
};

//===================================================================
// @description     Get skripsi list operator fakultas/filkom
// @route           GET /group/skripsi-list-sekretaris
// @access          OPERATOR_FAKULTAS
const getSkripsiListSekretaris = async () => {
  const skripsiBySemester = {};

  const skripsi = await skripsiRepository.findAllSkripsi();

  if (!skripsi) {
    return skripsiBySemester;
  }

  for (const entry of skripsi) {
    const group = await groupRepository.findGroupBySkripsiId(entry.id);

    if (group.skripsi_id) {
      const groupStudents =
        await groupStudentRepository.findGroupStudentByGroupId(group.id);

      const students = await Promise.all(
        groupStudents.map(async (student_id) => {
          const student = await studentRepository.findStudentById(student_id);
          let fullName = student.firstName;

          if (student.lastName) {
            fullName += ` ${student.lastName}`;
          }

          return {
            id: student.id,
            fullName: fullName,
          };
        })
      );

      let documentSkripsi = false;
      let payment = false;
      let plagiarism = false;
      if (entry.file_name_skripsi) {
        documentSkripsi = true;
      }
      if (entry.file_name_payment) {
        payment = true;
      }
      if (entry.file_name_plagiarismcheck) {
        plagiarism = true;
      }

      // variable to know if group have schedule
      let schedule = false;
      if (entry.defence_date) {
        schedule = true;
      }
      const skripsiData = {
        group_id: group.id,
        skripsi_id: entry.id,
        students,
        schedule,
        title: group.title,
        skripsi_status: documentSkripsi,
        paymant_status: payment,
        plagiarism: plagiarism,
      };

      // get classroom
      const classroom = await classroomRepository.findClassroomById(
        entry.classroom_id
      );

      // Create a semester key based on the Academic_Calendar data
      const semesterKey = `Semester ${classroom.academic.semester} ${classroom.academic.year}`;

      if (!skripsiBySemester[semesterKey]) {
        skripsiBySemester[semesterKey] = {
          semester: semesterKey,
          skripsis: [],
        };
      }

      skripsiBySemester[semesterKey].skripsis.push(skripsiData);
    }
  }

  // Convert the submissionBySemester object into an array of semesters
  const skripsiList = Object.values(skripsiBySemester);

  // Initialize dashboard data
  const dashboard = {
    total_group: 0,
    ready: 0,
    not_ready: 0,
    have_schedule: 0,
    not_schedule: 0,
  };

  for (const semesterKey in skripsiBySemester) {
    const semesterData = skripsiBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const skripsi of semesterData.skripsis) {
      dashboard.total_group++; // Increment total_group count

      if (
        skripsi.skripsi_status === false &&
        skripsi.paymant_status === false &&
        skripsi.plagiarism === false
      ) {
        dashboard.not_ready++; // Increment not_ready count
      } else {
        dashboard.ready++; // Increment ready count
      }

      if (skripsi.schedule === true) {
        dashboard.have_schedule++;
      } else {
        dashboard.not_schedule++;
      }
    }
  }

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: skripsiList,
  };

  return result;
};

//===================================================================
// @description     Put metadata
// @route           PUT /group/metadata/:id
// @access          MAHASISWA
const updateMetadataById = async (id, payload) => {
  const updatedMetadata = await groupRepository.updateMetadataById(id, payload);
  return updatedMetadata;
};

//===================================================================
// @description     Get metadata
// @route           GET /group/metadata/:id
// @access          MAHASISWA
const getMetadataById = async (id) => {
  let data = {};
  const group = await groupRepository.findGroupById(id);
  if (group) {
    data = {
      id: group.id,
      title: group.title,
      keywords: group.keywords,
      abstrak: group.abstrak,
      reference: group.reference,
    };
  }
  return data;
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
