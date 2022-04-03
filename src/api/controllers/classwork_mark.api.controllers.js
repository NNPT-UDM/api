const { BaseApiControllers } = require("../../base/controllers.base");
const { ClassworkMarkServices } = require("../services/classwork_mark.services");

class ClassworkMarkApiControllers extends BaseApiControllers {
  constructor() {
    super(ClassworkMarkServices);
  }
}

module.exports = new ClassworkMarkApiControllers();
