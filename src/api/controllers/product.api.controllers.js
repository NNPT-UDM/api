const { BaseApiControllers } = require("../../base/controllers.base");
const { ProductServices } = require("../services/product.services");

class ProductApiControllers extends BaseApiControllers {
  constructor() {
    super(ProductServices);
  }
}

module.exports = new ProductApiControllers();
