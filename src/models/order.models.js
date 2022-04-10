const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const validator = require("validator");

const { OrderMiddleware } = require("../middlewares/models/order.models.middlewares");

const definition = {
  customer: { type: objectId, ref: "User" },
  cart: { type: objectId, ref: "Cart" },
  order_info: {
    full_name: { type: String },
    email: { type: String, validate: validator.isEmail },
    phone: {
      type: String,
      match: /((^(\+\d{2}|\d{2}|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
    },
    delivery_address: {
      description: { type: String },
      province: { type: Number }, // code
      district: { type: Number }, // code
      ward: { type: Number }, // code
    },
    note: { type: String },
  },
  payment_method: { type: objectId, ref: "PaymentMethod" },
  status: { type: String, default: "Pending" },
};

class OrderModel extends BaseModels {
  constructor() {
    super();
    this.name = "Order";
    this.collection = "orders";
    this.index = { name: "text" };
    this.init({ definition: definition });
    OrderMiddleware(this.schema);
  }
}

module.exports.OrderModel = new OrderModel().export;
