const { BaseApiControllers } = require("../../base/controllers.base");
const { LessonServices } = require("../services/lesson.services");

class LessonApiControllers extends BaseApiControllers {
  constructor() {
    super(LessonServices);
  }
}

module.exports = new LessonApiControllers();
