const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const validator = require("validator");

const definition = {
  theme: { type: String },
  payment_methods: [
    {
      type: objectId,
      ref: "PaymentMethod",
    },
  ],
};

class SettingModel extends BaseModels {
  constructor() {
    super();
    this.name = "Setting";
    this.collection = "settings";
    this.index = {};
    this.init({ definition: definition });
  }
}

module.exports.SettingModel = new SettingModel().export;
