const { BaseApiControllers } = require("../../base/controllers.base");
const { SettingServices } = require("../services/setting.services");

class RoleApiControllers extends BaseApiControllers {
  constructor() {
    super(SettingServices);
  }
}

module.exports = new RoleApiControllers();
