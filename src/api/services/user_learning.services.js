const { BaseServices } = require("../../base/services.base");
const { UserLearningModel } = require("../../models/user_learning.models");

class UserLearningServices extends BaseServices {
  constructor() {
    super(UserLearningModel);
  }
}
module.exports.UserLearningServices = new UserLearningServices();
