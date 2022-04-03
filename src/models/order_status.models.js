const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");

const definition = {
  name: { type: String },
};

class OrderStatusModel extends BaseModels {
  constructor() {
    super();
    this.name = "OrderStatus";
    this.collection = "order_status";
    this.index = { customer: "text" };
    this.init({ definition: definition });
  }
}

module.exports.OrderStatusModel = new OrderStatusModel().export;
