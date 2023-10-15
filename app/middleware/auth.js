const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");
const { getToken } = require("../utils");
const adminRepository = require("../api/v1/admin/admin.repository");
const employeeRepository = require("../api/v1/employee/employee.repository");

const auth = async (req, res, next) => {
  try {
    let token = getToken(req);

    if (!token) {
      return res
        .status(401)
        .send({ status: "FAILED", data: { error: "token not found" } });
    }

    req.user = jwt.verify(token, secretKey);
    let admin = await adminRepository.findAdminByToken(token);
    if (!admin) {
      let employee = await employeeRepository.findEmployeeByToken(token);
      if (!employee) {
        return res.status(401).send({
          status: "FAILED",
          data: { error: "You're not login or token expired" },
        });
      }
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ status: "FAILED", data: { error: "invalid token" } });
  }
};

module.exports = {
  auth,
};
