const { BaseServices } = require("../../base/services.base");
const { SkillPointModel } = require("../../models/skill_point.models");

class SkillPointServices extends BaseServices {
  constructor() {
    super(SkillPointModel);
  }
}
module.exports.SkillPointServices = new SkillPointServices();
