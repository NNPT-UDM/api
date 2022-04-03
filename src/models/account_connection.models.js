const validator = require("validator");
const { BaseModels } = require("../base/models.base");

const definition = {};

class AccountConnectionModel extends BaseModels {
  constructor() {
    super();
    this.name = "AccountConnection";
    this.collection = "account_connections";
    this.init({ definition: definition });
  }
}

module.exports.AccountConnectionModel = new AccountConnectionModel().export;
