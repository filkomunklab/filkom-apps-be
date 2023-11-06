//Layer untuk handle business logic

const {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  deleteObject,
} = require("firebase/storage");
const { storage } = require("../../../config/firebase");
const skripsiRepository = require("./skripsi.repository");
const groupRepository = require("../group/group.repository");
const groupStudentRepository = require("../group_student/group_student.repository");
const employeeRepository = require("../employee/employee.repository");
const studentRepository = require("../student/student.repository");
const skripsiAssessmentRepository = require("../skripsi_assessment/skripsi_assessment.repository");
const skripsiChangesRepository = require("../skripsi_changes/skripsi_changes.repository");
const classroomRepository = require("../classroom/classroom.repository");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get skripsi by id
// @used            updateSkripsiDocumentById, deleteSkripsiDocumentById,
//                  approveSkripsiDocumentById, rejectSkripsiDocumentById,
//                  updateSkripsiPaymentById, deleteSkripsiPaymentById,
//                  updateSkripsiPaymentById, getSkripsiPaymentById,
//                  updateSkripsiPlagiarismById, deleteSkripsiPlagiarismById,
//                  updateSkripsiScheduleById, openAccessSkripsiReportById,
//                  signSkripsiReportById, updateSkripsiConclusionById,
//                  getAllSkripsiAssessmentById, updateSkripsiRevisionDocumentById,
//                  deleteSkripsiRevisionDocumentById, approveSkripsiRevisionDocumentById,
//                  rejectSkripsiRevisionDocumentById,
const getSkripsiById = async (id) => {
  const skripsi = await skripsiRepository.findSkripsiById(id);
  if (!skripsi) {
    throw {
      status: 400,
      message: `Skripsi not found`,
    };
  }
  return skripsi;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get group_student by student_id & group_id (check student in group_student)
// @used            updateSkripsiDocumentById, deleteSkripsiDocumentById,
//                  updateSkripsiPaymentById, deleteSkripsiPaymentById,
//                  updateSkripsiPlagiarismById,
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
// @description     Upload dokumen skripsi
// @route           PUT /skripsi/skripsi-document/:id
// @access          MAHASISWA
const updateSkripsiDocumentById = async (userId, id, payload) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // delete existing file
  if (skripsi.file_name_skripsi) {
    // file
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      `skripsi/${group.id}/${skripsi.file_name_skripsi}`
    );
    // Delete the file
    await deleteObject(desertRef);
  }

  // file
  const storageRef = ref(
    storage,
    `skripsi/${group.id}/${payload.skripsi_file.file_name_skripsi}`
  );
  const metadata = { contentType: "application/pdf" };
  const binaryString = atob(payload.skripsi_file.buffer);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  await uploadBytes(storageRef, byteArray, metadata);
  const path = await getDownloadURL(storageRef);

  // update skripsi document
  const UpdatedSkripsi = await skripsiRepository.updateSkripsiDocumentById(
    id,
    payload,
    path
  );

  // check approve by advisor
  if (UpdatedSkripsi.is_skripsi_approve_by_advisor !== "Approve") {
    await skripsiRepository.updateSkripsiDocumentApproveByAdvisorById(id);
  }
  // check approve by co-advisor1
  if (UpdatedSkripsi.is_skripsi_approve_by_co_advisor1 !== "Approve") {
    await skripsiRepository.updateSkripsiDocumentApproveByCoAdvisor1ById(id);
  }
  // check approve by co-advisor2
  if (UpdatedSkripsi.is_skripsi_approve_by_co_advisor2 !== "Approve") {
    await skripsiRepository.updateSkripsiDocumentApproveByCoAdvisor2ById(id);
  }

  // last check skripsi
  const lastUpdatedSkripsi = await getSkripsiById(id);

  const Data = {
    id: UpdatedSkripsi.id,
    file_name_skripsi: UpdatedSkripsi.file_name_skripsi,
    upload_date_skripsi: UpdatedSkripsi.upload_date_skripsi,
    file_size_skripsi: UpdatedSkripsi.file_size_skripsi,
    file_path_skripsi: UpdatedSkripsi.file_path_skripsi,
    is_skripsi_approve_by_advisor:
      lastUpdatedSkripsi.is_skripsi_approve_by_advisor,
    is_skripsi_approve_by_co_advisor1:
      lastUpdatedSkripsi.is_skripsi_approve_by_co_advisor1,
    is_skripsi_approve_by_co_advisor2:
      lastUpdatedSkripsi.is_skripsi_approve_by_co_advisor2,
  };
  return Data;
};

//===================================================================
// @description     Get dokumen skripsi
// @route           GET /skripsi/skripsi-document/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN
const getSkripsiDocumentById = async (id) => {
  const skripsi = await skripsiRepository.findSkripsiDocumentById(id);
  if (!skripsi) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  const Data = {
    id: skripsi.id,
    file_name_skripsi: skripsi.file_name_skripsi,
    upload_date_skripsi: skripsi.upload_date_skripsi,
    file_size_skripsi: skripsi.file_size_skripsi,
    file_path_skripsi: skripsi.file_path_skripsi,
    is_skripsi_approve_by_advisor: skripsi.is_skripsi_approve_by_advisor,
    is_skripsi_approve_by_co_advisor1:
      skripsi.is_skripsi_approve_by_co_advisor1,
    is_skripsi_approve_by_co_advisor2:
      skripsi.is_skripsi_approve_by_co_advisor2,
  };
  return Data;
};

