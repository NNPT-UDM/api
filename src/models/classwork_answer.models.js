const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const { ClassworkAnswerMiddleware } = require("../middlewares/models/classwork_answer.models.middlewares");

const definition = {
  author: { type: objectId, ref: "User" },
  classwork: { type: objectId, ref: "Classwork" },
  description: { type: String },
  attachments: [{ type: objectId, ref: "Attachment" }],
  is_modified: { type: Boolean, default: false },
  status: { type: String, enum: ["missing", "late", "early"] },
};

class ClassworkAnswerModel extends BaseModels {
  constructor() {
    super();
    this.name = "ClassworkAnswer";
    this.collection = "classwork_answers";
    this.index = { classwork: "text", author: "text" };
    this.init({ definition: definition });
    ClassworkAnswerMiddleware(this.schema);
  }
}

module.exports.ClassworkAnswerModel = new ClassworkAnswerModel().export;
