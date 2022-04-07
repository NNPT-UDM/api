const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const { CategoryMiddleware } = require("../middlewares/models/category.models.middlewares");

const definition = {
  name: { type: String },
};

class CategoryModel extends BaseModels {
  constructor() {
    super();
    this.name = "Category";
    this.collection = "categories";
    this.index = { name: "text", group: "text" };
    this.init({ definition: definition });
    CategoryMiddleware(this.schema);
  }
}

module.exports.CategoryModel = new CategoryModel().export;
