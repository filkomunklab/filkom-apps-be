const express = require("express");
const router = express.Router();
const alumniController = require("./alumni.controller");
const { auth } = require("../../../middleware/auth");

// router.get("/fakultas/alumni", alumniController.getAlumniList);
// router.get("/fakultas/alumni/filter-by", alumniController.filterAlumniBy);

//buat routes for operator-admin
router.get("/admin-operator/alumni", auth, alumniController.alumniStatusTS);
//route operator for filter by
router.get("/operator/alumni/filter-by", auth, alumniController.filterAlumniBy);

router.get("/admin/alumni/filter-by", auth, alumniController.filterAlumniBy);

router.post(
  "/operator/send-broadcast-email",
  auth,
  alumniController.sendBroadcastEmail
);

// ================================================================================================

//@description     Get (pagination and filter) alumni yang telah isi Tracer Study on operator
//@route           GET /api/v1/operator/alumni/tracer-study/done?search_query= &page= &limit= &filterBy= &filterValue=
//@access          Public
router.get(
  "/operator/alumni/tracer-study/done",
  auth,
  alumniController.getAlumniHasTracerStudyByOperator
);

//@description     Get (pagination and filter) semua alumni  on fakultas
//@route           GET /api/v1/operator/alumni?search_query= &page= &limit= &filterBy= &filterValue=
//@access          Public
router.get("/fakultas/alumni", auth, alumniController.getAllAlumni);

//broadcast WA
router.post(
  "/operator/alumni/send-broadcast-whatsapp",
  auth,
  alumniController.broadcastWAChat
);

module.exports = router;
