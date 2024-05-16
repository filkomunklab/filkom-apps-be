const express = require("express");
const router = express.Router();
const { auth } = require("../../../middleware/auth");
const guideVmtController = require("./guideVmt.controller");

//ACADEMIC GUIDE
// post Academic Guide
router.post("/academicGuide", guideVmtController.postAcademicGuide);

//update or change academic guide
router.patch(
  "/academic-guide/update/:id",
  auth,
  guideVmtController.changeAcademicGuide
);

router.get("/academic-guide/detail", guideVmtController.getAcademicGuide);

//VISI, MISI, & TUJUAN
// post Visi, misi, & tujuan
router.post("/visionMissionAim", guideVmtController.postVmt);

//get Visi, misi, & tujuan
router.get(
  "/visi-misi-tujuan/view/universitas",
  guideVmtController.getVisiMisiTujuan
);

router.get(
  "/visi-misi-tujuan/view/fakultas",
  guideVmtController.getVisiMisiTujuanFakultas
);

router.get(
  "/visi-misi-tujuan/view/prodi/IF",
  guideVmtController.getVisiMisiTujuanProdiIF
);

router.get("/visi-misi-tujuan/view/SI", guideVmtController.getVisiMisiTujuanSI);

router.get("/visi-misi-tujuan/view/TI", guideVmtController.getVisiMisiTujuanTI);

router.patch(
  "/visi-misi-tujuan/change/:id",
  auth,
  guideVmtController.patchvisiMisiTujuan
);

module.exports = router;
