const postFile = async (req, res) => {
  try {
    const file = req.file;
    res.send({ status: "OK", data: { file } });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  postFile,
};
