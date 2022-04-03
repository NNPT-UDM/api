const { BaseApiControllers } = require("../../base/controllers.base");
const { ProfileServices } = require("../services/profile.services");

class ProfileApiControllers extends BaseApiControllers {
  constructor() {
    super(ProfileServices);
  }
}

module.exports = new ProfileApiControllers();
