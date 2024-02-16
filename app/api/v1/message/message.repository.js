const prisma = require("../../../database");

const selectCountMessageByConsultationId = async (consultation_id) => {
  try {
    const count = await prisma.aKAD_Message.count({
      where: {
        academic_consultation_id: consultation_id,
      },
    });

    return count;
  } catch (error) {
    throw error.message;
  }
};

const insertMessage = async (payload) => {
  try {
    const message = await prisma.aKAD_Message.create({
      data: payload,
    });

    return message;
  } catch (error) {
    throw error.message;
  }
};

const selectMessageByConsultationId = async (academic_consultation_id) => {
  try {
    const message = await prisma.aKAD_Message.findMany({
      where: {
        academic_consultation_id,
      },
    });

    return message;
  } catch (error) {
    throw error.message;
  }
};

module.exports = {
  selectCountMessageByConsultationId,
  insertMessage,
  selectMessageByConsultationId,
};
