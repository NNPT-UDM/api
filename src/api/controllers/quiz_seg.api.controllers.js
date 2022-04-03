const { BaseApiControllers } = require("../../base/controllers.base");
const { QuizSegServices } = require("../services/quiz_seg.services");

class QuizSegApiControllers extends BaseApiControllers {
  constructor() {
    super(QuizSegServices);
  }
}

module.exports = new QuizSegApiControllers();
