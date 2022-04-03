const { BaseServices } = require("../../base/services.base");
const { AttachmentModel } = require("../../models/attachment.models");

class AttachmentServices extends BaseServices {
  constructor() {
    super(AttachmentModel);
  }
}

module.exports.AttachmentServices = new AttachmentServices();
