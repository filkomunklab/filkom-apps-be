const authService = require("./auth.service");

const signInAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.signInAdmin(username, password);
    res.status(200).send({ status: "SUCCESS", data: token });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  signInAdmin,
};
