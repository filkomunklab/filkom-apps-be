//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// @description     create thesis history by user id
// @used            all
const createThesisHistory = async (user_id, description, group_id) => {
  const date = new Date();
  const thesisHistory = await prisma.thesis_History.create({
    data: {
      user_id,
      description,
      date,
      group_id,
    },
  });
  return thesisHistory;
};

// @description     get thesis history by group_id
// @used            group
const findAllhesisHistoryByGroupId = async (group_id) => {
  const thesisHistory = await prisma.thesis_History.findMany({
    where: {
      group_id,
    },
  });
  return thesisHistory;
};

module.exports = {
  createThesisHistory,
  findAllhesisHistoryByGroupId,
};
