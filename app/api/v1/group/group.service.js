//Layer untuk handle business logic

const groupRepository = require("./group.repository");
const groupStudentRepository = require("../group_student/group_student.repository");
const submissionRepository = require("../submission/submission.repository");
const proposalRepository = require("../proposal/proposal.repository");
const skripsiRepository = require("../skripsi/skripsi.repository");
const studentRepository = require("../student/student.repository");
const employeeRepository = require("../employee/employee.repository");
const classroomRepository = require("../classroom/classroom.repository");
const proposalStudentRepository = require("../proposal_student/proposal_student.repository");
const userManagementRepository = require("../user_management/user_namagement.repository");

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
    skripsi = await proposalRepository.findSkripsiById(group.skripsi_id);
  }

  //check status siap sidang proposal
  const proposalDocumentStatus = false;
  const proposalPaymentStatus = false;
  const proposalPlagiarismStatus = false;

  const panelistChairman = false;
  const panelistMember = false;
  const advisor = false;
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
  const skripsiDocumentStatus = false;
  const skripsiPaymentStatus = false;
  const skripsiPlagiarismStatus = false;
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
      advisor_status: skripsi ? skripsi.is_proposal_approve_by_advisor : null,
      co_advisor1_status: skripsi
        ? skripsi.is_proposal_approve_by_co_advisor1
        : null,
      co_advisor2_status: skripsi
        ? skripsi.is_proposal_approve_by_co_advisor2
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

    // Add student data to the groupData
    submissionData.students.push({
      fullName: `${student.firstName} ${student.lastName || ""}`,
      nim: student.nim,
      major: student.major,
    });
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
// @description     Get all student in the same proposal classroom
// @route           GET /group/classroom/students/:id
// @access          MAHASISWA
const getStudentListByClassroomId = async (id) => {
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

    if (isNotInOtherTeamPartners) {
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
  if (!group || !group.proposal_id) {
    const advisorTeamData = {
      advisor: null,
      co_advisor1: null,
      co_advisor2: null,
    };
    return advisorTeamData;
  }
  const proposal = await proposalRepository.findProposalById(group.proposal_id);

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
  if (proposal.advisor_id) {
    advisorName = await getEmployeeNameAndDegree(proposal.advisor_id);
  }
  if (proposal.co_advisor1_id) {
    coAdvisor1Name = await getEmployeeNameAndDegree(proposal.co_advisor1_id);
  }
  if (proposal.co_advisor2_id) {
    coAdvisor2Name = await getEmployeeNameAndDegree(proposal.co_advisor2_id);
  }

  const advisorTeamData = {
    advisor: advisorName,
    co_advisor1: coAdvisor1Name,
    co_advisor2: coAdvisor2Name,
  };

  return advisorTeamData;
};

//===================================================================
// @description     Get committee list
// @route           GET /group/committee-list
// @access          DOSEN
const getCommitteeList = async () => {
  const submissions = await submissionRepository.findAllSubmissionByIsApproveId(
    "Waiting"
  );
  const committeeListData = [];
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
    committeeListData.push(submissionData);
  }
  return committeeListData;
};

