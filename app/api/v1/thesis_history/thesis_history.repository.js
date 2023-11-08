//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// @description     create thesis history by user id
// @used            all
const createThesisHistory = async (user_id, description, group_id) => {
  try {
    const date = new Date();
    await prisma.thesis_History.create({
      data: {
        user_id,
        description,
        date,
        group_id,
      },
    });
    return true;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

module.exports = {
  createThesisHistory,
};
