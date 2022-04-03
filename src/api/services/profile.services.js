const { BaseServices } = require("../../base/services.base");
const { ProfileModel } = require("../../models/profile.models");

class ProfileServices extends BaseServices {
  constructor() {
    super(ProfileModel);
  }
}
module.exports.ProfileServices = new ProfileServices();
