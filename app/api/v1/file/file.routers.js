const express = require("express");
const fileController = require("./file.controller");
const multer = require("multer");
const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const body = req.body;
    console.log(body);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".")[1]
    );
  },
});
const upload = multer({ storage });

router.post("/upload", upload.single("sampleFile"), fileController.postFile);

module.exports = router;
