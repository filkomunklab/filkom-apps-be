const curriculumService = require("./curriculum.service");
const { policyFor } = require("../policy");

const createCurriculumWithItsSubject = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("create", "Curriculum")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const payload = req.body;

    console.log("ini payload: ", payload);

    const curriculum = await curriculumService.createCurriculumWithItsSubjects(
      payload
    );

    res.status(201).send({
      status: "OK",
      data: curriculum,
    });
  } catch (error) {
    console.log("ini error: ", error.message);
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

const getAllCurriculum = async (req, res) => {
  try {
    const curriculum = await curriculumService.GetAllCurriculum();

    res.status(200).send({
      status: "OK",
      data: curriculum,
    });
  } catch (error) {
    console.log("ini error: ", error.message);
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

const getCurriculumById = async (req, res) => {
  const id = req.params.id;
  try {
    const curriculum = await curriculumService.GetCurriculumById(id);

    res.status(200).send({
      status: "OK",
      data: curriculum,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

const deleteCurriculum = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("delete", "Curriculum")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const curriculumId = req.params.curriculum_id;
    console.log("ini curriculum id: ", curriculumId);

    const curriculum =
      await curriculumService.deleteCurriculumWithSubjectByCurriculumId(
        curriculumId
      );

    res.status(200).send({
      status: "OK",
      data: curriculum,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

const getCurriculumByMajorAndYear = async (req, res) => {
  const major = req.params.major;
  const year = req.params.year;

  try {
    const curriculum = await curriculumService.getCurriculumByMajorAndYear(
      major,
      year
    );

    res.status(200).send({
      status: "OK",
      data: curriculum,
    });
  } catch (error) {
    console.log("ini error: ", error.message);
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

module.exports = {
  createCurriculumWithItsSubject,
  getAllCurriculum,
  getCurriculumById,
  deleteCurriculum,
  getCurriculumByMajorAndYear,
};
