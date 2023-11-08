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

//export database
const exportTStoExcel = async (req, res) => {
  const filename = "tracerStudy.xlsx";

  try {
    const buffer = await tsService.exportTStoExcel();

    // Set header untuk mengirim file Excel
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    // Kirim buffer sebagai respons
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: "Export failed" });
  }
};

module.exports = {
  submitTS,
  getListTS,
  exportTStoExcel,
};
