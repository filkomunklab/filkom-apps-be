const express = require("express");
const certificateController = require("./certificate.controller");
const multer = require("multer");

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: "public/certificate/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
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

router.post(
  "/certificate/:nim",
  upload.single("certificate"),
  certificateController.uploadCertificate
); //Upload certificate
router.get(
  "/certificate/dosen/:nik",
  certificateController.viewAllStudentCertificate
); //view students certificate
router.get(
  "/certificate/student/:certificateId",
  certificateController.viewStudentCertificate
); //View student certificate

module.exports = router;
