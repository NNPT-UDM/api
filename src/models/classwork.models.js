const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const { ClassworkMiddleware } = require("../middlewares/models/classwork.models.middlewares");

const definition = {
  title: { type: String },
  group: [{ type: objectId, ref: "Group" }],
  assigned: [{ type: objectId, ref: "User" }],
  author: { type: objectId, ref: "User" },
  description: { type: String },
  attachments: [{ type: objectId, ref: "Attachment" }],
  deadline: { type: Date },
};

class ClassworkModel extends BaseModels {
  constructor() {
    super();
    this.name = "Classwork";
    this.collection = "classworks";
    this.index = { title: "text", author: "text", group: "text" };
    this.init({ definition: definition });
    ClassworkMiddleware(this.schema);
  }
}

module.exports.ClassworkModel = new ClassworkModel().export;
