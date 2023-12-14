const express = require("express");
const router = express.Router();
const trasactionController = require("./transactionGrades.controller");

router.post(
  "/transaction/grades/:nim",
  trasactionController.postTransactionWithGrades
);

module.exports = router;
