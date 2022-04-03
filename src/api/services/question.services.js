const { BaseServices } = require("../../base/services.base");
const { QuestionModel } = require("../../models/question.models");

class QuestionServices extends BaseServices {
  constructor() {
    super(QuestionModel);
  }
}
module.exports.QuestionServices = new QuestionServices();
