const validator = require("validator");
const { BaseModels } = require("../base/models.base");
const { objectId } = require("../utils/common.utils");
const { UserLearningMiddleware } = require("../middlewares/models/user_learning.models.middlewares");

const definition = {
  courses: [{ type: objectId, ref: "Course" }],
  target: { type: String },
};

class UserLearningModel extends BaseModels {
  constructor() {
    super();
    this.name = "UserLearning";
    this.collection = "user_learnings";
    this.init({ definition: definition });
    UserLearningMiddleware(this.schema);
  }
}

module.exports.UserLearningModel = new UserLearningModel().export;
