const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const { SkillMiddleware } = require("../middlewares/models/skill.models.middlewares");

const definition = {
  name: { type: String },
};

class SkillModel extends BaseModels {
  constructor() {
    super();
    this.name = "Skill";
    this.collection = "skills";
    this.index = { name: "text" };
    this.init({ definition: definition });
    this.setSlug("name");
    SkillMiddleware(this.schema);
  }
}

module.exports.SkillModel = new SkillModel().export;
