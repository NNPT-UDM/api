module.exports.RoleMiddleware = (schema) => {
  schema.virtual("users", {
    ref: "User",
    foreignField: "role",
    localField: "_id",
  });

  schema.pre(/^findOne/, function (next) {
    this.populate("users", "role last_access activated _id");
    next();
  });
};
