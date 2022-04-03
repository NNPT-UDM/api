const { BaseApiControllers } = require("../../base/controllers.base");
const { ClassworkAnswerServices } = require("../services/classwork_answer.services");

class ClassworkAnswerApiControllers extends BaseApiControllers {
  constructor() {
    super(ClassworkAnswerServices);
  }
}

module.exports = new ClassworkAnswerApiControllers();
