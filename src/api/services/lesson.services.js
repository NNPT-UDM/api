const { BaseServices } = require("../../base/services.base");
const { LessonModel } = require("../../models/lesson.models");

class LessonServices extends BaseServices {
  constructor() {
    super(LessonModel);
  }
}
module.exports.LessonServices = new LessonServices();
