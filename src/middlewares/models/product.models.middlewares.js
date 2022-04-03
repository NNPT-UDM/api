module.exports.ProductMiddleware = (schema) => {
  schema.virtual("price.sale").get(function () {
    const sale = this.price.sell * [(100 - (this.price.discount || 0)) / 100];
    return Number(sale.toFixed(2));
  });
};
