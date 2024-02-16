const subjectService = require("./subject.service");

const getAllSubjectByIdCurriculum = async (req, res) => {
  try {
    const curriculum_id = req.params.curriculum_id;
    const subject = await subjectService.getAllSubjectByIdCurriculum(
      curriculum_id
    );

    res.status(201).send({
      status: "OK",
      data: subject,
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
  getAllSubjectByIdCurriculum,
};
