const { BaseApiControllers } = require("../../base/controllers.base");
const { LanguageServices } = require("../services/language.services");

class LanguageApiControllers extends BaseApiControllers {
  constructor() {
    super(LanguageServices);
  }
}

module.exports = new LanguageApiControllers();
