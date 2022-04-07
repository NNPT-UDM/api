const { BaseApiControllers } = require("../../base/controllers.base");
const { CategoryServices } = require("../services/category.services");

class CategoryApiControllers extends BaseApiControllers {
	constructor() {
		super(CategoryServices);
	}
}

module.exports = new CategoryApiControllers();
