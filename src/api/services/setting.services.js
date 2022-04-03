const { BaseServices } = require("../../base/services.base");
const { SettingModel } = require("../../models/setting.models");

class SettingServices extends BaseServices {
  constructor() {
    super(SettingModel);
  }
}
module.exports.SettingServices = new SettingServices();
