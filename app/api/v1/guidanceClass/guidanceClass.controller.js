const guidanceClassService = require("./guidanceClass.service");
const { guidanceClassPolicy } = require("./guidanceClass.policy");

const getAllClass = async (req, res) => {
  const policy = guidanceClassPolicy(req.user);
  try {
    if (!policy.can("read", "allClass")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const guidanceClassList = await guidanceClassService.getAllClass();
    res.status(200).send({ status: "OK", data: guidanceClassList });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getGuidanceClassDetail = async (req, res) => {
  const payload = req.params;
  const policy = guidanceClassPolicy(req.user);
  try {
    if (!policy.can("read", "guidanceClassDetail")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const guidanceClass = await guidanceClassService.getGuidanceClassDetail(
      payload
    );
    res.status(200).send({ status: "OK", data: guidanceClass });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createGuidanceClass = async (req, res) => {
  const payload = req.body;
  const { teacherId } = req.params;
  const policy = guidanceClassPolicy(req.user);
  try {
    if (!policy.can("create", "guidaceClass")) {
      throw { status: 403, message: "Forbidden Access" };
    }
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
  const policy = guidanceClassPolicy(req.user);
  try {
    if (!policy.can("update", "guidaceClassStudent")) {
      throw { status: 403, message: "Forbidden Access" };
    }
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
  const policy = guidanceClassPolicy(req.user);
  try {
    if (!policy.can("delete", "guidaceClassStudent")) {
      throw { status: 403, message: "Forbidden Access" };
    }
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
  const policy = guidanceClassPolicy(req.user);
  try {
    if (!policy.can("read", "allUnassignedStudent")) {
      throw { status: 403, message: "Forbidden Access" };
    }
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

const getAllUnassignetTeacher = async (req, res) => {
  const policy = guidanceClassPolicy(req.user);
  try {
    if (!policy.can("read", "allUnassignedTeacher")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    const teacherList = await guidanceClassService.getAllUnassignetTeacher();
    res.status(200).send({ status: "OK", data: teacherList });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteGuidanceClass = async (req, res) => {
  const payload = req.params;
  const policy = guidanceClassPolicy(req.user);
  try {
    if (!policy.can("delete", "guidaceClass")) {
      throw { status: 403, message: "Forbidden Access" };
    }
    await guidanceClassService.deleteGuidanceClass(payload);
    res.sendStatus(204);
  } catch (error) {
    if (error?.code === "P2025") {
      return res
        .status(404)
        .send({ status: "FAILED", data: { error: "Data not found" } });
    }
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  deleteStudentFromGuidanceClass,
  addStudentToGuidanceClass,
  getAllUnassignetTeacher,
  getAllUnassignedStudent,
  getGuidanceClassDetail,
  deleteGuidanceClass,
  createGuidanceClass,
  getAllClass,
};
