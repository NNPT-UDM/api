const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");

const definition = {
  customer: { type: objectId, ref: "User" },
  currency: { type: objectId, ref: "Currency" },
};

class InvoiceModel extends BaseModels {
  constructor() {
    super();
    this.name = "Invoice";
    this.collection = "invoices";
    this.index = { name: "text", customer: "text" };
    this.init({ definition: definition });
  }
}
module.exports.InvoiceModel = new InvoiceModel().export;
