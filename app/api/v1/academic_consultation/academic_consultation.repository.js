const prisma = require("../../../database");

const insertConsultation = async (payload) => {
  try {
    const consultation = await prisma.academic_Consultation.create({
      data: payload,
    });

    return consultation;
  } catch (error) {
    console.log("ini error: ", error);
    throw error.message;
  }
};

const selectConsultationByNim = async (nim) => {
  try {
    const consultation = await prisma.academic_Consultation.findMany({
      where: {
        student_nim: nim,
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

const selectConsultationByNik = async (nik) => {
  try {
    const consultation = await prisma.academic_Consultation.findMany({
      where: {
        receiver_nik: nik,
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
    const consultation = await prisma.academic_Consultation.findUnique({
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
    const consultation = await prisma.academic_Consultation.update({
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
  selectConsultationByNim,
  selectConsultationByNik,
  selectConsultationById,
  updateStatusConsultationById,
};
