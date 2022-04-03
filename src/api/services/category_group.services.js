const { BaseServices } = require("../../base/services.base");
const { CategoryGroupModel } = require("../../models/category_group.models");

class CategoryGroupServices extends BaseServices {
  constructor() {
    super(CategoryGroupModel);
  }
}
module.exports.CategoryGroupServices = new CategoryGroupServices();
