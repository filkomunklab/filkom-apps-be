const tsService = require("./ts.service");

const getListTS = async (req, res) => {
  try {
    const listTS = await tsService.tracerStudy();
    res.send({ status: "OK", data: listTS });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const submitTS = async (req, res) => {
  try {
    const dataTS = req.body;
    const tracerStudy = await tsService.createTS(dataTS);
    res.status(201).send({
      status: "Your data has submitted, thank you",
      data: tracerStudy,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  submitTS,
  getListTS,
};
