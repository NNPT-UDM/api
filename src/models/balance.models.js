const { BaseModels } = require("../base/models.base");

class BalanceModel extends BaseModels {
  constructor() {
    super();
    this.name = "Balance";
    this.collection = "balances";
    this.init({ definition: {} });
  }
}

module.exports.BalanceModel = new BalanceModel().export;
