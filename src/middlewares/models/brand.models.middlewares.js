module.exports.BrandMiddleware = (schema) => {
  schema.virtual("products", {
    ref: "Product",
    foreignField: "brand",
    localField: "_id",
  });

  schema.pre("findOne", function (next) {
    this.populate("products");
    next();
  });
};
