const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");

const auth = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.token, secretKey);
    if (decoded) {
      req.user = decoded.user;
      next();
    }
  } catch (error) {
    res.status(401).send({ message: "Invalid Token" });
  }
};

module.exports = {
  auth,
};
