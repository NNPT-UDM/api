module.exports.OrderMiddleware = (schema) => {
    schema.pre(/^findOne/, function (next) {
        this.populate("cart");
        next();
    });
}