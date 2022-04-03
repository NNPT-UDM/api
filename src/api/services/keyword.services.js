const { BaseServices } = require("../../base/services.base");
const { KeywordModel } = require("../../models/keyword.models");

class KeywordServices extends BaseServices {
  constructor() {
    super(KeywordModel);
  }
}
module.exports.KeywordServices = new KeywordServices();
