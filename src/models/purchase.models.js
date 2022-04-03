const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");

const definition = {
  pricing_plan: { type: String },
  receipt_no: { type: Boolean, default: 1 },
  qty: { type: Number },
};

class PurchaseModel extends BaseModels {
  constructor() {
    super();
    this.name = "Purchase";
    this.collection = "purchases";
    this.init({ definition: definition });
  }
}
module.exports.PurchaseModel = new PurchaseModel().export;
