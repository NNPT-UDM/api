const { BaseApiControllers } = require("../../base/controllers.base");
const { UserLearningServices } = require("../services/user_learning.services");

class UserLearningApiControllers extends BaseApiControllers {
  constructor() {
    super(UserLearningServices);
  }
}

module.exports = new UserLearningApiControllers();
