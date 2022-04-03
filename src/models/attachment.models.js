const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const { AttachmentMiddleware } = require("../middlewares/models/attachment.models.middlewares");

const definition = {
  title: { type: String },
  author: { type: objectId, ref: "User" },
  fieldname: { type: String },
  originalname: { type: String },
  encoding: { type: String },
  mimetype: { type: String },
  destination: { type: String },
  filename: { type: String },
  path: { type: String },
  size: { type: Number },
};

class AttachmentModel extends BaseModels {
  constructor() {
    super();
    this.name = "Attachment";
    this.collection = "attachments";
    this.index = { name: "text", author: "text" };
    this.init({ definition: definition });
    AttachmentMiddleware(this.schema);
  }
}

module.exports.AttachmentModel = new AttachmentModel().export;
