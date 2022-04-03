const { sendSuccess, sendError } = require("../base/router.base");

module.exports.catchAsync = (fn) => {
  return (req, res, next) => {
    try {
      fn(req, res, next).catch(next);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  };
};
