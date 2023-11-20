//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

//===================================================================
// @description     Create consultation
// @route           POST /consultation
// @access          DOSEN
const insertConsultation = async (payload, userId) => {
  const { group_id, description, date } = payload;
  const consultation = await prisma.thesis_Consultation.create({
    data: {
      group_id,
      description,
      date: new Date(date),
      dosen_id: userId,
    },
  });

  return consultation;
};

//===================================================================
// @description     Get all consultation by group id
// @route           GET /consultation/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findAllConsultationByGroupId = async (group_id) => {
  const consultation = await prisma.thesis_Consultation.findMany({
    where: {
      group_id,
    },
  });
  return consultation;
};

module.exports = {
  insertConsultation,
  findAllConsultationByGroupId,
};
