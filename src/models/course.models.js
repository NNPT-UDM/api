const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const { CourseMiddleware } = require("../middlewares/models/course.models.middlewares");

const definition = {
  name: { type: String, required: true, unique: true },
  references: [
    {
      title: {
        type: String,
      },
      attchments: [{ type: objectId, ref: "Attachment" }],
    },
  ],
  lectures: [
    {
      title: { type: String },
      descriptions: [{ type: String }],
      attchments: [{ type: objectId, ref: "Attachment" }],
    },
  ],
};

class CourseModel extends BaseModels {
  constructor() {
    super();
    this.name = "Course";
    this.collection = "courses";
    this.index = { name: "text" };
    this.init({ definition: definition });
    CourseMiddleware(this.schema);
  }
}

module.exports.CourseModel = new CourseModel().export;
