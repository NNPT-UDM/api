const { BaseServices } = require("../../base/services.base");
const { ClassworkMarkModel } = require("../../models/classwork_mark.models");

class ClassworkMarkServices extends BaseServices {
  constructor() {
    super(ClassworkMarkModel);
  }
}
module.exports.ClassworkMarkServices = new ClassworkMarkServices();
