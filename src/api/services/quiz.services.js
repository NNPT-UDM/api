const { BaseServices } = require("../../base/services.base");
const { QuizModel } = require("../../models/quiz.models");

class QuizServices extends BaseServices {
  constructor() {
    super(QuizModel);
  }
}
module.exports.QuizServices = new QuizServices();
