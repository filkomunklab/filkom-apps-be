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
// @used            getAcademicCalendarList
const findAllAcademicCalendar = async () => {
  const academic = await prisma.academic_Calendar.findMany();
  return academic;
};

//===================================================================
// @description     Update academic calendar list
// @route           PUT /academic-calendar/:id
// @access          DOSEN_MK
const updateAcademicCalendaryId = async (id, payload) => {
  const { semester, year } = payload;
  const academic = await prisma.academic_Calendar.update({
    where: {
      id,
    },
    data: {
      semester,
      year,
    },
  });
  return academic;
};

//===================================================================
// @description     Delete academic calendar
// @route           DELETE /academic-calendar/:id
// @access          DOSEN_MK
const deleteAcademicCalendaryId = async (id) => {
  await prisma.academic_Calendar.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  findExistingAcademicCalendar,
  insertAcademicCalendar,
  findAcademicCalendarById,
  findAllAcademicCalendar,
  updateAcademicCalendaryId,
  deleteAcademicCalendaryId,
};
