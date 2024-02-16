const userManagementService = require("./user_management.service");

const updateRoles = async (req, res) => {
  const id = req.params.id;
  const payload = req.body.data;
  try {
    const roles = await userManagementService.updateRoles(id, payload);
    console.log("ini roles: ", roles);
    res.send({ status: "OK", data: roles });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  updateRoles,
};
