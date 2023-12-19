const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const certificateRepository = require("./certificate.repository");
const { storage } = require("../../../config/firebase");
const moment = require("moment-timezone");

//===================================DospemAccess=======================//
//Find certificate by category
const viewCertifiacateByCategory = async (category, nik) => {
  try {
    const certificate = await certificateRepository.findCertificateByCategory(
      category,
      nik
    );
    return certificate;
  } catch (error) {
    return error;
  }
};

//Waiting List
const advisorWaitingListCertificateView = async (nik) => {
  try {
    let certificate =
      await certificateRepository.findAdvisorCertificateWaitingList(nik);

    certificate = certificate.map((item) => {
      return {
        ...item,
        Certificate: {
          title: item.Certificate.title,
          submitDate: item.Certificate.submitDate.toString(),
        },
      };
    });

    return certificate;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Waiting List by major
const waitingListbyMajor = async (major) => {
  try {
    let certificate = await certificateRepository.findWaitingListbyMajor(major);

    certificate = certificate.map((item) => {
      return {
        ...item,
        Certificate: {
          title: item.Certificate.title,
          submitDate: item.Certificate.submitDate.toString(),
        },
      };
    });

    return certificate;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Waiting List by Arrival Year
const waitingListbyArrivalYear = async (year) => {
  try {
    let certificate = await certificateRepository.findWaitingListbyArrivalYear(
      year
    );

    certificate = certificate.map((item) => {
      return {
        ...item,
        Certificate: {
          title: item.Certificate.title,
          submitDate: item.Certificate.submitDate.toString(),
        },
      };
    });

    return certificate;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//show list Approved/Rejected certificate
const findAllStudentCertificate = async (nik) => {
  try {
    let certificate = await certificateRepository.findCertificate(nik);

    certificate = certificate.map((item) => {
      return {
        ...item,
        Certificate: {
          title: item.Certificate.title,
          approvalDate: item.Certificate.approvalDate.toString(),
        },
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
//StudentAccess
const uploadCertificate = async (payload, nim) => {
  const storageRef = ref(
    storage,
    `certificate/${nim}/${payload.certificateFile.filename}`
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
      nim,
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
const viewCurrentStudentCertificate = async (nim) => {
  try {
    let certificate = await certificateRepository.findCurrentCertificateStudent(
      nim
    );

    certificate = certificate.map((item) => {
      return {
        ...item,
        Certificate: {
          title: item.Certificate.title,
          submitDate: item.Certificate.submitDate.toString(),
        },
      };
    });

    return certificate;
  } catch (error) {
    return error;
  }
};

//History Certificate
const studentHistoryCertificateView = async (nim) => {
  try {
    let certificate = await certificateRepository.findStudentCertificateHistory(
      nim
    );

    certificate = certificate.map((item) => {
      return {
        ...item,
        Certificate: {
          title: item.Certificate.title,
          approvalDate: item.Certificate.approvalDate.toString(),
        },
      };
    });

    return certificate;
  } catch (error) {
    return error;
  }
};

module.exports = {
  uploadCertificate,
  findAllStudentCertificate,
  viewOneStudentCertificate,
  viewCertifiacateByCategory,
  studentHistoryCertificateView,
  advisorWaitingListCertificateView,
  viewCurrentStudentCertificate,
  approvalCertificate,
  waitingListbyArrivalYear,
  waitingListbyMajor,
};
