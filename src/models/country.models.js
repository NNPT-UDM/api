const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");

const definition = {
  name: { type: String, required: true, unique: true },
};

class CountryModel extends BaseModels {
  constructor() {
    super();
    this.name = "Country";
    this.collection = "countries";
    this.index = { name: "text" };
    this.init({ definition: definition });
  }
}

module.exports.CountryModel = new CountryModel().export;
