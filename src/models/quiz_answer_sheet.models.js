const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");

const definition = {
  start_time: {
    type: Number,
    required: true,
  },
  quiz: { type: objectId, ref: "Quiz" },
  author: { type: objectId, ref: "User" },
  questions: [{ type: objectId, ref: "Question" }],
  answer: [{ type: objectId, ref: "QuestionAnswer" }],
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
};

class QuizAnswerSheetModel extends BaseModels {
  constructor() {
    super();
    this.name = "QuizAnswerSheet";
    this.collection = "quiz_answer_sheets";
    this.index = { quiz: "text", author: "text" };
    this.init({ definition: definition });
  }
}

module.exports.QuizAnswerSheetModel = new QuizAnswerSheetModel().export;
