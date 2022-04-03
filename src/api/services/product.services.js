const { BaseServices } = require("../../base/services.base");
const { ProductModel } = require("../../models/product.models");

class ProductServices extends BaseServices {
  constructor() {
    super(ProductModel);
  }
}
module.exports.ProductServices = new ProductServices();
