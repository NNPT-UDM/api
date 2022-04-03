const { BaseServices } = require("../../base/services.base");
const { RoleModel } = require("../../models/role.models");

class RoleServices extends BaseServices {
  constructor() {
    super(RoleModel);
  }
}
module.exports.RoleServices = new RoleServices();
