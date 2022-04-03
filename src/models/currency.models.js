const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");

const definition = {
  name: { type: String, required: true, unique: true },
  unit: { type: String, unique: true },
  country: { type: objectId, ref: "Country" },
};

class CurrencyModel extends BaseModels {
  constructor() {
    super();
    this.name = "Currency";
    this.collection = "currencies";
    this.index = { name: "text" };
    this.init({ definition: definition });
  }
}

module.exports.CurrencyModel = new CurrencyModel().export;
