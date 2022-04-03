module.exports.ClassworkMarkMiddleware = (schema) => {
  schema.virtual("is_graded").get(function () {
    return this.score !== -1 ? true : false;
  });

  schema.pre(/^findOne/, function (next) {
    this.populate("attachments", "_id title filename path size");
    next();
  });

  schema.pre("find", function (next) {
    this.populate("attachments", "_id title filename path size");
    next();
  });
};