//===================================================================
// @description     Delete/Update dokumen skripsi
// @route           PUT /skripsi/skripsi-document/delete/:id
// @access          MAHASISWA
const deleteSkripsiDocumentById = async (userId, id) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // file
  const storage = getStorage();
  // Create a reference to the file to delete
  const desertRef = ref(
    storage,
    `skripsi/${group.id}/${skripsi.file_name_skripsi}`
  );
  // Delete the file
  await deleteObject(desertRef);

  // delete/update skripsi document
  const UpdatedSkripsi = await skripsiRepository.deleteSkripsiDocumentById(id);

  // check approve by advisor
  if (
    UpdatedSkripsi.is_skripsi_approve_by_advisor !== "Approve" &&
    UpdatedSkripsi.is_skripsi_approve_by_advisor !== "Rejected"
  ) {
    await skripsiRepository.deleteSkripsiDocumentApproveByAdvisorById(id);
  }
  // check approve by co-advisor1
  if (
    UpdatedSkripsi.is_skripsi_approve_by_co_advisor1 !== "Approve" &&
    UpdatedSkripsi.is_skripsi_approve_by_co_advisor1 !== "Rejected"
  ) {
    await skripsiRepository.deleteSkripsiDocumentApproveByCoAdvisor1ById(id);
  }
  // check approve by co-advisor2
  if (
    UpdatedSkripsi.is_skripsi_approve_by_co_advisor2 !== "Approve" &&
    UpdatedSkripsi.is_skripsi_approve_by_co_advisor2 !== "Rejected"
  ) {
    await skripsiRepository.deleteSkripsiDocumentApproveByCoAdvisor2ById(id);
  }
};

//===================================================================
// @description     Approve dokumen skripsi
// @route           PUT /skripsi/skripsi-document/approve/:id
// @access          DOSEN
const approveSkripsiDocumentById = async (userId, id) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // check exist skripsi document
  if (
    skripsi.file_name_skripsi === null &&
    skripsi.file_size_skripsi === null
  ) {
    throw {
      status: 400,
      message: `There are no files to approve`,
    };
  }
  // check apakah advisor
  const advisor = await skripsiRepository.findAdvisorInSkripsiByIdAndAdvisorId(
    skripsi.id,
    userId
  );
  // check apakah co-advisor1
  const co_advisor1 =
    await skripsiRepository.findCoAdvisor1InSkripsiByIdAndAdvisorId(
      skripsi.id,
      userId
    );
  // check apakah co-advisor2
  const co_advisor2 =
    await skripsiRepository.findCoAdvisor2InSkripsiByIdAndAdvisorId(
      skripsi.id,
      userId
    );

  if (advisor) {
    if (advisor.is_skripsi_approve_by_advisor === "Approve") {
      throw {
        status: 400,
        message: `File has been approved`,
      };
    } else {
      const UpdatedSkripsi =
        await skripsiRepository.approveSkripsiDocumentByAdvisorById(id);
      const Data = {
        is_skripsi_approve_by_advisor:
          UpdatedSkripsi.is_skripsi_approve_by_advisor,
        advisor_skripsi_approved_date:
          UpdatedSkripsi.advisor_skripsi_approved_date,
      };
      return Data;
    }
  }
  if (co_advisor1) {
    if (co_advisor1.is_skripsi_approve_by_co_advisor1 === "Approve") {
      throw {
        status: 400,
        message: `File has been approved`,
      };
    } else {
      const UpdatedSkripsi =
        await skripsiRepository.approveSkripsiDocumentByCoAdvisor1ById(id);
      const Data = {
        is_skripsi_approve_by_co_advisor1:
          UpdatedSkripsi.is_skripsi_approve_by_co_advisor1,
        co_advisor1_skripsi_approved_date:
          UpdatedSkripsi.co_advisor1_skripsi_approved_date,
      };
      return Data;
    }
  }
  if (co_advisor2) {
    if (co_advisor2.is_skripsi_approve_by_co_advisor1 === "Approve") {
      throw {
        status: 400,
        message: `File has been approved`,
      };
    } else {
      const UpdatedSkripsi =
        await skripsiRepository.approveSkripsiDocumentByCoAdvisor2ById(id);
      const Data = {
        is_skripsi_approve_by_co_advisor2:
          UpdatedSkripsi.is_skripsi_approve_by_co_advisor2,
        co_advisor2_skripsi_approved_date:
          UpdatedSkripsi.co_advisor2_skripsi_approved_date,
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
// @description     Reject dokumen skripsi
// @route           PUT /skripsi/skripsi-document/reject/:id
// @access          DOSEN
const rejectSkripsiDocumentById = async (userId, id) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // check exist skripsi document
  if (
    skripsi.file_name_skripsi === null &&
    skripsi.file_size_skripsi === null
  ) {
    throw {
      status: 400,
      message: `There are no files to reject`,
    };
  }
  // check apakah advisor
  const advisor = await skripsiRepository.findAdvisorInSkripsiByIdAndAdvisorId(
    skripsi.id,
    userId
  );
  // check apakah co-advisor1
  const co_advisor1 =
    await skripsiRepository.findCoAdvisor1InSkripsiByIdAndAdvisorId(
      skripsi.id,
      userId
    );
  // check apakah co-advisor2
  const co_advisor2 =
    await skripsiRepository.findCoAdvisor2InSkripsiByIdAndAdvisorId(
      skripsi.id,
      userId
    );

  if (advisor) {
    if (
      advisor.is_skripsi_approve_by_advisor === "Rejected" ||
      advisor.is_skripsi_approve_by_advisor === "Approve"
    ) {
      throw {
        status: 400,
        message: `File has been rejected or approved`,
      };
    } else {
      const UpdatedSkripsi =
        await skripsiRepository.rejectSkripsiDocumentByAdvisorById(id);
      const Data = {
        is_skripsi_approve_by_advisor:
          UpdatedSkripsi.is_skripsi_approve_by_advisor,
        advisor_skripsi_approved_date:
          UpdatedSkripsi.advisor_skripsi_approved_date,
      };
      return Data;
    }
  }
  if (co_advisor1) {
    if (
      co_advisor1.is_skripsi_approve_by_co_advisor1 === "Rejected" ||
      co_advisor1.is_skripsi_approve_by_co_advisor1 === "Approve"
    ) {
      throw {
        status: 400,
        message: `File has been rejected or approved`,
      };
    } else {
      const UpdatedSkripsi =
        await skripsiRepository.rejectSkripsiDocumentByCoAdvisor1ById(id);
      const Data = {
        is_skripsi_approve_by_co_advisor1:
          UpdatedSkripsi.is_skripsi_approve_by_co_advisor1,
        co_advisor1_skripsi_approved_date:
          UpdatedSkripsi.co_advisor1_skripsi_approved_date,
      };
      return Data;
    }
  }
  if (co_advisor2) {
    if (
      co_advisor2.is_skripsi_approve_by_co_advisor1 === "Rejected" ||
      co_advisor2.is_skripsi_approve_by_co_advisor1 === "Approve"
    ) {
      throw {
        status: 400,
        message: `File has been rejected or approved`,
      };
    } else {
      const UpdatedSkripsi =
        await skripsiRepository.rejectSkripsiDocumentByCoAdvisor2ById(id);
      const Data = {
        is_skripsi_approve_by_co_advisor2:
          UpdatedSkripsi.is_skripsi_approve_by_co_advisor2,
        co_advisor2_skripsi_approved_date:
          UpdatedSkripsi.co_advisor2_skripsi_approved_date,
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
// @route           PUT /skripsi/skripsi-payment/:id
// @access          MAHASISWA
const updateSkripsiPaymentById = async (id, userId, payload) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // delete existing file
  if (skripsi.file_path_payment) {
    // file
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      `skripsi/${group.id}/${skripsi.file_name_payment}`
    );
    // Delete the file
    await deleteObject(desertRef);
  }

  // file
  const storageRef = ref(
    storage,
    `skripsi/${group.id}/${payload.payment_file.file_name_payment}`
  );
  const metadata = { contentType: "application/pdf" };
  const binaryString = atob(payload.payment_file.buffer);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  await uploadBytes(storageRef, byteArray, metadata);
  const path = await getDownloadURL(storageRef);

  // update skripsi document
  const UpdatedSkripsi = await skripsiRepository.updateSkripsiPaymentById(
    id,
    payload,
    path
  );
  return UpdatedSkripsi;
};

//===================================================================
// @description     Get bukti pembayaran
// @route           GET /skripsi/skripsi-payment/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getSkripsiPaymentById = async (id) => {
  const skripsi = await skripsiRepository.findSkripsiPaymentById(id);
  if (!skripsi) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return skripsi;
};

//===================================================================
// @description     Delete/Update bukti pembayaran
// @route           DELETE /skripsi/skripsi-payment/delete/:id
// @access          MAHASISWA
const deleteSkripsiPaymentById = async (id, userId) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // file
  const storage = getStorage();
  // Create a reference to the file to delete
  const desertRef = ref(
    storage,
    `skripsi/${group.id}/${skripsi.file_name_payment}`
  );
  // Delete the file
  await deleteObject(desertRef);

  // delete/update skripsi document
  await skripsiRepository.deleteSkripsiPaymentById(id);
};

//===================================================================
// @description     Upload/Update bukti hasil cek plagiat
// @route           PUT /skripsi/skripsi-plagiarism-check/:id
// @access          MAHASISWA
const updateSkripsiPlagiarismById = async (id, userId, payload) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // delete existing file
  if (skripsi.file_name_plagiarismcheck) {
    // file
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      `skripsi/${group.id}/${skripsi.file_name_plagiarismcheck}`
    );
    // Delete the file
    await deleteObject(desertRef);
  }

  // file
  const storageRef = ref(
    storage,
    `skripsi/${group.id}/${payload.plagiarism_file.file_name_plagiarismcheck}`
  );
  const metadata = { contentType: "application/pdf" };
  const binaryString = atob(payload.plagiarism_file.buffer);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  await uploadBytes(storageRef, byteArray, metadata);
  const path = await getDownloadURL(storageRef);

  // update skripsi plagiarism
  const UpdatedSkripsi = await skripsiRepository.updateSkripsiPlagiarismById(
    id,
    payload,
    path
  );
  return UpdatedSkripsi;
};

