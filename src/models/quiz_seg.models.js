const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");

const definition = {
  description: { type: String },
  attachment: [{ type: objectId, ref: "Attachment" }],
  skill: { type: objectId, ref: "Skill" },
  questions: [
    {
      type: objectId,
      ref: "Question",
    },
  ],
};

class QuizSegModel extends BaseModels {
  constructor() {
    super();
    this.name = "QuizSeg";
    this.collection = "quiz_segs";
    this.index = { skill: "text" };
    this.init({ definition: definition });
  }
}

module.exports.QuizSegModel = new QuizSegModel().export;
