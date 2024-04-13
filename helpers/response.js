const serviceFunctionResponse = (data, status, path, message = "") => {
  return {
    data,
    status,
    path,
    message,
  };
};

module.exports = { serviceFunctionResponse };
