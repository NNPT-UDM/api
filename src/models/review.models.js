const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const { ReviewMiddleware } = require("../middlewares/models/review.models.middlewares");

const definition = {
  author: { type: objectId, ref: "User" },
  owner: { type: objectId, ref: "User" },
  lesson: { type: objectId, ref: "Lesson" },
  title: { type: String },
  recommend: [
    {
      _id: false,
      title: { type: String },
      content: { type: String },
    },
  ],
};

class ReviewModel extends BaseModels {
  constructor() {
    super();
    this.name = "Review";
    this.collection = "reviews";
    this.index = {
      title: "text",
      author: "text",
      content: "text",
      recommend: "text",
    };
    this.init({ definition: definition });
    ReviewMiddleware(this.schema);
  }
}

module.exports.ReviewModel = new ReviewModel().export;
