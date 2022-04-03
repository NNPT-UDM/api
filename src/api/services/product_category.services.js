const { BaseServices } = require("../../base/services.base");
const { ProductCategoryModel } = require("../../models/product_category.models");

class ProductCategoryServices extends BaseServices {
  constructor() {
    super(ProductCategoryModel);
  }
}
module.exports.ProductCategoryServices = new ProductCategoryServices();
