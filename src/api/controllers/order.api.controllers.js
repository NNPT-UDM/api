const { BaseApiControllers } = require("../../base/controllers.base");
const { OrderServices } = require("../services/order.services");

class OrderApiControllers extends BaseApiControllers {
  constructor() {
    super(OrderServices);
  }
}

module.exports = new OrderApiControllers();
