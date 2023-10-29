//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const skripsiController = require("./skripsi.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------

//===================================================================
// @description     Upload dokumen skripsi
// @access          MAHASISWA
router.put(
  "/skripsi/skripsi-document/:id",
  auth,
  skripsiController.updateSkripsiDocumentById
);

//===================================================================
// @description     Get dokumen skripsi
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/skripsi/skripsi-document/:id",
  auth,
  skripsiController.getSkripsiDocumentById
);

//===================================================================
// @description     Delete/Update dokumen skripsi
// @access          MAHASISWA
router.put(
  "/skripsi/skripsi-document/delete/:id",
  auth,
  skripsiController.deleteSkripsiDocumentById
);

//===================================================================
// @description     Approve dokumen skripsi
// @access          DOSEN
router.put(
  "/skripsi/skripsi-document/approve/:id",
  auth,
  skripsiController.approveSkripsiDocumentById
);

//===================================================================
// @description     Reject dokumen skripsi
// @access          DOSEN
router.put(
  "/skripsi/skripsi-document/reject/:id",
  auth,
  skripsiController.rejectSkripsiDocumentById
);

// //       upload/update hki
// router.put("/skripsi/hki/:id", skripsiController.updateHKIById);
// //       melihat hki
// router.get("/skripsi/hki/:id", skripsiController.getHKIById);
// //       upload/update jurnal
// router.put("/skripsi/journal/:id", skripsiController.updateJournalById);
// //       melihat jurnal
// router.get("/skripsi/journal/:id", skripsiController.getJournalById);
// //       upload/update source code
// router.put("/skripsi/source-code/:id", skripsiController.updateSourceCodeById);
// //       upload link source code
// router.put("/skripsi/link-source-code/:id", skripsiController.updateLinkSourceCodeById);
// //       melihat source code
// router.get("/skripsi/source-code/:id", skripsiController.getSourceCodeById);
// //       upload/update poster
// router.put("/skripsi/poster/:id", skripsiController.updatePosterById);
// //       melihat poster
// router.get("/skripsi/poster/:id", skripsiController.getPosterById);
// //       upload/update tutorial
// router.put("/skripsi/tutorial/:id", skripsiController.updateTutorialById);
// //       melihat tutorial
// router.get("/skripsi/tutorial/:id", skripsiController.getTutorialById);

module.exports = router;
