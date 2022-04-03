const { BaseServices } = require("../../base/services.base");
const { SkillModel } = require("../../models/skill.models");

class SkillServices extends BaseServices {
  constructor() {
    super(SkillModel);
  }
}
module.exports.SkillServices = new SkillServices();
