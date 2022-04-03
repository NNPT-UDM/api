const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");

const definition = {
  name: { type: String, required: true, unique: true },
};

class PaymentMethodModel extends BaseModels {
  constructor() {
    super();
    this.name = "PaymentMethod";
    this.collection = "payment_methods";
    this.index = { name: "text" };
    this.init({ definition: definition });
  }
}

module.exports.PaymentMethodModel = new PaymentMethodModel().export;
