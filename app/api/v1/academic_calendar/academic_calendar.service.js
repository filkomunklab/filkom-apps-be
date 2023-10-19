//Layer untuk handle business logic

const academicRepository = require("./academic_calendar.repository")

const getExistingAcademic = async (payload) => {
    const academic = await academicRepository.findExistingAcademic(payload);
    if (academic) {
      throw {
        status: 409,
        message: `Data already exists`,
      };
    }
    return academic;
};

const createAcademic = async (payload) => {
    await getExistingAcademic(payload);
    const academic = await academicRepository.insertAcademic(payload);
    return academic;
};

const getAcademicById = async (id) => {
  const academic = await academicRepository.findAcademicById(id);
  if (!academic) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return academic;
};

const getAllAcademic = async () => {
  const academic = await academicRepository.findAllAcademic();
  if (!academic) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return academic;
};

module.exports = {
  createAcademic,
  getAcademicById,
  getAllAcademic,
  
}