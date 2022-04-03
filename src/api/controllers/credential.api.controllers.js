const { BaseApiControllers } = require("../../base/controllers.base");
const { CredentialServices } = require("../services/credential.services");

class CredentialApiControllers extends BaseApiControllers {
  constructor() {
    super(CredentialServices);
  }
}

module.exports = new CredentialApiControllers();
