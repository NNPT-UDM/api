const { BaseServices } = require("../../base/services.base");
const { QuizSegModel } = require("../../models/quiz_seg.models");

class QuizSegServices extends BaseServices {
  constructor() {
    super(QuizSegModel);
  }
}
module.exports.QuizSegServices = new QuizSegServices();
