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

module.exports = {
  updateSkripsiDocumentById,
  getSkripsiDocumentById,
  deleteSkripsiDocumentById,
  approveSkripsiDocumentById,
  rejectSkripsiDocumentById,
};
