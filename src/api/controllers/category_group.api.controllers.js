const { BaseApiControllers } = require("../../base/controllers.base");
const { CategoryGroupServices } = require("../services/category_group.services");

class CategoryGroupApiControllers extends BaseApiControllers {
  constructor() {
    super(CategoryGroupServices);
  }
}

module.exports = new CategoryGroupApiControllers();
