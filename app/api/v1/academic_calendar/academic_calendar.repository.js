//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Find exist academic calendar
// @used            getExistingAcademicCalendar
const findExistingAcademicCalendar = async (payload) => {
  const { semester, year } = payload;
  const academic = await prisma.academic_Calendar.findFirst({
    where: {
      semester,
      year,
    },
  });
  return academic;
};

//===================================================================
// @description     Create academic calendar
// @route           POST /academic-calendar
// @access          DOSEN_MK
const insertAcademicCalendar = async (payload) => {
  const { semester, year } = payload;
  const academic = await prisma.academic_Calendar.create({
    data: {
      semester,
      year,
    },
  });

  return academic;
};

//===================================================================
// @description     Get academic calendar
// @route           GET /academic-calendar/:id
// @access          DOSEN_MK
const findAcademicCalendarById = async (id) => {
  const academic = await prisma.academic_Calendar.findUnique({
    where: {
      id,
    },
  });
  return academic;
};

//===================================================================
// @description     Get all academic calendar
// @route           GET /academic-calendar
// @access          DOSEN_MK
const findAllAcademicCalendar = async () => {
  const academic = await prisma.academic_Calendar.findMany();
  return academic;
};

module.exports = {
  findExistingAcademicCalendar,
  insertAcademicCalendar,
  findAcademicCalendarById,
  findAllAcademicCalendar,
};
