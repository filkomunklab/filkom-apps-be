//Layer untuk handle business logic

const academicRepository = require("./academic_calendar.repository");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Find exist academic calendar
// @used            createAcademicCalendar
const getExistingAcademicCalendar = async (payload) => {
  const academic = await academicRepository.findExistingAcademicCalendar(
    payload
  );
  if (academic) {
    throw {
      status: 409,
      message: `Data already exists`,
    };
  }
  return academic;
};

//===================================================================
// @description     Create academic calendar
// @route           POST /academic-calendar
// @access          DOSEN_MK
const createAcademicCalendar = async (payload) => {
  // find exist academic calendar
  await getExistingAcademicCalendar(payload);
  // create academic calendar
  const academic = await academicRepository.insertAcademicCalendar(payload);
  return academic;
};

//===================================================================
// @description     Get academic calendar
// @route           GET /academic-calendar/:id
// @access          DOSEN_MK
const getAcademicCalendarById = async (id) => {
  const academic = await academicRepository.findAcademicCalendarById(id);
  if (!academic) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return academic;
};

//===================================================================
// @description     Get all academic calendar
// @route           GET /academic-calendar
// @access          DOSEN_MK
const getAllAcademicCalendar = async () => {
  const academic = await academicRepository.findAllAcademicCalendar();
  return academic;
};

//===================================================================
// @description     Get all academic calendar
// @route           GET /academic-calendar-list
// @access          DOSEN_MK
const getAcademicCalendarList = async () => {
  const academics = await academicRepository.findAllAcademicCalendar();
  const academicList = [];
  for (const entry of academics) {
    const semester = `${entry.semester}-${entry.year}`;

    const academicData = {
      id: entry.id,
      semester: semester,
    };
    academicList.push(academicData);
  }
  return academicList;
};

//===================================================================
// @description     Update academic calendar list
// @route           PUT /academic-calendar/:id
// @access          DOSEN_MK
const updateAcademicCalendaryId = async (id, payload) => {
  const academic = await academicRepository.updateAcademicCalendaryId(
    id,
    payload
  );
  return academic;
};

//===================================================================
// @description     Delete academic calendar
// @route           DELETE /academic-calendar/:id
// @access          DOSEN_MK
const deleteAcademicCalendarById = async (id) => {
  await academicRepository.deleteAcademicCalendaryId(id);
};

module.exports = {
  createAcademicCalendar,
  getAcademicCalendarById,
  getAllAcademicCalendar,
  getAcademicCalendarList,
  updateAcademicCalendaryId,
  deleteAcademicCalendarById,
};
