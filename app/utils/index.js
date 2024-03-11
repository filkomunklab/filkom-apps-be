const xlsx = require("xlsx");

const getToken = (req) => {
  let token = req.headers.authorization
    ? req.headers.authorization.replace("Bearer ", "")
    : null;

  return token && token.length ? token : null;
};

const createHttpStatusError = (message, status) => {
  const error = new Error(message);
  error.name = "HttpStatusError";
  error.status = status;
  return error;
};

const extractXlsx = (file) => {
  const workbook = xlsx.read(file.buffer);
  const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
};

module.exports = {
  getToken,
  createHttpStatusError,
  extractXlsx,
};
