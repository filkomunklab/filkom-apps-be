const authService = require("./auth.service");
const { getToken } = require("../../../utils/index");

const signInAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await authService.signInAdmin(username, password);
    res.status(200).send({ status: "SUCCESS", data: admin });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const me = (req, res) => {
  if (!req.user) {
    return res.status(500).send({
      status: "FAILED",
      data: { error: "Your're not login or token expiredd" },
    });
  }

  res.status(200).send({ status: "SUCCESS", data: req.user });
};

const signOutAdmin = async (req, res) => {
  try {
    const token = getToken(req);
    await authService.signOutAdmin(token);
    res
      .status(200)
      .send({ status: "OK", data: { message: "sign out success" } });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const signInEmployee = async (req, res) => {
  try {
    const { username, password } = req.body;
    const employee = await authService.signInEmployee(username, password);
    res.status(200).send({ status: "SUCCESS", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  signInAdmin,
  signOutAdmin,
  signInEmployee,
  me,
};
