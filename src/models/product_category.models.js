const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");

const definition = {
  name: { type: String },
  group: { type: objectId, ref: "CategoryGroup" },
};

class ProductCategoryModel extends BaseModels {
  constructor() {
    super();
    this.name = "ProductCategory";
    this.collection = "product_categories";
    this.index = { name: "text", group: "text" };
    this.init({ definition: definition });
  }
}

module.exports.ProductCategoryModel = new ProductCategoryModel().export;
