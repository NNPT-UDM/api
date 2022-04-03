module.exports.UserMiddleware = (schema) => {
  schema.virtual("profile", {
    ref: "Profile",
    foreignField: "_id",
    localField: "_id",
    justOne: true,
  });

  schema.virtual("settings", {
    ref: "Setting",
    foreignField: "_id",
    localField: "_id",
    justOne: true,
  });

  schema.virtual("my_learning", {
    ref: "UserLearning",
    foreignField: "_id",
    localField: "_id",
    justOne: true,
  });

  schema.virtual("credential", {
    ref: "Credential",
    localField: "_id",
    foreignField: "_id",
    justOne: true,
  });

  schema.pre(/^find/, function (next) {
    this.populate("profile").populate("credential", "-create_at -update_at");
    next();
  });

  schema.pre("findOne", function (next) {
    this.populate("settings").populate("role").populate("my_learning");
    next();
  });
};
