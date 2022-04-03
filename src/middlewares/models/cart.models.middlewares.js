module.exports.CartMiddleware = (schema) => {
    schema.pre(/^findOne/, function (next) {
        this.populate("products", "name photos qty price");
        next();
    });

    schema.pre("save", function (next) {
        // const prices = this.products.map(
        //   (product) => product.price.sell * product.qty
        // );
        // const sum = lodash.sum(prices);
        // this.total_price = sum;
        next();
    });
}