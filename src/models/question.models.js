const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");

const definition = {
  description: { type: String },
  form: {
    type: String,
    enum: ["radio", "checkbox", "text", "text-area"],
    default: "radio",
  },
  options: [{ type: objectId, ref: "QuestionOption" }],
};

class QuestionModel extends BaseModels {
  constructor() {
    super();
    this.name = "Question";
    this.collection = "questions";
    this.init({ definition: definition });
  }
}

module.exports.QuestionModel = new QuestionModel().export;
