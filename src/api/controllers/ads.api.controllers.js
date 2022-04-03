const { BaseApiControllers } = require("../../base/controllers.base");
const { AdsServices } = require("../services/ads.services");

class AdsApiControllers extends BaseApiControllers {
  constructor() {
    super(AdsServices);
  }
}

module.exports = new AdsApiControllers();
