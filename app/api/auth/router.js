const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/auth", function (req, res) {
  res.status(200).send({ message: "Auth router" });
});

module.exports = router;
