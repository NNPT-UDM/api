const { BaseApiControllers } = require("../../base/controllers.base");
const { QuestionServices } = require("../services/question.services");

class AdsApiControllers extends BaseApiControllers {
  constructor() {
    super(QuestionServices);
  }
}

module.exports = new AdsApiControllers();
