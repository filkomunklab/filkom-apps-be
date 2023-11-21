const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");
const { getToken } = require("../utils");
const adminRepository = require("../api/v1/admin/admin.repository");
const employeeRepository = require("../api/v1/employee/employee.repository");
const studentRepository = require("../api/v1/student/student.repository");

const auth = async (req, res, next) => {
  try {
    let token = getToken(req);

    if (!token) {
      return res
        .status(401)
        .send({ status: "FAILED", data: { error: "token not found" } });
    }

    req.user = jwt.verify(token, secretKey);
    // console.log(req.user);
    const isAdmin = await adminRepository.findAdminByToken(token);
    const isEmployee = await employeeRepository.findEmployeeByToken(token);
    const isStudent = await studentRepository.findStudentByToken(token);

    if (isAdmin || isEmployee || isStudent) {
      // The token belongs to an admin, employee, or student
      next();
    } else {
      return res
        .status(401)
        .send({ status: "FAILED", data: { error: "token expired" } });
    }
  } catch (error) {
    return res
      .status(401)
      .send({ status: "FAILED", data: { error: "invalid token" } });
  }
};

module.exports = {
  auth,
};
