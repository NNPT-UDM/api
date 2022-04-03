const { BaseServices } = require("../../base/services.base");
const { CartModel } = require("../../models/cart.models");

class CartServices extends BaseServices {
  constructor() {
    super(CartModel);
  }
}
module.exports.CartServices = new CartServices();