//===================================================================
// @description     Get bukti hasil cek plagiat
// @route           PUT /skripsi/skripsi-plagiarism-check/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getSkripsiPlagiarismById = async (id) => {
  const skripsi = await skripsiRepository.findSkripsiPlagiarismById(id);
  if (!skripsi) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return skripsi;
};

//===================================================================
// @description     Delete/Update bukti hasil cek plagiat
// @route           PUT /skripsi/skripsi-plagiarism-check/delete/:id
// @access          MAHASISWA
const deleteSkripsiPlagiarismById = async (id, userId) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // file
  const storage = getStorage();
  // Create a reference to the file to delete
  const desertRef = ref(
    storage,
    `skripsi/${group.id}/${skripsi.file_name_plagiarismcheck}`
  );
  // Delete the file
  await deleteObject(desertRef);

  // delete/update skripsi plagiarism
  await skripsiRepository.deleteSkripsiPlagiarismById(id);
};

//===================================================================
// @description     Get all skripsi schedule
// @route           GET /skripsi/schedule
// @access          OPERATOR_FAKULTAS
const getAllSkripsiSchedule = async () => {
  const skripsi = await skripsiRepository.findAllSkripsiSchedule();
  if (!skripsi) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  // Dapatkan semua skripsi_id di sini
  const skripsiIds = skripsi.map((skripsi) => skripsi.id);

  // Dapatkan grup berdasarkan skripsiIds
  const groups = await groupRepository.findManyGroupsBySkripsiIds(skripsiIds);

  const scheduleBySemester = {};

  // Menggabungkan data skripsi dengan data grup
  await Promise.all(
    skripsi.map(async (skripsi) => {
      const group = groups.find((group) => group.skripsi_id === skripsi.id);
      // Menggabungkan firstName dan lastName menjadi fullName
      const getEmployeeNameAndDegree = async (firstName, lastName, degree) => {
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
        skripsi.advisor.firstName,
        skripsi.advisor.lastName,
        skripsi.advisor.degree
      );
      const panelistChairmanName = await getEmployeeNameAndDegree(
        skripsi.panelist_chairman?.firstName,
        skripsi.panelist_chairman?.lastName,
        skripsi.panelist_chairman?.degree
      );
      const panelistMemberName = await getEmployeeNameAndDegree(
        skripsi.panelist_member?.firstName,
        skripsi.panelist_member?.lastName,
        skripsi.panelist_member?.degree
      );

      // get classroom
      if (group && skripsi.classroom_id) {
        const classroom = await classroomRepository.findClassroomById(
          skripsi.classroom_id
        );

        const data = {
          group_id: group.id,
          skripsi_id: skripsi.id,
          title: group.title,
          advisor: advisorName,
          panelist_chairman: panelistChairmanName || null,
          panelist_member: panelistMemberName || null,
          start_defence: skripsi.start_defence,
          end_defence: skripsi.end_defence,
          defence_room: skripsi.defence_room,
          defence_date: skripsi.defence_date,
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
    })
  );
  // Convert the scheduleBySemester object into an array of semesters
  const scheduleList = Object.values(scheduleBySemester);

  return scheduleList;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Check conflict between schedule
// @used            updateSkripsiScheduleById
const checkScheduleConflict = async (id, payload) => {
  const { start_defence, end_defence, defence_room, defence_date } = payload;

  // // Konversi tanggal payload ke format yang sesuai
  // const formattedPayloadDate = formatDate(defence_date); // Anda perlu membuat fungsi formatDate

  // Query database untuk jadwal yang relevan, kecuali jadwal yang akan diupdate
  const conflictingSchedules =
    await skripsiRepository.findAllConflictingSkripsiSchedule(
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
// @description     Create/Update skripsi schedule
// @route           PUT /skripsi/schedule/:id
// @access          OPERATOR_FAKULTAS
const updateSkripsiScheduleById = async (id, payload) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);

  // check if has defence
  if (skripsi.is_pass) {
    throw {
      status: 400,
      message: `Can't perform this action`,
    };
  }

  // check conflict between schedule
  const isConflict = await checkScheduleConflict(skripsi.id, payload);
  console.log(isConflict);
  if (isConflict) {
    throw {
      status: 400,
      message: `Conflict`,
    };
  }

  const updatedSkripsi = await skripsiRepository.updateSkripsiScheduleById(
    id,
    payload
  );
  return updatedSkripsi;
};

//===================================================================
// @description     Get skripsi schedule
// @route           GET /skripsi/schedule/:id
// @access          OPERATOR_FAKULTAS
const getSkripsiScheduleById = async (id) => {
  const skripsi = await skripsiRepository.findSkripsiScheduleById(id);
  if (!skripsi) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  const group = await groupRepository.findGroupBySkripsiId(id);
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

  const panelistChairman = formatNameWithDegree(skripsi.panelist_chairman);
  const panelistMember = formatNameWithDegree(skripsi.panelist_member);
  const advisor = formatNameWithDegree(skripsi.advisor);
  const scheduleData = {
    id: skripsi.id,
    title: group.title,
    students,
    panelist_chairman: panelistChairman,
    panelist_member: panelistMember,
    advisor: advisor,
    start_defence: skripsi.start_defence,
    end_defence: skripsi.end_defence,
    defence_room: skripsi.defence_room,
    defence_date: skripsi.defence_date,
  };
  return scheduleData;
};

//===================================================================
// @description     Open report
// @route           PUT /skripsi/skripsi-report/open-access/:id
// @access          DOSEN
const openAccessSkripsiReportById = async (id, userId) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // check if dosen is panelist chairman
  if (skripsi.panelist_chairman_id === userId) {
    // check if already openend
    if (skripsi.is_report_open) {
      throw {
        status: 400,
        message: `Report has opened`,
      };
    }
    const updatedSkripsi = await skripsiRepository.openAccessSkripsiReportById(
      id
    );
    // check if success open report
    if (updatedSkripsi) {
      // get group
      const group = await groupRepository.findGroupBySkripsiId(skripsi.id);

      // get group_student -> student_id
      const studentIds = await groupStudentRepository.findGroupStudentByGroupId(
        group.id
      );
      // looping to create empty assessment for all student
      for (const student of studentIds) {
        // create empty assessment for chairman
        await skripsiAssessmentRepository.insertEmptySkripsiAssessment(
          skripsi.id,
          student,
          skripsi.panelist_chairman_id
        );
        // create empty assessment for member
        await skripsiAssessmentRepository.insertEmptySkripsiAssessment(
          skripsi.id,
          student,
          skripsi.panelist_member_id
        );
        // create empty assessment for advisor
        await skripsiAssessmentRepository.insertEmptySkripsiAssessment(
          skripsi.id,
          student,
          skripsi.advisor_id
        );
      }
      // create empty change for chairman
      await skripsiChangesRepository.insertEmptySkripsiChanges(
        skripsi.id,
        skripsi.panelist_chairman_id
      );
      // create empty change for member
      await skripsiChangesRepository.insertEmptySkripsiChanges(
        skripsi.id,
        skripsi.panelist_member_id
      );
      // create empty change for advisor
      await skripsiChangesRepository.insertEmptySkripsiChanges(
        skripsi.id,
        skripsi.advisor_id
      );
      if (skripsi.co_advisor1_id) {
        // create empty change for co-advisor1
        await skripsiChangesRepository.insertEmptySkripsiChanges(
          skripsi.id,
          skripsi.co_advisor1_id
        );
      }
      if (skripsi.co_advisor2_id) {
        // create empty change for co-advisor2
        await skripsiChangesRepository.insertEmptySkripsiChanges(
          skripsi.id,
          skripsi.co_advisor2_id
        );
      }
    }
    return updatedSkripsi;
  } else {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }
};

//===================================================================
// @description     Update skripsi assessment by id
// @route           PUT /skripsi/skripsi-assessment/:id
// @access          DOSEN
const updateSkripsiAssessmentById = async (id, userId, payload) => {
  // check existing assessment
  const assessment =
    await skripsiAssessmentRepository.findSkripsiAssessmentBySkripsiIdAndStudentIdAndDosenId(
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
    await skripsiAssessmentRepository.updateSkripsiAssessmentById(
      assessment.id,
      payload.value
    );
  return updateAssessment;
};

//===================================================================
// @description     Get all skripsi assessment by id
// @route           GET /skripsi/skripsi-assessment/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getAllSkripsiAssessmentById = async (id) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);

  const skripsiAssessment =
    await skripsiAssessmentRepository.findAllSkripsiAssessmentBySkripsiId(id);
  if (!skripsiAssessment) {
    throw {
      status: 400,
      message: `Skripsi assessment not found`,
    };
  }

  const groupedSkripsiAssessment = {};
  // Kelompokkan skripsi_assessment berdasarkan student_id
  skripsiAssessment.forEach((assessment) => {
    const studentId = assessment.student_id;

    if (!groupedSkripsiAssessment[studentId]) {
      groupedSkripsiAssessment[studentId] = [];
    }

    groupedSkripsiAssessment[studentId].push(assessment);
  });

  const result = [];

  for (const studentId in groupedSkripsiAssessment) {
    const student = await studentRepository.findStudentById(studentId);
    let fullName = student.firstName;
    if (student.lastName) {
      fullName += ` ${student.lastName}`;
    }

    const chairmanValue = groupedSkripsiAssessment[studentId].find(
      (assessment) => assessment.dosen_id === skripsi.panelist_chairman_id
    );

    const memberValue = groupedSkripsiAssessment[studentId].find(
      (assessment) => assessment.dosen_id === skripsi.panelist_member_id
    );

    const advisorValue = groupedSkripsiAssessment[studentId].find(
      (assessment) => assessment.dosen_id === skripsi.advisor_id
    );

    const studentData = {
      skripsi_id: skripsi.id,
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
// @description     Update skripsi changes by id
// @route           PUT /skripsi/skripsi-changes/:id
// @access          DOSEN
const updateSkripsiChangesById = async (id, userId, payload) => {
  // check existing change
  const change =
    await skripsiChangesRepository.findSkripsiChangesBySkripsiIdAndDosenId(
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
  const updateChange = await skripsiChangesRepository.updateSkripsiChangeById(
    change.id,
    payload.changes
  );
  return updateChange;
};

//===================================================================
// @description     Get all skripsi changes by id
// @route           GET /skripsi/skripsi-changes/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getAllSkripsiChangesById = async (id) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);

  const skripsiChanges =
    await skripsiChangesRepository.findAllSkripsiChangesBySkripsiId(id);
  if (!skripsiChanges) {
    throw {
      status: 400,
      message: `Skripsi changes not found`,
    };
  }

  const chairmanChanges = skripsiChanges.find(
    (changes) => changes.dosen_id === skripsi.panelist_chairman_id
  );

  const memberChanges = skripsiChanges.find(
    (changes) => changes.dosen_id === skripsi.panelist_member_id
  );

  const advisorChanges = skripsiChanges.find(
    (changes) => changes.dosen_id === skripsi.advisor_id
  );

  const coAdvisor1Changes = skripsiChanges.find(
    (changes) => changes.dosen_id === skripsi.co_advisor1_id
  );

  const coAdvisor2Changes = skripsiChanges.find(
    (changes) => changes.dosen_id === skripsi.co_advisor2_id
  );

  const changesData = {
    skripsi_id: skripsi.id,
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
// @route           GET /skripsi/skripsi-report/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getSkripsiReportById = async (id) => {
  const skripsi = await skripsiRepository.findSkripsiReportById(id);
  if (!skripsi) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return skripsi;
};

//===================================================================
// @description     Fill/Update report
// @route           PUT /skripsi/skripsi-report/:id
// @access          DOSEN, DEKAN
const signSkripsiReportById = async (id, userId) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  if (skripsi.is_report_open) {
    if (skripsi.panelist_chairman_id === userId) {
      const updatedSkripsi =
        await skripsiRepository.signChairmanSkripsiReportById(id);
      return updatedSkripsi;
    } else if (skripsi.panelist_member_id === userId) {
      const updatedSkripsi =
        await skripsiRepository.signMemberSkripsiReportById(id);
      return updatedSkripsi;
    } else if (skripsi.advisor_id === userId) {
      const updatedSkripsi =
        await skripsiRepository.signAdvisorSkripsiReportById(id);
      return updatedSkripsi;
    } else {
      const updatedSkripsi = await skripsiRepository.signDekanSkripsiReportById(
        id
      );
      return updatedSkripsi;
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
// @route           PUT /skripsi/skripsi-report/conclusion/:id
// @access          DOSEN
const updateSkripsiConclusionById = async (id, userId, payload) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);

  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(id);

  // get group_student by group_id
  const groupStudent = await groupStudentRepository.findGroupStudentByGroupId(
    group.id
  );

  // Get all skripsi_id in here
  const studentIds = groupStudent.map((student) => student.id);

  // Check assessments for all students
  const allAssessmentsExist = studentIds.every(async (studentId) => {
    // check chairman assessment
    const chairmanAssessment =
      await skripsiAssessmentRepository.findSkripsiAssessmentBySkripsiIdAndStudentIdAndDosenId(
        id,
        studentId,
        skripsi.panelist_chairman_id
      );
    // check member assessment
    const memberAssessment =
      await skripsiAssessmentRepository.findSkripsiAssessmentBySkripsiIdAndStudentIdAndDosenId(
        id,
        studentId,
        skripsi.panelist_member_id
      );
    // check advisor assessment
    const advisorAssessment =
      await skripsiAssessmentRepository.findSkripsiAssessmentBySkripsiIdAndStudentIdAndDosenId(
        id,
        studentId,
        skripsi.advisor_id
      );

    return chairmanAssessment && memberAssessment && advisorAssessment;
  });

  // check chairman changes
  const chairmanChanges =
    await skripsiChangesRepository.findSkripsiChangesBySkripsiIdAndDosenId(
      id,
      skripsi.panelist_chairman_id
    );
  // check member changes
  const memberChanges =
    await skripsiChangesRepository.findSkripsiChangesBySkripsiIdAndDosenId(
      id,
      skripsi.panelist_member_id
    );
  // check advisor changes
  const advisorChanges =
    await skripsiChangesRepository.findSkripsiChangesBySkripsiIdAndDosenId(
      id,
      skripsi.advisor_id
    );

  if (
    allAssessmentsExist &&
    chairmanChanges &&
    memberChanges &&
    advisorChanges
  ) {
    console.log("sudah terisi");
    if (skripsi.panelist_chairman_id === userId) {
      if (
        skripsi.is_report_approve_by_panelist_chairman &&
        skripsi.is_report_approve_by_panelist_member &&
        skripsi.is_report_approve_by_advisor
      ) {
        const updatedSkripsi =
          await skripsiRepository.updateSkripsiConclusionById(id, payload);
        return updatedSkripsi;
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
// @route           GET /skripsi/skripsi-report/conclusion/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getSkripsiConclusionById = async (id) => {
  const skripsi = await skripsiRepository.findSkripsiConclusionById(id);
  if (!skripsi) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return skripsi;
};

//===================================================================
// @description     Upload/Update dokumen revisi skripsi
// @route           PUT /skripsi/skripsi-revision-document/:id
// @access          MAHASISWA
const updateSkripsiRevisionDocumentById = async (id, userId, payload) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // delete existing file
  if (skripsi.file_name_revision) {
    // file
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      `skripsi/${group.id}/${skripsi.file_name_revision}`
    );
    // Delete the file
    await deleteObject(desertRef);
  }

  // file
  const storageRef = ref(
    storage,
    `skripsi/${group.id}/${payload.revision_file.file_name_revision}`
  );
  const metadata = { contentType: "application/pdf" };
  const binaryString = atob(payload.revision_file.buffer);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  await uploadBytes(storageRef, byteArray, metadata);
  const path = await getDownloadURL(storageRef);

  // update skripsi revision document
  const updatedSkripsi =
    await skripsiRepository.updateSkripsiRevisionDocumentById(
      id,
      payload,
      path
    );

  // check approve by chairman
  if (updatedSkripsi.is_revision_approve_by_panelist_chairman !== "Approve") {
    await skripsiRepository.updateSkripsiRevisionDocumentApproveByChairmanById(
      id
    );
  }
  // check approve by member
  if (updatedSkripsi.is_revision_approve_by_panelist_member !== "Approve") {
    await skripsiRepository.updateSkripsiRevisionDocumentApproveByMemberById(
      id
    );
  }
  // check approve by advisor
  if (updatedSkripsi.is_revision_approve_by_advisor !== "Approve") {
    await skripsiRepository.updateSkripsiRevisionDocumentApproveByAdvisorById(
      id
    );
  }

  // last check skripsi
  const lastUpdatedSkripsi = await getSkripsiById(id);

  const Data = {
    id: updatedSkripsi.id,
    file_name_revision: updatedSkripsi.file_name_revision,
    upload_date_revision: updatedSkripsi.upload_date_revision,
    file_size_revision: updatedSkripsi.file_size_revision,
    file_path_revision: updatedSkripsi.file_path_revision,
    is_revision_approve_by_panelist_chairman:
      lastUpdatedSkripsi.is_revision_approve_by_panelist_chairman,
    is_revision_approve_by_panelist_member:
      lastUpdatedSkripsi.is_revision_approve_by_panelist_member,
    is_revision_approve_by_advisor:
      lastUpdatedSkripsi.is_revision_approve_by_advisor,
  };
  return Data;
};

//===================================================================
// @description     Get dokumen revisi skripsi
// @route           GET /skripsi/skripsi-revision-document/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getSkripsiRevisionDocumentById = async (id) => {
  const skripsi = await skripsiRepository.findSkripsiRevisionDocumentById(id);
  if (!skripsi) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  const Data = {
    id: skripsi.id,
    file_name_revision: skripsi.file_name_revision,
    upload_date_revision: skripsi.upload_date_revision,
    file_size_revision: skripsi.file_size_revision,
    file_path_revision: skripsi.file_path_revision,
    is_revision_approve_by_panelist_chairman:
      skripsi.is_revision_approve_by_panelist_chairman,
    is_revision_approve_by_panelist_member:
      skripsi.is_revision_approve_by_panelist_member,
    is_revision_approve_by_advisor: skripsi.is_revision_approve_by_advisor,
  };
  return Data;
};

//===================================================================
// @description     Delete/Update dokumen revisi skripsi
// @route           PUT /skripsi/skripsi-revision-document/delete/:id
// @access          MAHASISWA
const deleteSkripsiRevisionDocumentById = async (id, userId) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // file
  const storage = getStorage();
  // Create a reference to the file to delete
  const desertRef = ref(
    storage,
    `skripsi/${group.id}/${skripsi.file_name_revision}`
  );
  // Delete the file
  await deleteObject(desertRef);

  // delete/update skripsi revision document
  const updatedSkripsi =
    await skripsiRepository.deleteSkripsiRevisionDocumentById(id);

  // check approve by chairman
  if (
    updatedSkripsi.is_revision_approve_by_panelist_chairman !== "Approve" &&
    updatedSkripsi.is_revision_approve_by_panelist_chairman !== "Rejected"
  ) {
    await skripsiRepository.deleteSkripsiRevisionDocumentApproveByChairmanById(
      id
    );
  }
  // check approve by member
  if (
    updatedSkripsi.is_revision_approve_by_panelist_member !== "Approve" &&
    updatedSkripsi.is_revision_approve_by_panelist_member !== "Rejected"
  ) {
    await skripsiRepository.deleteSkripsiRevisionDocumentApproveByMemberById(
      id
    );
  }
  // check approve by advisor
  if (
    updatedSkripsi.is_revision_approve_by_advisor !== "Approve" &&
    updatedSkripsi.is_revision_approve_by_advisor !== "Rejected"
  ) {
    await skripsiRepository.deleteSkripsiRevisionDocumentApproveByAdvisorById(
      id
    );
  }
};

//===================================================================
// @description     Approve dokumen revisi skripsi
// @route           PUT /skripsi/skripsi-revision-document/approve/:id
// @access          DOSEN
const approveSkripsiRevisionDocumentById = async (id, userId) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);

  // check exist skripsi document
  if (
    skripsi.file_name_revision === null &&
    skripsi.file_size_revision === null
  ) {
    throw {
      status: 400,
      message: `There are no files to approve`,
    };
  }
  // check apakah chairman
  const chairman =
    await skripsiRepository.findChairmanInSkripsiByIdAndChairmanId(
      skripsi.id,
      userId
    );
  // check apakah member
  const member = await skripsiRepository.findMemberInSkripsiByIdAndMemberId(
    skripsi.id,
    userId
  );
  // check apakah advisor
  const advisor = await skripsiRepository.findAdvisorInSkripsiByIdAndAdvisorId(
    skripsi.id,
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
      const UpdatedSkripsi =
        await skripsiRepository.approveSkripsiRevisionDocumentByChairmanById(
          id
        );
      // if all panelis approved
      if (
        UpdatedSkripsi.is_revision_approve_by_panelist_chairman === "Approve" &&
        UpdatedSkripsi.is_revision_approve_by_panelist_member === "Approve" &&
        UpdatedSkripsi.is_revision_approve_by_advisor === "Approve"
      ) {
        // update progress in group to "Skripsi"
        await groupRepository.updateGroupProgressBySkripsiId(UpdatedSkripsi.id);
      }
      const Data = {
        is_revision_approve_by_panelist_chairman:
          UpdatedSkripsi.is_revision_approve_by_panelist_chairman,
        panelist_chairman_revision_approve_date:
          UpdatedSkripsi.panelist_chairman_revision_approve_date,
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
      const UpdatedSkripsi =
        await skripsiRepository.approveSkripsiRevisionDocumentByMemberById(id);
      // if all panelis approved
      if (
        UpdatedSkripsi.is_revision_approve_by_panelist_chairman === "Approve" &&
        UpdatedSkripsi.is_revision_approve_by_panelist_member === "Approve" &&
        UpdatedSkripsi.is_revision_approve_by_advisor === "Approve"
      ) {
        // update progress in group to "Skripsi"
        await groupRepository.updateGroupProgressBySkripsiId(UpdatedSkripsi.id);
      }
      const Data = {
        is_revision_approve_by_panelist_member:
          UpdatedSkripsi.is_revision_approve_by_panelist_member,
        panelist_member_revision_approve_date:
          UpdatedSkripsi.panelist_member_revision_approve_date,
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
      const UpdatedSkripsi =
        await skripsiRepository.approveSkripsiRevisionDocumentByAdvisorById(id);
      // if all panelis approved
      if (
        UpdatedSkripsi.is_revision_approve_by_panelist_chairman === "Approve" &&
        UpdatedSkripsi.is_revision_approve_by_panelist_member === "Approve" &&
        UpdatedSkripsi.is_revision_approve_by_advisor === "Approve"
      ) {
        // update progress in group to "Skripsi"
        await groupRepository.updateGroupProgressBySkripsiId(UpdatedSkripsi.id);
      }
      const Data = {
        is_revision_approve_by_advisor:
          UpdatedSkripsi.is_revision_approve_by_advisor,
        advisor_revision_approve_date:
          UpdatedSkripsi.advisor_revision_approve_date,
      };
      return Data;
    }
  }
};

//===================================================================
// @description     Reject dokumen revisi skripsi
// @route           PUT /skripsi/skripsi-revision-document/reject/:id
// @access          DOSEN
const rejectSkripsiRevisionDocumentById = async (id, userId) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);

  // check exist skripsi document
  if (
    skripsi.file_name_revision === null &&
    skripsi.file_size_revision === null
  ) {
    throw {
      status: 400,
      message: `There are no files to approve`,
    };
  }
  // check apakah chairman
  const chairman =
    await skripsiRepository.findChairmanInSkripsiByIdAndChairmanId(
      skripsi.id,
      userId
    );
  // check apakah member
  const member = await skripsiRepository.findMemberInSkripsiByIdAndMemberId(
    skripsi.id,
    userId
  );
  // check apakah advisor
  const advisor = await skripsiRepository.findAdvisorInSkripsiByIdAndAdvisorId(
    skripsi.id,
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
      const UpdatedSkripsi =
        await skripsiRepository.rejectSkripsiRevisionDocumentByChairmanById(id);
      const Data = {
        is_revision_approve_by_panelist_chairman:
          UpdatedSkripsi.is_revision_approve_by_panelist_chairman,
        panelist_chairman_revision_approve_date:
          UpdatedSkripsi.panelist_chairman_revision_approve_date,
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
      const UpdatedSkripsi =
        await skripsiRepository.rejectSkripsiRevisionDocumentByMemberById(id);
      const Data = {
        is_revision_approve_by_panelist_member:
          UpdatedSkripsi.is_revision_approve_by_panelist_member,
        panelist_member_revision_approve_date:
          UpdatedSkripsi.panelist_member_revision_approve_date,
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
      const UpdatedSkripsi =
        await skripsiRepository.rejectSkripsiRevisionDocumentByAdvisorById(id);
      const Data = {
        is_revision_approve_by_advisor:
          UpdatedSkripsi.is_revision_approve_by_advisor,
        advisor_revision_approve_date:
          UpdatedSkripsi.advisor_revision_approve_date,
      };
      return Data;
    }
  }
};

//===================================================================
// @description     Upload/Update dokumen HKI
// @route           PUT /skripsi/hki/:id
// @access          MAHASISWA
const updateHKIById = async (id, userId, payload) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // delete existing file
  if (skripsi.file_name_hki) {
    // file
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      `skripsi/${group.id}/${skripsi.file_name_hki}`
    );
    // Delete the file
    await deleteObject(desertRef);
  }

  // file
  const storageRef = ref(
    storage,
    `skripsi/${group.id}/${payload.hki_file.file_name_hki}`
  );
  const metadata = { contentType: "application/pdf" };
  const binaryString = atob(payload.hki_file.buffer);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  await uploadBytes(storageRef, byteArray, metadata);
  const path = await getDownloadURL(storageRef);

  // update skripsi document
  const UpdatedSkripsi = await skripsiRepository.updateHKIById(
    id,
    payload,
    path
  );
  return UpdatedSkripsi;
};

//===================================================================
// @description     Get dokumen HKI
// @route           GET /skripsi/hki/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getHKIById = async (id) => {
  const skripsi = await skripsiRepository.findHKIById(id);
  if (!skripsi) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return skripsi;
};

