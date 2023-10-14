//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const historyController = require("./history.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------
//       mencatat aktivitas baru
router.post("/history", historyController.createHistory);
//       melihat riwayat log
router.get("/history", historyController.getHistory);

module.exports = router;