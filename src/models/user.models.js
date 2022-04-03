const { objectId } = require("../utils/common.utils");
const validator = require("validator");
const { BaseModels } = require("../base/models.base");
const { UserMiddleware } = require("../middlewares/models/user.models.middlewares");

const definition = {
  flags: [{ type: Number }],
  role: { type: objectId, ref: "Role" },
  permissions_expanded: [{ type: Number }],
  last_access: { type: Date, default: Date.now() },
  activated: { type: Boolean, default: 1 }, // approved?
};

class UserModel extends BaseModels {
  constructor() {
    super();
    this.name = "User";
    this.collection = "users";
    this.init({ definition: definition });
    UserMiddleware(this.schema);
  }
}
module.exports.UserModel = new UserModel().export;
