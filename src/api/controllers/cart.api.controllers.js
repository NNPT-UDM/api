const { BaseApiControllers } = require("../../base/controllers.base");
const { CartServices } = require("../services/cart.services");

class CartApiControllers extends BaseApiControllers {
  constructor() {
    super(CartServices);
  }
}

module.exports = new CartApiControllers();
