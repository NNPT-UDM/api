const { BaseApiControllers } = require("../../base/controllers.base");
const { RoleServices } = require("../services/role.services");

class RoleApiControllers extends BaseApiControllers {
  constructor() {
    super(RoleServices);
  }
}

module.exports = new RoleApiControllers();
