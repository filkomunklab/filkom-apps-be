const moment = require("moment-timezone");
const academicConsultationRepository = require("../academic_consultation/academic_consultation.repository");
const messageRepository = require("./message.repository");

const createMessage = async (payload) => {
  const now = moment.tz("Asia/Makassar");
  try {
    // Hitung jumlah message berdasarkan id konsultasi
    const countMessage =
      await messageRepository.selectCountMessageByConsultationId(
        payload.academic_consultation_id
      );

    // Jika message masih nol untuk id konsultasi tertentu, maka akan update status konsultasi menjadi on-process
    if (countMessage === 0) {
      console.log("maso sini uy");
      await academicConsultationRepository.updateStatusConsultationById(
        payload.academic_consultation_id,
        "OnProcess",
        now
      );
    }

    const message = await messageRepository.insertMessage(payload);

    return message
      ? {
          ...message,
          createdAt: `${moment(message.createdAt).tz("Asia/Makassar")}`,
        }
      : {};
  } catch (error) {
    throw error.message;
  }
};

const getMessageByConsultationId = async (academic_consultation_id) => {
  try {
    let message = await messageRepository.selectMessageByConsultationId(
      academic_consultation_id
    );

    message = message
      ? message.map((value) => {
          return {
            ...value,
            createdAt: `${moment(value.createdAt).tz("Asia/Makassar")}`,
          };
        })
      : [];

    return message;
  } catch (error) {
    throw error.message;
  }
};

module.exports = {
  createMessage,
  getMessageByConsultationId,
};
