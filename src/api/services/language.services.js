const { BaseServices } = require("../../base/services.base");
const { LanguageModel } = require("../../models/language.models");

class LanguageServices extends BaseServices {
  constructor() {
    super(LanguageModel);
  }
}
module.exports.LanguageServices = new LanguageServices();
