module.exports.LogbookMiddleware = (schema) => {
  schema.pre("find", function (next) {
    this.populate("logs.diagnostic");
    next();
  });
};
