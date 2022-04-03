const { BaseApiControllers } = require("../../base/controllers.base");
const { QuizServices } = require("../services/quiz.services");

class QuizApiControllers extends BaseApiControllers {
  constructor() {
    super(QuizServices);
  }
}

module.exports = new QuizApiControllers();
