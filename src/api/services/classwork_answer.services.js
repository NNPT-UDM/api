const { BaseServices } = require("../../base/services.base");
const { ClassworkAnswerModel } = require("../../models/classwork_answer.models");

class ClassworkAnswerServices extends BaseServices {
  constructor() {
    super(ClassworkAnswerModel);
  }
}
module.exports.ClassworkAnswerServices = new ClassworkAnswerServices();
