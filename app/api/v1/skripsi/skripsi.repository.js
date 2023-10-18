//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// @description     Create empty skripsi
// @used            Submission
const insertSkripsi = async (submission) => {
    const {
      proposed_advisor_id,
      proposed_co_advisor1_id,
      proposed_co_advisor2_id,
    } = submission;
    const skripsi = await prisma.skripsi.create({
      data: {
        advisor_id: proposed_advisor_id,
        co_advisor1_id: proposed_co_advisor1_id,
        co_advisor2_id: proposed_co_advisor2_id,
      },
    });
    return skripsi;
}

module.exports = {
    insertSkripsi,
}