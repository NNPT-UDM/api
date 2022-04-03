const { BaseServices } = require("../../base/services.base");
const { CourseModel } = require("../../models/course.models");

class CourseServices extends BaseServices {
  constructor() {
    super(CourseModel);
  }
}
module.exports.CourseServices = new CourseServices();
