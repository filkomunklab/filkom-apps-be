//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// create submission
const insertStudent = async (payload) => {
    const {
        nim,
        password,
        firstName,
        faculty,
        major,
    } = payload;
    const student = await prisma.student.create({
      data: {
        nim,
        password,
        firstName,
        faculty,
        major,
      },
    });
  
    return student;
};

module.exports = {
    insertStudent,

}