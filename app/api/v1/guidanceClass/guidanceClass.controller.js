const guidanceClassService = require("./guidanceClass.service");

const createGuidanceClass = async (req, res) => {
  const payload = req.body;
  const { teacherId } = req.params;
  try {
    const guidanceClass = await guidanceClassService.createGuidanceClass(
      payload,
      teacherId
    );
    res.status(201).send({ status: "OK", data: guidanceClass });
  } catch (error) {
    switch (error?.code) {
      case "P2002":
        return res
          .status(409)
          .send({ status: "FAILED", data: { error: "Data already exist" } });
      case "P2003":
        return res.status(404).send({
          status: "FAILED",
          data: { error: "Teacher or student hasn't created yet" },
        });
    }
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const addStudentToGuidanceClass = async (req, res) => {
  const payload = req.body;
  const { guidanceClassId } = req.params;
  try {
    const guidanceClass = await guidanceClassService.addStudentToGuidanceClass(
      payload,
      guidanceClassId
    );
    res.status(201).send({ status: "OK", data: guidanceClass });
  } catch (error) {
    if (error?.code === "P2002") {
      return res
        .status(409)
        .send({ status: "FAILED", data: { error: "Data already exist" } });
    }
    if (error?.code === "P2003") {
      return res.status(404).send({
        status: "FAILED",
        data: { error: "Class hasn't created yet" },
      });
    }
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteStudentFromGuidanceClass = async (req, res) => {
  const payload = req.body;
  try {
    const guidanceClass =
      await guidanceClassService.deleteStudentFromGuidanceClass(payload);
    res.status(201).send({ status: "OK", data: guidanceClass });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllUnassignedStudent = async (req, res) => {
  const query = req.query;
  try {
    const studentList = await guidanceClassService.getAllUnassignedStudent(
      query
    );
    res.status(200).send({ status: "OK", data: studentList });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  createGuidanceClass,
  addStudentToGuidanceClass,
  deleteStudentFromGuidanceClass,
  getAllUnassignedStudent,
};
