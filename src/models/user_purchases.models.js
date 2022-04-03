const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");

const definition = {
  wishlist: [{ type: objectId, ref: "Product" }],
  follow_feed: [],
  cart: { type: objectId, ref: "Cart" },
};

class UserPurchaseModel extends BaseModels {
  constructor() {
    super();
    this.name = "UserPurchase";
    this.collection = "user_purchases";
    this.init({ definition: definition });
  }
}
module.exports.UserPurchaseModel = new UserPurchaseModel().export;
