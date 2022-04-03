const { BaseModels } = require("../base/models.base");
const { objectId } = require("../utils/common.utils");
const { CartMiddleware } = require("../middlewares/models/cart.models.middlewares");

const definition = {
  items: [
    {
      products: { type: objectId, ref: "Product" },
      qty: { type: Number },
      quality: { type: String },
      size: { type: String },
      colors: { type: objectId },
    },
  ],
  shipping_fee: { type: Number, default: 0, select: false },
  total_price: { type: Number, select: false },
};
class CartModel extends BaseModels {
  constructor() {
    super();
    this.name = "Cart";
    this.collection = "carts";
    this.init({ definition: definition });
    CartMiddleware(this.schema);
  }
}

module.exports.CartModel = new CartModel().export;
