const { BaseApiControllers } = require("../../base/controllers.base");
const { ProductCategoryServices } = require("../services/product_category.services");

class ProductCategoryApiControllers extends BaseApiControllers {
  constructor() {
    super(ProductCategoryServices);
  }
}

module.exports = new ProductCategoryApiControllers();
