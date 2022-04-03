const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");

const definition = {
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  is_correct: {
    type: Boolean,
    required: true,
    default: false,
  },
};

class QuestionOptionModel extends BaseModels {
  constructor() {
    super();
    this.name = "QuestionOption";
    this.collection = "question_options";
    this.init({ definition: definition });
    this.question();
  }
}

module.exports.QuestionOptionModel = new QuestionOptionModel().export;
