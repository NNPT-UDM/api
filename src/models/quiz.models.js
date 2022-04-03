const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const validator = require("validator");
const { QuizMiddleware } = require("../middlewares/models/quiz.models.middlewares");

const definition = {
  title: {
    type: String,
  },
  author: { type: objectId, ref: "User" },
  skill: { type: objectId, ref: "Skill" },
  difficulty: { type: Number, default: 0 },
  segments: [{ type: objectId, ref: "QuizSeg" }],
  max_scores: { type: Number, max: 9, default: 0 },
  duration: {
    type: Number,
  },
  activated: { type: Boolean, default: true },
};

class QuizModel extends BaseModels {
  constructor() {
    super();
    this.name = "Quiz";
    this.collection = "quizzes";
    this.index = { title: "text", qty: 1, author: "text" };
    this.init({ definition: definition });
    QuizMiddleware(this.schema);
  }
}

module.exports.QuizModel = new QuizModel().export;
