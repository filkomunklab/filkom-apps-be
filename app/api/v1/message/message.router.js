const express = require("express");
const router = express.Router();

const messageController = require("./message.controller");

router.get(
  "/message/:academic_consultation_id",
  messageController.getMessageByConsultationId
);
router.post("/message", messageController.createMessage);

module.exports = router;
