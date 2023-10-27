const express = require("express");
const router = express.Router();
const alumniController = require("./alumni.controller");

router.get("/fakultas/alumni", alumniController.getAlumniList);
router.get("/fakultas/alumni/filter-by", alumniController.filterAlumniBy);

//buat routes for operator
router.get("/admin-operator/alumni", alumniController.alumniStatusTS);
//route operator for filter by
router.get("/operator/alumni/filter-by", alumniController.filterAlumniBy);

router.get("/admin/alumni/filter-by", alumniController.filterAlumniBy);

router.post(
  "/operator/send-broadcast-email",
  alumniController.sendBroadcastEmail
);

module.exports = router;
