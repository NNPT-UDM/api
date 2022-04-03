const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const { LessonMiddleware } = require("../middlewares/models/lesson.models.middlewares");

const definition = {
  title: { type: String },
  group: { type: objectId, ref: "Group" },
  description: { type: String },
  date: { type: Date, default: Date.now() },
};

class LessonModel extends BaseModels {
  constructor() {
    super();
    this.name = "Lesson";
    this.collection = "lessons";
    this.index = { name: "text" };
    this.init({ definition: definition });
    LessonMiddleware(this.schema);
  }
}

module.exports.LessonModel = new LessonModel().export;