//===================================================================
// @description     Delete/Update dokumen HKI
// @route           GET /skripsi/hki/delete/:id
// @access          MAHASISWA
const deleteHKIById = async (id, userId) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // file
  const storage = getStorage();
  // Create a reference to the file to delete
  const desertRef = ref(
    storage,
    `skripsi/${group.id}/${skripsi.file_name_hki}`
  );
  // Delete the file
  await deleteObject(desertRef);

  // delete/update skripsi plagiarism
  await skripsiRepository.deleteHKIById(id);
};

//===================================================================
// @description     Upload/Update link source code
// @route           PUT /skripsi/journal/:id
// @access          MAHASISWA
const updateJournalById = async (id, userId, payload) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // delete existing file
  if (skripsi.file_name_journal) {
    // file
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      `skripsi/${group.id}/${skripsi.file_name_journal}`
    );
    // Delete the file
    await deleteObject(desertRef);
  }

  // file
  const storageRef = ref(
    storage,
    `skripsi/${group.id}/${payload.journal_file.file_name_journal}`
  );
  const metadata = { contentType: "application/pdf" };
  const binaryString = atob(payload.journal_file.buffer);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  await uploadBytes(storageRef, byteArray, metadata);
  const path = await getDownloadURL(storageRef);

  // update skripsi document
  const UpdatedSkripsi = await skripsiRepository.updateJournalById(
    id,
    payload,
    path
  );
  return UpdatedSkripsi;
};

