const { BaseServices } = require("../../base/services.base");
const { CredentialModel } = require("../../models/credential.models");

class CredentialServices extends BaseServices {
  constructor() {
    super(CredentialModel);
  }
}
module.exports.CredentialServices = new CredentialServices();
