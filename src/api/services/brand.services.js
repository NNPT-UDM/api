const { BaseServices } = require("../../base/services.base");
const { BrandModel } = require("../../models/brand.models");

class BrandServices extends BaseServices {
	constructor() {
		super(BrandModel);
	}
}
module.exports.BrandServices = new BrandServices();
