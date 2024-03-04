const prisma = require("../../../database");

const insertConsultation = async (payload) => {
  try {
    const consultation = await prisma.aKAD_Academic_Consultation.create({
      data: payload,
    });

    return consultation;
  } catch (error) {
    throw error.message;
  }
};

const selectConsultationByStudentId = async (studentId) => {
  try {
    const consultation = await prisma.aKAD_Academic_Consultation.findMany({
      where: {
        studentId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return consultation;
  } catch (error) {
    throw error.message;
  }
};

const selectConsultationByEmployeeId = async (employeeId) => {
  try {
    const consultation = await prisma.aKAD_Academic_Consultation.findMany({
      where: {
        receiverId: employeeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return consultation;
  } catch (error) {
    throw error.message;
  }
};

const selectConsultationById = async (id) => {
  try {
    const consultation = await prisma.aKAD_Academic_Consultation.findUnique({
      where: {
        id,
      },
    });
    return consultation;
  } catch (error) {
    throw error.message;
  }
};

const updateStatusConsultationById = async (id, status, now) => {
  try {
    const consultation = await prisma.aKAD_Academic_Consultation.update({
      where: {
        id,
      },
      data: {
        status,
        updatedAt: now,
      },
    });

    return consultation;
  } catch (error) {
    throw error.message;
  }
};

module.exports = {
  insertConsultation,
  selectConsultationByStudentId,
  selectConsultationByEmployeeId,
  selectConsultationById,
  updateStatusConsultationById,
};
