const { BaseApiControllers } = require("../../base/controllers.base");
const { KeywordServices } = require("../services/keyword.services");

class KeywordApiControllers extends BaseApiControllers {
  constructor() {
    super(KeywordServices);
  }
}

module.exports = new KeywordApiControllers();
