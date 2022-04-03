const validator = require("validator");
const { BaseModels } = require("../base/models.base");

const definition = {
  name: { type: String, required: true },
};

class KeywordModel extends BaseModels {
  constructor() {
    super();
    this.name = "Keyword";
    this.collection = "keywords";
    this.init({ definition: definition });
  }
}

module.exports.KeywordModel = new KeywordModel().export;
