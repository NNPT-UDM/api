const { BaseApiControllers } = require("../../base/controllers.base");
const { SkillPointServices } = require("../services/skill_point.services");

class SkillPointApiControllers extends BaseApiControllers {
  constructor() {
    super(SkillPointServices);
  }
}

module.exports = new SkillPointApiControllers();
