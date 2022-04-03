const { BaseApiControllers } = require("../../base/controllers.base");
const { CourseServices } = require("../services/course.services");

class CourseApiControllers extends BaseApiControllers {
  constructor() {
    super(CourseServices);
  }
}

module.exports = new CourseApiControllers();
