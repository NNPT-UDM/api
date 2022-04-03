const { BaseServices } = require("../../base/services.base");
const { AdsModel } = require("../../models/ads.models");

class AdsServices extends BaseServices {
  constructor() {
    super(AdsModel);
  }
}
module.exports.AdsServices = new AdsServices();
