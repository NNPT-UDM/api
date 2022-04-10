module.exports.CartMiddleware = (schema) => {
    schema.pre(/^find/, function (next) {
        this.populate("items.products");
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