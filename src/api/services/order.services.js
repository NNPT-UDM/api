const { BaseServices } = require("../../base/services.base");
const { OrderModel } = require("../../models/order.models");

class OrderServices extends BaseServices {
  constructor() {
    super(OrderModel);
  }
}
module.exports.OrderServices = new OrderServices();
