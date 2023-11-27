const preRegisService = require("./preRegis.service");

const preRegisMenu = async (req, res) => {
  const { major, year } = req.body;
  try {
    const preRegis = await preRegisService.viewPreRegisMenu(major, year);
    res.status(201).send({ status: "OK", data: preRegis });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  preRegisMenu,
};
