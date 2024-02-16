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

module.exports = {
  getToken,
  createHttpStatusError,
};
