module.exports.OrderMiddleware = (schema) => {

  schema.pre(/^find/, function (next) {
    this.populate("cart").populate("customer","profile");
    next();
  });
};
