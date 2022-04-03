// status message
const statusMessage = (code, message, data) => {
  let status = { code: code, message: message, data: data };
  return status;
};
module.exports = statusMessage;
