const { BaseModels } = require("../base/models.base");

const definition = {
  name: { type: String },
};

class CategoryGroupModel extends BaseModels {
  constructor() {
    super();
    this.name = "CategoryGroup";
    this.collection = "category_groups";
    this.index = { name: "text" };
    this.init({ definition: definition });
  }
}

module.exports.CategoryGroupModel = new CategoryGroupModel().export;