//===================================================================
// @description     Get dokumen journal
// @route           GET /skripsi/journal/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getJournalById = async (id) => {
  const skripsi = await skripsiRepository.findJournalById(id);
  if (!skripsi) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return skripsi;
};

//===================================================================
// @description     Delete/Update dokumen journal
// @route           GET /skripsi/journal/delete/:id
// @access          MAHASISWA
const deleteJournalById = async (id, userId) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // file
  const storage = getStorage();
  // Create a reference to the file to delete
  const desertRef = ref(
    storage,
    `skripsi/${group.id}/${skripsi.file_name_journal}`
  );
  // Delete the file
  await deleteObject(desertRef);

  // delete/update skripsi plagiarism
  await skripsiRepository.deleteJournalById(id);
};

//===================================================================
// @description     Upload/Update source code
// @route           PUT /skripsi/source-code/:id
// @access          MAHASISWA
const updateSourceCodeById = async (id, userId, payload) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // delete existing file
  if (skripsi.file_name_sourcecode) {
    // file
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      `skripsi/${group.id}/${skripsi.file_name_sourcecode}`
    );
    // Delete the file
    await deleteObject(desertRef);
  }

  // file
  const storageRef = ref(
    storage,
    `skripsi/${group.id}/${payload.source_code_file.file_name_sourcecode}`
  );
  const metadata = { contentType: "application/pdf" };
  const binaryString = atob(payload.source_code_file.buffer);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  await uploadBytes(storageRef, byteArray, metadata);
  const path = await getDownloadURL(storageRef);

  // update skripsi document
  const UpdatedSkripsi = await skripsiRepository.updateSourceCodeById(
    id,
    payload,
    path
  );
  return UpdatedSkripsi;
};

