const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");

const definition = {
  question: { type: objectId, ref: "Question" },
  chosen_options: [{ type: objectId, ref: "QuestionOption" }],
  author: { type: objectId, ref: "User" },
};

class QuestionAnswerModel extends BaseModels {
  constructor() {
    super();
    this.name = "QuestionAnswer";
    this.collection = "question_answers";
    this.index = { question: "text", author: "text" };
    this.init({ definition: definition });
  }
}

module.exports.QuestionAnswerModel = new QuestionAnswerModel().export;
