const { BaseModels } = require("../base/models.base");
const { RoleMiddleware } = require("../middlewares/models/role.models.middlewares");

const definition = {
  name: { type: String, unique: true },
  permissions: [{ type: Number }],
  range: [{ type: String }],
  index: { type: Number, unique: true },
};

class RoleModel extends BaseModels {
  constructor() {
    super();
    this.name = "Role";
    this.collection = "roles";
    this.index = { name: "text" };
    this.init({ definition: definition });
    this.setSlug("name");
    RoleMiddleware(this.schema);
  }
}

module.exports.RoleModel = new RoleModel().export;
