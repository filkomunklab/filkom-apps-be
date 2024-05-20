const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const certificateRepository = require("./certificate.repository");
const { storage } = require("../../../config/firebase");
const moment = require("moment-timezone");

//===================================DospemAccess=======================//
//Find certificate by category
const viewCertifiacateByCategory = async (category, payload) => {
  try {
    let certificate = await certificateRepository.findCertificateByCategory(
      category,
      payload
    );

    certificate = certificate.map((item) => {
      return {
        ...item,
        title: item.title,
        submitDate: item.submitDate.toString(),
        category: item.category,
        approval_status: item.approval_status,
      };
    });

    return certificate;
  } catch (error) {
    return error;
  }
};

//Waiting List
const advisorWaitingListCertificateView = async (payload) => {
  try {
    let certificate =
      await certificateRepository.findAdvisorCertificateWaitingList(payload);

    certificate = certificate.map((item) => {
      return {
        ...item,
        title: item.title,
        submitDate: item.submitDate.toString(),
        category: item.category,
        approvalStatus: item.approvalStatus,
      };
    });

    return certificate;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Waiting List by major
const waitingListbyMajor = async (major, payload) => {
  try {
    let certificate = await certificateRepository.findWaitingListbyMajor(
      major,
      payload
    );

    certificate = certificate.map((item) => {
      return {
        ...item,
        title: item.title,
        submitDate: item.submitDate.toString(),
        category: item.category,
        approval_status: item.approval_status,
      };
    });

    return certificate;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Waiting list arrival year
const viewWaitingListByArrYear = async (arrivalYear, payload) => {
  try {
    let certificate = await certificateRepository.filterWaitingListByArrYear(
      arrivalYear,
      payload
    );

    certificate = certificate.map((item) => {
      return {
        ...item,
        title: item.title,
        submitDate: item.submitDate.toString(),
        category: item.category,
        approval_status: item.approval_status,
      };
    });

    return certificate;
  } catch (error) {
    throw error;
  }
};

//History certificate POV Dospem
const findAllApprovalStudentCertificate = async (payload) => {
  try {
    let certificate = await certificateRepository.findCertificate(payload);

    certificate = certificate.map((item) => {
      return {
        ...item,
        title: item.title,
        approvalDate: item.approvalDate.toString(),
      };
    });

    return certificate;
  } catch (error) {
    console.log("Ini error: ", error);
    return error;
  }
};

//Approval Certificate
const approvalCertificate = async (certificateId, payload) => {
  try {
    const certificate = certificateRepository.approvalCertificateStudent(
      certificateId,
      payload
    );
    return {
      ...certificate,
      approveDate: `${moment((await certificate).approvalDate).tz(
        "Asia/Makassar"
      )}`,
    };
  } catch (error) {
    throw error;
  }
};

//view certificate student
const findAllCertificateStudent = async (studentId) => {
  try {
    return await certificateRepository.viewAllStudentCertificate(studentId);
  } catch (error) {
    throw error;
  }
};

//==============================GeneralAccess=========================//
//Detail Certificate
const viewOneStudentCertificate = async (certificateId) => {
  try {
    let certificate = await certificateRepository.findOneCertificate(
      certificateId
    );

    return {
      ...certificate,
      approvalDate: certificate.approvalDate
        ? certificate.approvalDate.toString()
        : null,
      submitDate: certificate.submitDate.toString(),
    };
  } catch (error) {
    return error;
  }
};

//===============================StudentAccess========================//

//Student Add Certificate
const uploadCertificate = async (payload, studentId) => {
  const storageRef = ref(
    storage,
    `certificate/${studentId}/${payload.certificateFile.filename}`
  );
  const metadata = { contentType: "application/pdf" };
  try {
    const binaryString = atob(payload.certificateFile.buffer);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    await uploadBytes(storageRef, byteArray, metadata);
    const path = await getDownloadURL(storageRef);
    const certificate = await certificateRepository.insertCertificate(
      payload,
      studentId,
      path
    );
    return {
      ...certificate,
      submitDate: `${moment(certificate.submitDate).tz("Asia/Makassar")}`,
    };
  } catch (error) {
    throw error;
  }
};

//Current Certificate (Status Waiting)
const viewCurrentStudentCertificate = async (id) => {
  try {
    let certificate = await certificateRepository.findCurrentCertificateStudent(
      id
    );

    certificate = certificate.map((item) => {
      return {
        ...item,
        title: item.title,
        submitDate: item.submitDate.toString(),
      };
    });

    return certificate;
  } catch (error) {
    return error;
  }
};

//Student History Certificate (status Approved & Rejeceted)
const studentHistoryCertificateView = async (studentId) => {
  try {
    let certificate = await certificateRepository.findStudentCertificateHistory(
      studentId
    );

    certificate = certificate.map((item) => {
      return {
        ...item,
        title: item.title,
        approvalDate: item.approvalDate.toString(),
      };
    });

    return certificate;
  } catch (error) {
    return error;
  }
};

module.exports = {
  uploadCertificate,
  findAllApprovalStudentCertificate,
  viewOneStudentCertificate,
  viewCertifiacateByCategory,
  studentHistoryCertificateView,
  advisorWaitingListCertificateView,
  viewCurrentStudentCertificate,
  approvalCertificate,
  waitingListbyMajor,
  viewWaitingListByArrYear,
  findAllCertificateStudent,
};
