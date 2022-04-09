module.exports.CategoryMiddleware = (schema) => {
  schema.virtual("products", {
    ref: "Product",
    foreignField: "category",
    localField: "_id",
  });

  schema.pre(/^findOne/, function (next) {
    this.populate("products");
    next();
  });
};
