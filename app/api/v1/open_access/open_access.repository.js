const prisma = require("../../../database");

// const addOpenAccessTodb = async (payload) => {
//   const { name, Open } = payload;
//   try {
//     const openAccess = await prisma.open_Access.create({
//       data: {
//         name,
//         Open,
//       },
//     });
//     return openAccess;
//   } catch (error) {
//     throw error;
//   }
// };

// const changeSetAccess = async (id, set_access) => {
//   try {
//     return await prisma.open_Access.update({
//       where: { id },
//       data: {
//         set_access,
//       },
//     });
//   } catch (error) {
//     throw error;
//   }
// };

const addOpenGradesAccess = async (payload) => {
  const { semester, semester_period, major, due_date, employeeNik } = payload;
  try {
    const openAccess = await prisma.grades_access.create({
      data: {
        semester,
        semester_period,
        major,
        due_date,
        employeeNik,
      },
    });
    return openAccess;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const setCloseGradesAccess = async (id) => {
  try {
    const openAccess = await prisma.grades_access.update({
      where: { id },
      data: {
        isOpen: false,
      },
    });
    return openAccess;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  //   addOpenAccessTodb,
  //   changeSetAccess,
  addOpenGradesAccess,
  setCloseGradesAccess,
};
