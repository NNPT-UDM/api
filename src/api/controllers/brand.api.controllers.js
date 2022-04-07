const { BaseApiControllers } = require("../../base/controllers.base");
const { BrandServices } = require("../services/brand.services");

class BrandApiControllers extends BaseApiControllers {
	constructor() {
		super(BrandServices);
	}
}

module.exports = new BrandApiControllers();
