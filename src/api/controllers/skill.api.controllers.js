const { BaseApiControllers } = require("../../base/controllers.base");
const { SkillServices } = require("../services/skill.services");

class SkillApiControllers extends BaseApiControllers {
  constructor() {
    super(SkillServices);
  }
}

module.exports = new SkillApiControllers();
