const express = require("express");
const router = express.Router();
const alumniController = require("./alumni.controller");

// router.get("/fakultas/alumni", alumniController.getAlumniList);
// router.get("/fakultas/alumni/filter-by", alumniController.filterAlumniBy);

//buat routes for operator-admin
router.get("/admin-operator/alumni", alumniController.alumniStatusTS);
//route operator for filter by
router.get("/operator/alumni/filter-by", alumniController.filterAlumniBy);

router.get("/admin/alumni/filter-by", alumniController.filterAlumniBy);

router.post(
  "/operator/send-broadcast-email",
  alumniController.sendBroadcastEmail
);

// ================================================================================================

//@description     Get (pagination and filter) alumni yang telah isi Tracer Study on operator
//@route           GET /api/v1/operator/alumni/tracer-study/done?search_query= &page= &limit= &filterBy= &filterValue=
//@access          Public
router.get(
  "/operator/alumni/tracer-study/done",
  alumniController.getAlumniHasTracerStudyByOperator
);

//@description     Get (pagination and filter) semua alumni  on fakultas
//@route           GET /api/v1/operator/alumni?search_query= &page= &limit= &filterBy= &filterValue=
//@access          Public
router.get("/fakultas/alumni", alumniController.getAllAlumni);

//broadcast WA
router.post(
  "/operator/alumni/send-broadcast-whatsapp",
  alumniController.broadcastWAChat
);

module.exports = router;