//===================================================================
// @description     Get source code
// @route           GET /skripsi/source-code/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getSourceCodeById = async (id) => {
  const skripsi = await skripsiRepository.findSourceCodeById(id);
  if (!skripsi) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return skripsi;
};

//===================================================================
// @description     Delete/Update source code
// @route           GET /skripsi/source-code/delete/:id
// @access          MAHASISWA
const deleteSourceCodeById = async (id, userId) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // file
  const storage = getStorage();
  // Create a reference to the file to delete
  const desertRef = ref(
    storage,
    `skripsi/${group.id}/${skripsi.file_name_sourcecode}`
  );
  // Delete the file
  await deleteObject(desertRef);

  // delete/update skripsi plagiarism
  await skripsiRepository.deleteSourceCodeById(id);
};

//===================================================================
// @description     Upload/Update link source code
// @route           PUT /skripsi/link-source-code/:id
// @access          MAHASISWA
const updateLinkSourceCodeById = async (id, userId, payload) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // update skripsi document
  const UpdatedSkripsi = await skripsiRepository.updateLinkSourceCodeById(
    id,
    payload
  );
  return UpdatedSkripsi;
};

//===================================================================
// @description     Get link source code
// @route           GET /skripsi/link-source-code/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getLinkSourceCodeById = async (id) => {
  const skripsi = await skripsiRepository.findLinkSourceCodeById(id);
  if (!skripsi) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return skripsi;
};

