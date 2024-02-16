const messageService = require("./message.service");

const createMessage = async (req, res) => {
  const payload = req.body;
  try {
    const message = await messageService.createMessage(payload);
    res.status(201).send({ status: "OK", data: message });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getMessageByConsultationId = async (req, res) => {
  const academic_consultation_id = req.params.academic_consultation_id;
  try {
    const message = await messageService.getMessageByConsultationId(
      academic_consultation_id
    );
    res.status(200).send({ status: "OK", data: message });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  createMessage,
  getMessageByConsultationId,
};
