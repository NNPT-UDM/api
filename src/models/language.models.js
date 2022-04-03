const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");

const definition = {
  name: { type: String, required: true, unique: true, sparse: true },
  code: { type: String, required: true, unique: true, sparse: true },
};

class LanguageModel extends BaseModels {
  constructor() {
    super();
    this.name = "Language";
    this.collection = "languages";
    this.index = { name: "text" };
    this.init({ definition: definition });
  }
}

module.exports.LanguageModel = new LanguageModel().export;
