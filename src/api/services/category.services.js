const { BaseServices } = require("../../base/services.base");
const { CategoryModel } = require("../../models/category.models");

class CategoryServices extends BaseServices {
	constructor() {
		super(CategoryModel);
	}
}
module.exports.CategoryServices = new CategoryServices();