//===================================================================
// @description     Get submission list dosen mk
// @route           GET /group/submission-list-mk
// @access          DOSEN_MK
const getSubmissionListMK = async (userId) => {
  // get all proposal classroom
  const classrooms = await classroomRepository.findClassroomsByDosenMkAndName(
    userId,
    "Proposal"
  );
  const submissionBySemester = {};
  for (const classroom of classrooms) {
    const submissions =
      await submissionRepository.findAllSubmissionByClassroomId(classroom.id);
    for (const entry of submissions) {
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
    for (const submission of semesterData.submissions) {
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
    // get all proposal_student
    const proposalStudents =
      await proposalStudentRepository.findAllProposalStudent();

    const groupsIF = [];
    for (const entry of proposalStudents) {
      // check all group of student
      const groupStudents =
        await groupStudentRepository.findGroupStudentByStudentId(
          entry.student_id
        );
      for (const entry of groupStudents) {
        // get student
        const student = await studentRepository.findStudentById(
          entry.student_id
        );
        if (student.major === "IF") {
          // get group_student
          const groupStudentsIF =
            await groupStudentRepository.findGroupStudentByStudentId(
              student.id
            );
          for (const entry of groupStudentsIF) {
            // get group
            const group = await groupRepository.findGroupById(entry.group_id);
            groupsIF.push(group);
          }
        }
      }
    }
    for (const entry of groupsIF) {
      // get all submission
      const submission = await submissionRepository.findSubmissionById(
        entry.submission_id
      );

      // get classroom
      const classroom = await classroomRepository.findClassroomById(
        submission.classroom_id
      );

      // get group
      const group = await groupRepository.findGroupBySubmissionId(
        submission.id
      );
      // get all group_student
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
        submission_id: submission.id,
        students,
        title: group.title,
        proposed_advisor: advisorName,
        proposed_co_advisor1: coAdvisor1Name,
        proposed_co_advisor2: coAdvisor2Name,
        is_consultation: submission.is_consultation,
        is_approve: submission.is_approve,
      };
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
  if (userKaprodi && kaprodi.major === "SI") {
    // get all proposal_student
    const proposalStudents =
      await proposalStudentRepository.findAllProposalStudent();

    const groupsSI = [];
    for (const entry of proposalStudents) {
      // check all group of student
      const groupStudents =
        await groupStudentRepository.findGroupStudentByStudentId(
          entry.student_id
        );
      for (const entry of groupStudents) {
        // get student
        const student = await studentRepository.findStudentById(
          entry.student_id
        );
        if (student.major === "SI") {
          // get group_student
          const groupStudentsSI =
            await groupStudentRepository.findGroupStudentByStudentId(
              student.id
            );
          for (const entry of groupStudentsSI) {
            // get group
            const group = await groupRepository.findGroupById(entry.group_id);
            groupsSI.push(group);
          }
        }
      }
    }
    for (const entry of groupsSI) {
      // get all submission
      const submission = await submissionRepository.findSubmissionById(
        entry.submission_id
      );

      // get classroom
      const classroom = await classroomRepository.findClassroomById(
        submission.classroom_id
      );

      // get group
      const group = await groupRepository.findGroupBySubmissionId(
        submission.id
      );
      // get all group_student
      const groupStudents =
        await groupStudentRepository.findGroupStudentByGroupId(submission.id);

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
    for (const submission of semesterData.submissions) {
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
    for (const submission of semesterData.submissions) {
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
  // check user if advisor / get all proposal
  const advisorOrCo = await proposalRepository.findAllProposalByAdvisorId(
    userId
  );

  const proposalBySemester = {};

  for (const entry of advisorOrCo) {
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
    const semesterKey = `${classroom.academic.year}-${classroom.academic.semester} (${classroom.name})`;

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
    not_submitted: 0,
    has_submitted: 0,
    approved: 0,
    rejected: 0,
  };

  for (const semesterKey in proposalBySemester) {
    const semesterData = proposalBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const proposal of semesterData.proposals) {
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

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: proposalList,
  };

  return result;
};

//===================================================================
// @description     Get proposal list co-advisor
// @route           GET /group/proposal-list-co-advisor
// @access          DOSEN
const getProposalListCoAdvisor = async (userId) => {
  // check user if advisor / get all proposal
  const advisorOrCo = await proposalRepository.findAllProposalByCoAdvisorId(
    userId
  );

  const proposalBySemester = {};

  for (const entry of advisorOrCo) {
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
    const semesterKey = `${classroom.academic.year}-${classroom.academic.semester} (${classroom.name})`;

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
    not_submitted: 0,
    has_submitted: 0,
    approved: 0,
    rejected: 0,
  };

  for (const semesterKey in proposalBySemester) {
    const semesterData = proposalBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const proposal of semesterData.proposals) {
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

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: proposalList,
  };

  return result;
};

//===================================================================
// @description     Get proposal list chairman
// @route           GET /group/proposal-list-chairman
// @access          DOSEN
const getProposalListChairman = async (userId) => {
  // check user if chairman / get all proposal
  const chairmanOrMember = await proposalRepository.findAllProposalByChairman(
    userId
  );

  const proposalBySemester = {};

  for (const entry of chairmanOrMember) {
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
    const semesterKey = `${classroom.academic.year}-${classroom.academic.semester} (${classroom.name})`;

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
    not_defence: 0,
    has_defence: 0,
    has_revision: 0,
    not_revision: 0,
  };

  for (const semesterKey in proposalBySemester) {
    const semesterData = proposalBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const proposal of semesterData.proposals) {
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

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: proposalList,
  };

  return result;
};

//===================================================================
// @description     Get proposal list member
// @route           GET /group/proposal-list-member
// @access          DOSEN
const getProposalListMember = async (userId) => {
  // check user if member / get all proposal
  const chairmanOrMember = await proposalRepository.findAllProposalByMember(
    userId
  );

  const proposalBySemester = {};

  for (const entry of chairmanOrMember) {
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
    const semesterKey = `${classroom.academic.year}-${classroom.academic.semester} (${classroom.name})`;

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
    not_defence: 0,
    has_defence: 0,
    has_revision: 0,
    not_revision: 0,
  };

  for (const semesterKey in proposalBySemester) {
    const semesterData = proposalBySemester[semesterKey];

    // Iterate through submissions in the semester
    for (const proposal of semesterData.proposals) {
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

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: proposalList,
  };

  return result;
};

//===================================================================
// @description     Get proposal list mk
// @route           GET /group/proposal-list-mk
// @access          DOSEN_MK
const getProposalListMK = async (userId) => {
  // get all proposal classroom
  const classrooms = await classroomRepository.findClassroomsByDosenMkAndName(
    userId,
    "Proposal"
  );
  const proposalBySemester = {};
  for (const classroom of classrooms) {
    const proposals = await proposalRepository.findAllProposalByClassroomId(
      classroom.id
    );
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
      const semesterKey = `${classroom.academic.year}-${classroom.academic.semester} (${classroom.name})`;

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
    for (const proposal of semesterData.proposals) {
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

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: proposalList,
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
    // get all proposal_student
    const proposalStudents =
      await proposalStudentRepository.findAllProposalStudent();

    const groupsIF = [];
    for (const entry of proposalStudents) {
      // check all group of student
      const groupStudents =
        await groupStudentRepository.findGroupStudentByStudentId(
          entry.student_id
        );
      for (const entry of groupStudents) {
        // get student
        const student = await studentRepository.findStudentById(
          entry.student_id
        );
        if (student.major === "IF") {
          // get group_student
          const groupStudentsIF =
            await groupStudentRepository.findGroupStudentByStudentId(
              student.id
            );
          for (const entry of groupStudentsIF) {
            // get group
            const group = await groupRepository.findGroupById(entry.group_id);
            groupsIF.push(group);
          }
        }
      }
    }
    for (const entry of groupsIF) {
      // get all proposal
      const proposal = await proposalRepository.findProposalById(
        entry.proposal_id
      );

      // get classroom
      const classroom = await classroomRepository.findClassroomById(
        proposal.classroom_id
      );

      // get group
      const group = await groupRepository.findGroupByProposalId(proposal.id);
      // get all group_student
      const groupStudents =
        await groupStudentRepository.findGroupStudentByGroupId(group.id);

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
      const proposalData = {
        group_id: group.id,
        proposal_id: proposal.id,
        students,
        title: group.title,
        is_pass: proposal.is_pass,
      };
      // Create a semester key based on the Academic_Calendar data
      const semesterKey = `${classroom.academic.year}-${classroom.academic.semester} (${classroom.name})`;

      if (!proposalBySemester[semesterKey]) {
        proposalBySemester[semesterKey] = {
          semester: semesterKey,
          proposals: [],
        };
      }

      proposalBySemester[semesterKey].proposals.push(proposalData);
    }
  }
  if (userRole.includes("KAPRODI") && kaprodi.major === "SI") {
    // get all proposal_student
    const proposalStudents =
      await proposalStudentRepository.findAllProposalStudent();

    const groupsSI = [];
    for (const entry of proposalStudents) {
      // check all group of student
      const groupStudents =
        await groupStudentRepository.findGroupStudentByStudentId(
          entry.student_id
        );
      for (const entry of groupStudents) {
        // get student
        const student = await studentRepository.findStudentById(
          entry.student_id
        );
        if (student.major === "SI") {
          // get group_student
          const groupStudentsSI =
            await groupStudentRepository.findGroupStudentByStudentId(
              student.id
            );
          for (const entry of groupStudentsSI) {
            // get group
            const group = await groupRepository.findGroupById(entry.group_id);
            groupsSI.push(group);
          }
        }
      }
    }
    for (const entry of groupsSI) {
      // get all proposal
      const proposal = await proposalRepository.findProposalById(
        entry.proposal_id
      );

      // get classroom
      const classroom = await classroomRepository.findClassroomById(
        proposal.classroom_id
      );

      // get group
      const group = await groupRepository.findGroupByProposalId(proposal.id);
      // get all group_student
      const groupStudents =
        await groupStudentRepository.findGroupStudentByGroupId(group.id);

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
      const proposalData = {
        group_id: group.id,
        proposal_id: proposal.id,
        students,
        title: group.title,
        is_pass: proposal.is_pass,
      };
      // Create a semester key based on the Academic_Calendar data
      const semesterKey = `${classroom.academic.year}-${classroom.academic.semester} (${classroom.name})`;

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
    for (const proposal of semesterData.proposals) {
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

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: proposalList,
  };

  return result;
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

    for (const entry of proposal) {
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
        is_pass: entry.is_pass,
      };

      // Create a semester key based on the Academic_Calendar data
      const semesterKey = `${classroom.academic.year}-${classroom.academic.semester} (${classroom.name})`;

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
    for (const proposal of semesterData.proposals) {
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

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: proposalList,
  };

  return result;
};

//===================================================================
// @description     Get proposal list operator fakultas/filkom
// @route           GET /group/proposal-list-sekretaris
// @access          OPERATOR_FAKULTAS
const getProposalListSekretaris = async () => {
  const proposalBySemester = {};

  const proposal = await proposalRepository.findAllProposal();

  for (const entry of proposal) {
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

    // Create a semester key based on the Academic_Calendar data
    const semesterKey = `${classroom.academic.year}-${classroom.academic.semester} (${classroom.name})`;

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
    for (const proposal of semesterData.proposals) {
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

  // Add the dashboard data to the result
  const result = {
    dashboard: dashboard,
    semesterData: proposalList,
  };

  return result;
};

// const getGroupStudentById = async (id) => {
//     const student_group = await groupRepository.findGroupStudentById(id);
//     if (!student_group) {
//       throw {
//         status: 400,
//         message: `Not found`,
//       };
//     }
//     return student_group;
// };

// const updateMetadataById = async (id, payload) => {
//     await getGroupById(id);

//     const group = await groupRepository.updateMetadata(id, payload);
//     return group;
// };

// const getMetadataById = async (id) => {
//     const group = await groupRepository.findMetadataById(id);
//     if (!group) {
//       throw {
//         status: 400,
//         message: `Not found`,
//       };
//     }
//     return group;
// };

module.exports = {
  getThesisList,
  getSubmissionDetailsById,
  getStudentListByClassroomId,
  getDosenList,
  getAdvisorTeamById,
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
};
