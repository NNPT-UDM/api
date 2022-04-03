const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const { ClassworkMarkMiddleware } = require("../middlewares/models/classwork_mark.models.middlewares");

const definition = {
  author: { type: objectId, ref: "User" },
  attachments: [{ type: objectId, ref: "Attachment" }],
  classwork_answer: { type: objectId, ref: "ClassworkAnswer" },
  score: { type: Number, default: 0 },
  rubric: { type: String },
};

class ClassworkMarkModel extends BaseModels {
  constructor() {
    super();
    this.name = "ClassworkMark";
    this.collection = "classwork_marks";
    this.index = { classwork_answer: "text", author: "text" };
    this.init({ definition: definition });
    ClassworkMarkMiddleware(this.schema);
  }
}

module.exports.ClassworkMarkModel = new ClassworkMarkModel().export;
