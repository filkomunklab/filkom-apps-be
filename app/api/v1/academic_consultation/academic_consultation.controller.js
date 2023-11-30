const academicConsService = require("./academic_consultation.service");

const createConsultation = async (req, res) => {
  const payload = req.body;
  try {
    const consultation = await academicConsService.createConsultation(payload);
    res.status(201).send({ status: "OK", data: consultation });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getConsultationByNim = async (req, res) => {
  const nim = req.params.nim;
  try {
    const consultation = await academicConsService.getConsultationByNim(nim);
    res.status(200).send({ status: "OK", data: consultation });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getConsultationByNik = async (req, res) => {
  const nik = req.params.nik;
  try {
    const consultation = await academicConsService.getConsultationByNik(nik);
    res.status(200).send({ status: "OK", data: consultation });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getConsultationById = async (req, res) => {
  const id = req.params.id;
  try {
    const consultation = await academicConsService.getConsultationById(id);
    res.status(200).send({ status: "OK", data: consultation });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateConsultationStatusCompleteById = async (req, res) => {
  const id = req.params.id;
  try {
    const consultation =
      await academicConsService.updateConsultationStatusCompleteById(id);
    res.status(200).send({ status: "OK", data: consultation });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  createConsultation,
  getConsultationByNim,
  getConsultationByNik,
  getConsultationById,
  updateConsultationStatusCompleteById,
};