//===================================================================
// @description     Delete/Update link source code
// @route           GET /skripsi/link-source-code/delete/:id
// @access          MAHASISWA
const deleteLinkSourceCodeById = async (id, userId) => {
  // check skripsi
  const skripsi = await getSkripsiById(id);
  // get group by skripsi_id
  const group = await groupRepository.findGroupBySkripsiId(skripsi.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // delete/update skripsi plagiarism
  await skripsiRepository.deleteLinkSourceCodeById(id);
};

module.exports = {
  updateSkripsiDocumentById,
  getSkripsiDocumentById,
  deleteSkripsiDocumentById,
  approveSkripsiDocumentById,
  rejectSkripsiDocumentById,

  updateSkripsiPaymentById,
  getSkripsiPaymentById,
  deleteSkripsiPaymentById,

  updateSkripsiPlagiarismById,
  getSkripsiPlagiarismById,
  deleteSkripsiPlagiarismById,

  getAllSkripsiSchedule,
  updateSkripsiScheduleById,
  getSkripsiScheduleById,

  openAccessSkripsiReportById,
  updateSkripsiAssessmentById,
  getAllSkripsiAssessmentById,
  updateSkripsiChangesById,
  getAllSkripsiChangesById,
  getSkripsiReportById,
  signSkripsiReportById,
  updateSkripsiConclusionById,
  getSkripsiConclusionById,

  updateSkripsiRevisionDocumentById,
  getSkripsiRevisionDocumentById,
  deleteSkripsiRevisionDocumentById,
  approveSkripsiRevisionDocumentById,
  rejectSkripsiRevisionDocumentById,

  updateHKIById,
  getHKIById,
  deleteHKIById,
  updateJournalById,
  getJournalById,
  deleteJournalById,
  updateSourceCodeById,
  getSourceCodeById,
  deleteSourceCodeById,
  updateLinkSourceCodeById,
  getLinkSourceCodeById,
  deleteLinkSourceCodeById,
};
